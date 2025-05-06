const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    const {
      nom_utilisateur,
      prenom_utilisateur,
      adresse_email,
      mot_de_passe,
      confirmer_mot_de_passe,
      role
    } = req.body;
  
    // Vérification des mots de passe
    if (mot_de_passe !== confirmer_mot_de_passe) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }
  
    try {
      const existing = await User.findOne({ where: { adresse_email } });
      if (existing) return res.status(400).json({ message: 'Email déjà utilisé.' });
  
      const hash = await bcrypt.hash(mot_de_passe, 10);
      const user = await User.create({
        nom_utilisateur,
        prenom_utilisateur,
        adresse_email,
        mot_de_passe: hash,
        role: 'utilisateur'
      });
      
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.login = async (req, res) => {
  const { adresse_email, mot_de_passe } = req.body;

  try {
    const user = await User.findOne({ where: { adresse_email } });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user.id_utilisateur, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
