const sequelize = require('./config/db');

// Tester la connexion :
sequelize.authenticate()
  .then(() => console.log('Connexion à MySQL réussie !'))
  .catch(err => console.error('Erreur de connexion à MySQL:', err));
