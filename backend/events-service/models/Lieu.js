const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Lieu = sequelize.define('Lieu', {
  id_lieu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_lieu: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'lieu',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Lieu;
