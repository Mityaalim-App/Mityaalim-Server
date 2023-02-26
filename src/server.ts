import express, { Request, Response, json } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
const userRouter = require('./routes/userRoutes')
const videoRoutes = require('./routes/videoRoutes')
const keys = require('./config/keys');
require("dotenv").config();
import './models/userModel';
import './services/passport';

const app = express(), port = process.env.PORT || 4000;

// connect to MongoDB
mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// enable body parser:
app.use(json());

//enable use of cookies:
// app.use(
//     cookieSession({
//         maxAge: 24 * 60 * 60 * 1000, // 24 hours
//         keys: [keys.cookieKey]
//     })
// );
//enable session:
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: keys.cookieKey,
  cookie: { secure: true }
}));

//tell passport to make use of cookies for user authentication:
app.use(passport.initialize());
app.use(passport.session());

// enable flash messages:
app.use(flash());

// routes
app.use('/user', userRouter)
require('./routes/authRoutes')(app);
require('./routes/transactionRoutes')(app);
require('./routes/goalRoutes')(app);
require('./routes/budgetRoutes')(app);
// require('./routes/videoRoutes')(app);
app.use('/api/video', videoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
