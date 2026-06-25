const express = require("express");
const router = express.Router();
const {
    createLocker,
    getUserLockers,
    getInvitations,
    acceptInvitation,
    rejectInvitation,
    addMoney,
    getTransactions,
    getLockerById
} = require("../controllers/lockerController");

router.get("/test", (req, res) => {
    res.send("Locker Route Working");
});

router.post("/create", createLocker);
router.get("/invitations/:userId", getInvitations);
router.patch("/:lockerId/accept", acceptInvitation);
router.post("/:lockerId/add-money", addMoney);
router.get("/:lockerId/transactions", getTransactions);
router.get("/user/:userId", getUserLockers);
router.get("/:id", getLockerById);

router.patch("/:lockerId/reject", rejectInvitation);
module.exports = router;