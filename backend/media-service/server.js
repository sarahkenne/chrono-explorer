const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');
const mediaRoutes = require('./routes/mediaRoutes');
const path = require('path');

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/media', mediaRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connexion MySQL OK');
  })
  .catch((err) => console.error('Erreur de connexion :', err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Media-service lancé sur le port ${PORT}`));