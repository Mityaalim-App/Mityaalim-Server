const { getUser, verifyCode } = require('../services/user.service')
// require("dotenv").config()
const axios = require('axios').default


const verifyUser = async (smsCode: string, phoneNumber: string) => {
    try {
        const isCodeVerified = await verifyCode(smsCode, phoneNumber)
        if (!isCodeVerified) return false
        const user = await getUser(phoneNumber)
        if (user.email) return true
        return false
    } catch (error) {
        console.log(error, 'Error verifying code')
    }
}

const sendSmsWithCode = async (userPhone: string) => {
    const user = await getUser(userPhone)

    const generateSmsCode = () => {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }
    return new Promise((resolve, reject) => {
        let smsCode = `${generateSmsCode()}`
        const expiration = new Date(Date.now() + 5 * 60 * 1000)
        user.updateOne(
            { $set: { tempCode: smsCode, tempCodeExpiration: expiration } }
        );
        const options = {
            headers: {
                'Authorization': `Basic ${process.env.AUTH_CREDENTIAL}`,
                'Content-Type': 'application/json'
            }
        };
        axios.post("https://capi.inforu.co.il/api/v2/SMS/SendSms",
            {
                "Message": `קוד האימות שלך הוא ${smsCode}`,
                "Recipients": [
                    {
                        "Phone": userPhone
                    }
                ],
                "Settings": {
                    "Sender": "Mityaalim"
                }
            },
            options
        )
            .then(() => {
                resolve('Message sent succesfully')
            })
            .catch(() => reject('Invalid phone number'))
    })
}


module.exports = {
    sendSmsWithCode
}