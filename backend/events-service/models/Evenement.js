const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Evenement = sequelize.define('Evenement', {
  id_evenement: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titre_evenement: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description_evenement: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_civilisation: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_lieu: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_thematique: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_categorie: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_periode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'evenement_historique',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Evenement;
