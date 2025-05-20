const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');
const eventsRoutes = require('./routes/eventsRoutes');
const favorisRoutes = require('./routes/favorisRoutes');
const commentairesRoutes = require('./routes/commentairesRoutes');

app.use(express.json());

// Connexion à la BDD
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à MySQL réussie.');
  })
  .catch((err) => console.error('Erreur BDD :', err));

app.use('/api/events', eventsRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/commentaires', commentairesRoutes);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Events-service lancé sur le port ${PORT}`));