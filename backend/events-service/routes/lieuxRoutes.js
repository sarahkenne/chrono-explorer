const express = require('express');
const router = express.Router();
const Lieu = require('../models/Lieu');

router.get('/', async (req, res) => {
  try {
    const lieux = await Lieu.findAll();
    res.json(lieux);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;