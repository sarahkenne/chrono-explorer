const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/jwt");

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Bienvenue utilisateur ID ${req.user.id}` });
});

module.exports = router;
