const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("../db/userModel");
const verifyToken = require("../middleware/VerifyToken");
const router = express.Router();
router.get("/list", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, first_name: 1, last_name: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("", async(req, res)=>{
  const newUser = req.body
  try {
    const user = await User.findOne({login_name: newUser.login_name})
    if (user) {
      res.status(400).send("Username already exists")
    }else{
      userObj = new User({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        location: newUser.location,
        description: newUser.description,
        occupation: newUser.occupation,
        login_name: newUser.login_name,
        password: newUser.password
      })
      try {
        await userObj.save()
        res.status(200).send("Registration successful")
      } catch (error) {
        console.error("Error create user", error);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
module.exports = router;
