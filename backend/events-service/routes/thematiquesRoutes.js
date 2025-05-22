const express = require('express');
const router = express.Router();
const Thematique = require('../models/Thematique');

router.get('/', async (req, res) => {
  try {
    const thematiques = await Thematique.findAll();
    res.json(thematiques);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;