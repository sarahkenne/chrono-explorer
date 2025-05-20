const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favori = sequelize.define('Favori', {
  id_favori: {
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'favoris',
  timestamps: false
});

module.exports = Favori;
