import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
   if (req.user) {
        return next();
   }
   res.status(401).send({ error: 'You must login first' });
    res.redirect("/login");
};