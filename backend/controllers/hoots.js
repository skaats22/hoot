const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Hoot = require("../models/hoot.js");
const ensureLoggedIn = require("../middleware/ensureLoggedIn.js");
const router = express.Router();

// add routes here

router.post("/", ensureLoggedIn, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;

module.exports = {
  create,
  index,
}

async function index(req, res) {
  // Want to find the most recent post at the top
  const posts = await Post.find({}).populate('user').sort('-createdAt');
  res.json(posts);
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Post Failed' });
  }
}