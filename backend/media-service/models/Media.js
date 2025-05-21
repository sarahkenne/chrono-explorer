const Media = sequelize.define('Media', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  description_archive: { type: DataTypes.TEXT, allowNull: false },
  type_archive: { type: DataTypes.STRING, allowNull: false }, // 'image', 'audio', 'video', 'pdf', etc.
  nom_fichier: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  id_evenement: { type: DataTypes.INTEGER, allowNull: false },
  principal: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'medias'
});
