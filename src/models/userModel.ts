import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt-nodejs';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  phoneNumber: string;
  tempCode?: string;
  tempCodeExpiration?: string;

  googleId: string;
  facebookId: string;
  twitterId: string;
  tokens: AuthToken[]

  profile: {
    userName: string;
    firstName: string;
    lastName: string,
    phone: string;
    profilePicture: string,
  }

  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
};


const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: String,
  },

  googleId: String,
  facebookId: String,
  twitterId: String,
  tokens: Array,

  profile: {
      userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  }
});

// password hashing middleware:
userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (this: any, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);
