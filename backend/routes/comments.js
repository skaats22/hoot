// routes/comments

const express = require("express");
const router = express.Router();
const commentsCtrl = require('../controllers/comments')


// POST /api/hoots/:hootId/comments (create comment)
router.post("/:hootId/comments", commentsCtrl.create);

// PUT /api/hoots/:hootID/comments/:commentId (update comment)
router.put("/:hootId/comments/:commentId", commentsCtrl.update);

// DELETE /api/hoots/:hootID/comments/:commentId (delete comment)
router.delete("/:hootId/comments/:commentId", commentsCtrl.deleteComment);


module.exports = router;