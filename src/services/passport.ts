import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User, UserDocument } from "../models/userModel";
const keys = require('../config/keys');


// creating token/cookie to identify the user and send it to the browser:
passport.serializeUser((user: any, done) => {
    done(null, user.id)
});
//for the second request from the user, taking the token (user.id) and sending it back as the user model instance:
passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user))
});

// sign in with email and password:
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
   User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));

// sign in with google:
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
   try {
      const existingUser: UserDocument | null = await User.findOne({ googleId: profile.id });
      //If returning user, sign in and we are done:
      if (existingUser) return done(null, existingUser);
      // Else check if there is an existing account with user's email:
      await User.findOne({ email: profile._json.email }, (err: NativeError, existingEmailUser: UserDocument) => {
         if (err) { return done(err); }
         if (existingEmailUser) {
            req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account." });
            done(err);
         // Else create a new account:
         } else {
            const user = new User({
               googleId: profile.id,
               email: profile._json?.email,
               tokens: [{ kind: "google", accessToken }],
               profile: {
               userName: profile.displayName,
               firstName: profile._json?.given_name,
               lastName: profile._json?.family_name,
               profilePicture: profile._json?.picture
               }
               
            }).save();
            done(null, user);
         }
      });
   } catch (error) {
        console.log(error);
    }
}));

//sign in with Facebook:
passport.use(new FacebookStrategy({
   clientID: keys.facebookClientID,
   clientSecret: keys.facebookClientSecret,
   callbackURL: "/auth/facebook/callback",
   profileFields: ["name", "email", "link", "locale", "timezone"],
   passReqToCallback: true
}, (req: any, accessToken: any, refreshToken: any, profile, done) => {
   User.findOne({ facebook: profile.id }, (err: NativeError, existingUser: UserDocument) => {
      if (err) { return done(err); }
      //If returning user, sign in and we are done:
      if (existingUser) {
         return done(undefined, existingUser);
      }
      // Else check if there is an existing account with user's email:
      User.findOne({ email: profile._json.email }, (err: NativeError, existingEmailUser: UserDocument) => {
         if (err) { return done(err); }
         if (existingEmailUser) {
            req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
            done(err);
         // Else create a new account:
         } else {
            const user: any = new User();
            user.email = profile._json.email;
            user.facebookId = profile.id;
            user.tokens.push({ kind: "facebook", accessToken });
            user.profile.userName = profile.username;
            user.profile.firstName = profile.name?.givenName;
            user.profile.lastName = profile.name?.familyName;
            user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
            user.save((err: Error) => {
               done(err, user);
            });
         }
      });
   })
}
));

