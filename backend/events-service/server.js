const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');
const eventsRoutes = require('./routes/eventsRoutes');

app.use(express.json());

// Connexion à la BDD
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à MySQL réussie.');
  })
  .catch((err) => console.error('Erreur BDD :', err));

app.use('/api/events', eventsRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Events-service lancé sur le port ${PORT}`));