import mongoose, { Schema } from "mongoose";

const GoalSchema = new Schema(
    {
        _user: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        articleViews: {
            type: Number
        },
        podcastViews: {
            type: Number
        },
        videoViews: {
            type: Number
        },
        transactionRecorded: {
            type: Boolean
        },
        weeklyGoal: {
            type: Number,
            default: 3
        },
        totalProgress: {
            type: Number
        },
    },
    { timestamps: true }
)

const Goal = mongoose.model("Credit", GoalSchema)
module.exports = Goal