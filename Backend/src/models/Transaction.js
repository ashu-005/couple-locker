const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        locker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Locker",
            required: true
        },

        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        amount: {
            type: Number,
            default: 100
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);