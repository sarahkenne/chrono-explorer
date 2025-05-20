const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/jwt");
const isAdmin = require("../middlewares/isAdmin");

router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: `Bienvenue sur le tableau de bord admin, ${req.user.id}` });
});

// gestion des utilisateurs, des événements, etc.)

module.exports = router;
