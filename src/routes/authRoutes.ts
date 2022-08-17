import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

module.exports = (app: express.Application) => {

   // JWT Auth //
   // sign-in:
   app.post('/api/signin', async (req, res) => {
      const { email, password } = req.body;
      try {
         // first search for user by email in database
         // encrypt entered password and check if matches password in database
         // if all checks pass create a web token and send it to the browser
      } catch (error) {
         // send error message
      }
   });
   // register:
   app.post('/api/register', async (req, res) => {
      const { email, password, confirmPassword } = req.body;
      try {
         //check if the user doesnt already exist
         // check confirm password (if the front end already performs this check maybe unnecessary)
         // encripting password with bcrypt
         //creating a new user in the database
         //creating a webtoken with and sending to the browser
      } catch (error) {
         // send error message
      }
   });

   // Google OAuth:
   app.get('/auth/google',
      //complete with google strategy
   );
   app.get('/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
         //complete for the case when the user is redirected by google with a code in the url
      });

   // Facebook OAuth:
   app.get('/auth/facebook',
      //complete with google strategy
   );
   app.get('/auth/facebook/callback',
      passport.authenticate('facebook'),
      (req, res) => {
         //complete for the case when the user is redirected by facebook with a code in the url
      });
   
   // Twitter OAuth:
   app.get('/auth/twitter',
      //complete with twitter strategy
   );
   app.get('/auth/twitter/callback',
      passport.authenticate('twitter'),
      (req, res) => {
         //complete for the case when the user is redirected by twitter with a code in the url
      });
   
   
   // logging out of the application:
    app.get('/api/logout', (req, res, next) => {
       req.logout(err => {
          if (err) next(err);
        }); 
        //res.send(req.user) - this is for testing the user is actually logged out
        res.redirect('/');
    });
   
   // testing authentication:
   app.get('/api/current_user', (req, res) => {
      console.log(req.user);
      res.send(req.user);
   });
};

