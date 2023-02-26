const userRouter = require("express").Router(),
    { sendSmsWithCode, verifyUser } = require('../controllers/userController')
import { Request, Response } from "express";

userRouter.post("/auth/sms", (req: Request, res: Response) => {
    const { userPhone } = req.body
    sendSmsWithCode(userPhone)
        .then((msg: string) => res.status(200).send(msg))
        .catch((err: string) => res.status(400).send(err))

})

userRouter.post("/auth/verify", (req: Request, res: Response) => {
    const { userPhone, smsCode } = req.body
    verifyUser(smsCode, userPhone)
        .then((msg: string) => res.status(200).send(msg))
        .catch((err: string) => res.status(400).send(err))

})

module.exports = userRouter