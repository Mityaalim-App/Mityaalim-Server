const userRouter = require("express").Router(),
    { sendSmsWithCode } = require('../controllers/userController')
import { Request, Response } from "express";

userRouter.post("/auth/sms", (req: Request, res: Response) => {
    const { userPhone } = req.body
    sendSmsWithCode(userPhone)
        .then((msg: string) => res.status(200).send(msg))
        .catch((err: string) => res.status(400).send(err))

})

module.exports = userRouter