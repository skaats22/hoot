// routes/hoots

const express = require("express");
const router = express.Router();
const hootsCtrl = require('../controllers/hoots');

// add routes here

//POST /hoots (create)
router.post("/", hootsCtrl.create);

// GET /hoots (index)
router.get("/", hootsCtrl.index);

// GET /hoots/:hootId (show)
router.get("/:hootId", hootsCtrl.show);

// PUT /hoots/:hootId (update)
router.put("/:hootId", hootsCtrl.update)

// DELETE /hoots/:hootId (delete)
router.delete("/:hootId", hootsCtrl.deleteHoot);


module.exports = router;
