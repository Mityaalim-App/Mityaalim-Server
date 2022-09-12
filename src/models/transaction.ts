import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        _budget: {
            type: Schema.Types.ObjectId, ref: 'Budget'
        },
        isIncome: {
            type: Boolean,
        },
        isConstant: {
            type: Boolean,
        },
        transactionType: {
            type: String
        },
        lastRecordedTransaction: {
            type: Date
        },
        dateCreated: {
            type: Date
        },
    },
    { timestamps: true }
)

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction