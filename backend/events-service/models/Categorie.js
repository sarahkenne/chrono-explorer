const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorie = sequelize.define('Categorie', {
    id_categorie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_categorie: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'categorie',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  module.exports = Categorie;
  