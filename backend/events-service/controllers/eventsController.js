const Evenement = require('../models/Evenement');

exports.getAll = async (req, res) => {
  const events = await Evenement.findAll();
  res.json(events);
};

exports.getById = async (req, res) => {
  const event = await Evenement.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Evénement non trouvé' });
  res.json(event);
};

exports.create = async (req, res) => {
    try {
      const {
        titre_evenement,
        description_evenement,
        id_civilisation,
        id_lieu,
        id_thematique,
        id_categorie,
        id_periode,
        date_debut,
        date_fin
      } = req.body;
  
      const newEvent = await Evenement.create({
        titre_evenement,
        description_evenement,
        id_civilisation,
        id_lieu,
        id_thematique,
        id_categorie,
        id_periode,
        date_debut,
        date_fin
      });
  
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

exports.update = async (req, res) => {
  const event = await Evenement.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Evénement non trouvé' });
  await event.update(req.body);
  res.json(event);
};

exports.remove = async (req, res) => {
  const event = await Evenement.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Evénement non trouvé' });
  await event.destroy();
  res.json({ message: 'Evénement supprimé' });
};
