const Locker = require("../models/locker");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const createLocker = async (req, res) => {
    try {
        const { lockerName, targetAmount, partnerMobile, createdBy } = req.body;

        const partner = await User.findOne({ mobile: partnerMobile });

        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        const locker = await Locker.create({
            lockerName,
            targetAmount,
            createdBy,
            partner: partner._id
        });

        res.status(201).json({
            message: "Locker created successfully",
            locker
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvitations = async (req, res) => {
    try {
        const { userId } = req.params;

        const invitations = await Locker.find({
            partner: userId,
            status: "Pending Approval"
        }).populate("createdBy", "name mobile");

        res.status(200).json(invitations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const acceptInvitation = async (req, res) => {
    try {
        const { lockerId } = req.params;

        const locker = await Locker.findByIdAndUpdate(
            lockerId,
            { status: "Active" },
            { new: true }
        );

        res.status(200).json({
            message: "Invitation Accepted",
            locker
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const rejectInvitation = async (req, res) => {
    try {
        const { lockerId } = req.params;

        const locker = await Locker.findByIdAndUpdate(
            lockerId,
            { status: "Rejected" },
            { new: true }
        );

        res.status(200).json({
            message: "Invitation Rejected",
            locker
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMoney = async (req, res) => {
    try {
        const { lockerId } = req.params;
        const { userId } = req.body;

        const locker = await Locker.findById(lockerId);

        if (!locker) {
            return res.status(404).json({ message: "Locker not found" });
        }

        if (locker.status === "Completed") {
            return res.status(400).json({ message: "Locker is already completed" });
        }

        const user = await User.findById(userId);

        await Transaction.create({
            locker: lockerId,
            addedBy: userId,
            amount: 100
        });

        locker.currentBalance = Math.min(
            locker.currentBalance + 100,
            locker.targetAmount
        );

        if (locker.currentBalance >= locker.targetAmount) {
            locker.status = "Completed";
        }

        await locker.save();

        res.status(200).json({
            message: "₹100 Added Successfully",
            locker
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const { lockerId } = req.params;

        const transactions = await Transaction.find({
            locker: lockerId
        })
            .populate("addedBy", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(transactions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserLockers = async (req, res) => {
    try {
        const { userId } = req.params;

        const lockers = await Locker.find({
            $or: [
                { createdBy: userId },
                { partner: userId }
            ]
        })
            .populate("createdBy", "name mobile")
            .populate("partner", "name mobile");

        res.status(200).json(lockers);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLockerById = async (req, res) => {
    try {
        const locker = await Locker.findById(req.params.id)
            .populate("createdBy", "name mobile")
            .populate("partner", "name mobile");

        if (!locker) {
            return res.status(404).json({ message: "Locker not found" });
        }

        res.status(200).json(locker);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLocker,
    getUserLockers,
    getInvitations,
    acceptInvitation,
    rejectInvitation,
    addMoney,
    getTransactions,
    getLockerById
};
