const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Commentaire = sequelize.define('Commentaire', {
  id_commentaire: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_evenement: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('en_attente', 'valide', 'refuse'),
    defaultValue: 'en_attente'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'commentaires',
  timestamps: false
});

module.exports = Commentaire;
