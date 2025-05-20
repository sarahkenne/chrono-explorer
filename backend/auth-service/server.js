const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());

// Connexion à la base
sequelize.authenticate()
  .then(() => console.log("Connexion à MySQL réussie !"))
  .catch((err) => console.error("Erreur de connexion à MySQL:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
