const Media = require('../models/Media');
const path = require('path');

exports.upload = async (req, res) => {
  try {
    const { description_archive, type_archive, id_evenement } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Aucun fichier téléversé.' });

    const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    const media = await Media.create({
      description_archive,
      type_archive,
      nom_fichier: file.filename,
      url,
      id_evenement
    });

    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByEvent = async (req, res) => {
  try {
    const medias = await Media.findAll({ where: { id_evenement: req.params.id_evenement } });
    res.json(medias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};