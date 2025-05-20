const express = require('express');
const router = express.Router();
const Favori = require('../models/favori');
const verifyToken = require('../middlewares/jwt');

// Ajouter un favori
router.post('/', verifyToken, async (req, res) => {
  try {
    const { id_evenement } = req.body;
    const favori = await Favori.create({
      id_utilisateur: req.user.id,
      id_evenement
    });
    res.status(201).json(favori);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lister les favoris de l'utilisateur connecté
router.get('/', verifyToken, async (req, res) => {
  try {
    const favoris = await Favori.findAll({
      where: { id_utilisateur: req.user.id }
    });
    res.json(favoris);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un favori
router.delete('/:id_evenement', verifyToken, async (req, res) => {
  try {
    await Favori.destroy({
      where: {
        id_utilisateur: req.user.id,
        id_evenement: req.params.id_evenement
      }
    });
    res.json({ message: 'Favori supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
