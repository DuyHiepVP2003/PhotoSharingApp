const express = require("express");
const jwt = require("jsonwebtoken")
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { login_name, password } = req.body
    const user = await User.findOne({ login_name: login_name })
    if (!user){
        res.status(404).send("Username not found")
    }
    else if (user.password === password) {
        jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" }, (err, token) => {
            if (err) {
                res.status(500).send("Error generating token");
            } else {
                res.json({ token: token, _id: user._id, first_name: user.first_name });
            }
        })
    } else {
        res.status(400).send("Invalid credentials")
    }
});

router.post("/logout", async (req, res) => {
    res.status(200).json({ message: "Logout successful" })
})
module.exports = router;