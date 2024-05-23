const express = require("express");
const multer = require("multer");
const Photo = require("../db/photoModel");
const verifyToken = require("../middleware/VerifyToken");
const router = express.Router();
const upload = multer()
router.get("/photosOfUser/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const photo = await Photo.find({ user_id: id });
    if (photo) {
      res.json(photo);
    }
    else {
      res.status(404).json({ message: "Photo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/commentsOfPhoto/:photo_id", verifyToken, async (req, res) => {
  try {
    const photo_id = req.params.photo_id;
    const { comment } = req.body
    const newComment = {
      comment: comment,
      user_id: req.userId,
      date_time: new Date()
    }
    if(comment === '') {
      res.status(400).send("Empty comment")
    }
    const filter = { _id: photo_id }
    const update = { $push: { comments: newComment } }
    const doc = await Photo.findOneAndUpdate(filter, update, { new: true })
    return res.json(doc)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post("/new", verifyToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({error: "No file provided"})
  }
  const userId = req.userId
  const file_name = req.file.originalname
  const date_time = new Date()
  const comments = []
  photoObj = new Photo({
    file_name: file_name,
    date_time: date_time,
    user_id: userId,
    comments: comments
  })
  try {
    await photoObj.save()
    return res.status(200).json({success: "Success upload photo"})
  } catch (error) {
    console.error("Error add new photo", error);
  }
})
module.exports = router;