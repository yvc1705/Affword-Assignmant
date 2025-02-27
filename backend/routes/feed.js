const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });

router.post('/', [auth, upload.single('photo')], async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newPost = new Feed({
      caption: req.body.caption,
      imageUrl: result.secure_url,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Feed.find().sort({ date: -1 }).populate('user', 'name');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
