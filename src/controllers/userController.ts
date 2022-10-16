require("dotenv").config()
const User = require("../models/userModel"),
    axios = require('axios').default

const sendSmsWithCode = (userPhone: string) => {
    return new Promise((resolve, reject) => {
        let smsCode = generateSmsCode()
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

const generateSmsCode = () => {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
}

module.exports = {
    sendSmsWithCode
}