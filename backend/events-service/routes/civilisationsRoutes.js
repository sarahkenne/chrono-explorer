const express = require('express');
const router = express.Router();
const Civilisation = require('../models/civilisation');

router.get('/', async (req, res) => {
  try {
    const civilisations = await Civilisation.findAll();
    res.json(civilisations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;