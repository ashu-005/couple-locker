const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema({
    lockerName: {
        type: String,
        required: true
    },

    targetAmount: {
        type: Number,
        required: true
    },

    currentBalance: {
        type: Number,
        default: 0
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ["Pending Approval", "Active", "Rejected", "Completed"],
        default: "Pending Approval"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Locker", lockerSchema);
