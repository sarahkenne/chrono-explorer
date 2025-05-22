const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Thematique = sequelize.define('Thematique', {
    id_thematique: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_thematique: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'thematique',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  module.exports = Thematique;