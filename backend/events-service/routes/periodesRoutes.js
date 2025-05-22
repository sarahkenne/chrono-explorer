const express = require('express');
const router = express.Router();
const Periode = require('../models/Periode');

router.get('/', async (req, res) => {
  try {
    const periodes = await Periode.findAll();
    res.json(periodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;