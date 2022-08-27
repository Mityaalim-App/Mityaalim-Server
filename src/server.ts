import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
const keys = require('./config/keys');
require("dotenv").config();
import './models/userModel'; 
// to execute the code in the passport file:
import './services/passport';

const app = express(), port = process.env.PORT || 4000;
      
//enable use of cookies:
// app.use(
//     cookieSession({
//         maxAge: 24 * 60 * 60 * 1000, // 24 hours
//         keys: [keys.cookieKey]
//     })
// );
// enable session:
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: keys.cookieKey,
}));
//tell passport to make use of cookies for user authentication:
app.use(passport.initialize());
app.use(passport.session());
// enable flash messages:
app.use(flash());

require('./routes/authRoutes')(app);
require('./routes/transactionRoutes')(app);
require('./routes/goalRoutes')(app);
require('./routes/budgetRoutes')(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
