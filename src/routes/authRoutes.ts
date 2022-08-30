import express from 'express';
import passport from 'passport';
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { body, check, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { User, UserDocument } from "../models/userModel";
import '../services/passport';
const keys = require('../config/keys');


module.exports = (app: express.Application) => {

   // sign-in with user and password //

   app.post('/api/signin', async (req: Request, res: Response, next: NextFunction) => {
      // perform email and password checks:
      await check("email", "Email is not valid").isEmail().run(req);
      await check("password", "Password cannot be blank").isLength({min: 1}).run(req);
      await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
      
      const errors = validationResult(req);
      // if there are errors found flash error and redirect back to login:
      if (!errors.isEmpty()) {
         req.flash("errors", errors.array().toString());
         return res.redirect("/login");
      };

      // passport local authentication (password hashing and comparison is handled in userModel):
      passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash("errors", info.message);
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash("success", "Success! You are logged in.");
            res.redirect("/");
        });
    })(req, res, next);
   });

   // register //

   app.post('/api/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      // perform email and password checks:
      await check("email", "Email is not valid").isEmail().run(req);
      await check("password", "Password must be at least 8 characters long").isLength({ min: 8 }).run(req);
      await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);
      await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
      
      const errors = validationResult(req);
      // if there are errors found flash error and redirect back to login:
      if (!errors.isEmpty()) {
         req.flash("errors", errors.array().toString());
         return res.redirect("/login");
      }

      const { email, password } = req.body;
      const user = new User({
        email: email,
        password: password
      });

      //check if the user does'nt already exist
      User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
        if (err) { return next(err); }
        if (existingUser) {
            req.flash("errors",  "Account with that email address already exists.");
            return res.redirect("/signup");
        }
      //creating a new user in the database (password hashing is handled in userModel):
        user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
               }
               //redirecting to login page:
                res.redirect("/login");
            });
        });
      });
   });

   // Google OAuth //

   app.get('/auth/google',
            passport.authenticate('google', {
            scope: ['profile', 'email'],
            failureRedirect: '/login',
            session: false
        })
   );
   app.get('/auth/google/callback',
      passport.authenticate('google'),
      (req: any, res) => {
         const token = jwt.sign({ id: req.user._id, googleId: req.user.googleId }, keys.jwtKey, { expiresIn: '48h' });
            res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).redirect('/')
      });

   // Facebook OAuth //

   app.get('/auth/facebook',
      passport.authenticate('facebook', {
            scope: ['public_profile', 'email'],
            failureRedirect: '/login',
            session: false
        })
   );
   app.get('/auth/facebook/callback',
      passport.authenticate('facebook'),
      (req: any, res) => {
         const token = jwt.sign({ id: req.user._id, facebookId: req.user.facebookId }, keys.jwtKey, { expiresIn: '48h' });
            res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).redirect('/')
      });
   
   // Twitter OAuth //

   app.get('/auth/twitter',
      //complete with twitter strategy
   );
   app.get('/auth/twitter/callback',
      passport.authenticate('twitter'),
      (req, res) => {
         //complete for the case when the user is redirected by twitter with a code in the url
      });
   
   
   // logging out of the application //

    app.get('/api/logout', (req, res, next) => {
       req.logout(err => {
          if (err) next(err);
        }); 
        //res.send(req.user) - this is for testing the user is actually logged out
        res.redirect('/');
    });
   
   // testing authentication //

   app.get('/api/current_user', (req, res) => {
      console.log(req.user);
      res.send(req.user);
   });
};

