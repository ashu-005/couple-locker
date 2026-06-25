const User = require("../models/user");

const login = async (req, res) => {

    const { mobile } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "Login Successful",
        user
    });
}

module.exports = { login };
