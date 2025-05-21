const express = require('express');
const router = express.Router();
const Commentaire = require('../models/commentaire');
const verifyToken = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

// Proposer un commentaire
router.post('/', verifyToken, async (req, res) => {
  try {
    const { id_evenement, contenu } = req.body;
    const commentaire = await Commentaire.create({
      id_utilisateur: req.user.id,
      id_evenement,
      contenu
    });
    res.status(201).json(commentaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Voir les commentaires validés d’un événement
router.get('/by-event/:id', async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll({
      where: {
        id_evenement: req.params.id,
        statut: 'valide'
      }
    });
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Voir les commentaires en attente (admin)
router.get('/pending', verifyToken, isAdmin, async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll({
      where: { statut: 'en_attente' }
    });
    res.json(commentaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Valider un commentaire
router.put('/:id/valider', verifyToken, isAdmin, async (req, res) => {
  try {
    await Commentaire.update(
      { statut: 'valide' },
      { where: { id_commentaire: req.params.id } }
    );
    res.json({ message: 'Commentaire validé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Refuser un commentaire
router.put('/:id/refuser', verifyToken, isAdmin, async (req, res) => {
  try {
    await Commentaire.update(
      { statut: 'refuse' },
      { where: { id_commentaire: req.params.id } }
    );
    res.json({ message: 'Commentaire refusé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
