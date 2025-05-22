const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Civilisation = sequelize.define('Civilisation', {
    id_civilisation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_civilisation: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'civilisations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  module.exports = Civilisation;