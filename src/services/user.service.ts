import { User, UserDocument } from "../models/userModel";

const verifyCode = (smsCode: string, phoneNumber: string) => {
    try {
        const user = User.findOne({ phoneNumber })
        if (user.tempCode !== smsCode) {
            console.log(`Incorrect code for user with phone number ${phoneNumber}`)
            return false
        }
        if (user.tempCodeExpiration < new Date()) {
            console.log(`Code expired for user with phone number ${phoneNumber}`)
            return false
        }
        user.updateOne({ phoneNumber }, { $unset: { tempCode: "", tempCodeExpiration: "" } })
        console.log(`Verification successful for user with phone number ${phoneNumber}`)
        return true

    } catch (err) {
        throw err
        return false
    }
}

const getUser = (phoneNumber: string) => {
    const user = User.findOne({ phoneNumber }) || new User({phoneNumber})
    return user
}

module.exports = {
    getUser,
    verifyCode
}