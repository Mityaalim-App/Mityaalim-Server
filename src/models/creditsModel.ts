import mongoose, { Schema } from "mongoose";

const creditSchema = new Schema(
    {
        _user: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        creditForWeeklyGoal: {
            type: Number,
            max: 30
        },
        creditForDailyGoal: {
            type: Number,
            default: 0
        },
        totalCredits: {
            type: Number
        },
    },
    { timestamps: true }
)

const Credit = mongoose.model("Credit", creditSchema)
module.exports = Credit