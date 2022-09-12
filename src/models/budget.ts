import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
    {
        _user: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        savingsTarget: {
            type: Number,
            default: null
        },
        transactions: {
            type: Schema.Types.ObjectId, ref: 'Transaction'
        }
        ,
        totalIncome: {
            type: Number
        },
        totalExpenses: {
            type: Number
        },
        currentMonth: {
            type: Date
        },
    },
    { timestamps: true }
)

const Budget = mongoose.model("Budget", budgetSchema)
module.exports = Budget