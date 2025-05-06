// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('Utilisateurs', {
  id_utilisateur: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom_utilisateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom_utilisateur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adresse_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'utilisateur'
  }
}, {
  tableName: 'Utilisateurs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;
