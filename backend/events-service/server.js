const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const sequelize = require('./config/db');
const eventsRoutes = require('./routes/eventsRoutes');
const favorisRoutes = require('./routes/favorisRoutes');
const commentairesRoutes = require('./routes/commentairesRoutes');

const lieuxRoutes = require('./routes/lieuxRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const thematiquesRoutes = require('./routes/thematiquesRoutes');
const periodesRoutes = require('./routes/periodesRoutes');
const civilisationsRoutes = require('./routes/civilisationsRoutes');

app.use(express.json());

// Ajout du CORS dans les routes
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));

// Connexion à la BDD
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à MySQL réussie.');
  })
  .catch((err) => console.error('Erreur BDD :', err));

app.use('/api/events', eventsRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/commentaires', commentairesRoutes);

app.use('/api/lieux', lieuxRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/thematiques', thematiquesRoutes);
app.use('/api/periodes', periodesRoutes);
app.use('/api/civilisations', civilisationsRoutes);



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Events-service lancé sur le port ${PORT}`));