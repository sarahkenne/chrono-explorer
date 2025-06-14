-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 25 mai 2025 à 17:40
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chrono_explorer_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `archivesmultimedia`
--

CREATE TABLE `archivesmultimedia` (
  `id` int(11) NOT NULL,
  `description_archive` text DEFAULT NULL,
  `type_archive` varchar(50) DEFAULT NULL,
  `id_evenement` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nom_fichier` varchar(255) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `principal` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `archivesmultimedia`
--

INSERT INTO `archivesmultimedia` (`id`, `description_archive`, `type_archive`, `id_evenement`, `created_at`, `updated_at`, `nom_fichier`, `url`, `principal`) VALUES
(1, 'mage de la fondation de Rome', 'image', 1, '2025-05-20 01:40:39', '2025-05-20 15:02:08', '1747698039310.jpg', 'http://localhost:3003/uploads/1747698039310.jpg', 1),
(2, 'chutte de l\'Empire romain d\'occident', 'image', 2, '2025-05-20 01:54:27', '2025-05-20 15:02:08', '1747698867266.jpg', 'http://localhost:3003/uploads/1747698867266.jpg', 1),
(3, 'Guerre du Péloponnèse', 'image', 4, '2025-05-20 02:01:18', '2025-05-20 15:02:08', '1747699278601.jpg', 'http://localhost:3003/uploads/1747699278601.jpg', 1),
(4, 'construction des pyramides', 'image', 5, '2025-05-20 02:05:51', '2025-05-20 15:02:08', '1747699551889.png', 'http://localhost:3003/uploads/1747699551889.png', 1),
(5, 'couronnement de Charlemagne', 'image', 6, '2025-05-20 02:10:13', '2025-05-20 15:02:08', '1747699813044.jpg', 'http://localhost:3003/uploads/1747699813044.jpg', 1),
(6, 'Declaration des droits de l\'homme', 'image', 7, '2025-05-20 02:13:50', '2025-05-20 15:02:08', '1747700030305.jpg', 'http://localhost:3003/uploads/1747700030305.jpg', 1),
(7, 'Seconde Guerre mondiale', 'image', 8, '2025-05-20 02:22:39', '2025-05-20 15:02:08', '1747700559601.jpg', 'http://localhost:3003/uploads/1747700559601.jpg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `nom_categorie` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom_categorie`, `created_at`, `updated_at`) VALUES
(1, 'Révolutions', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(2, 'Inventions', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(3, 'Explorations', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(4, 'Batailles', '2025-05-19 22:41:27', '2025-05-19 22:41:27');

-- --------------------------------------------------------

--
-- Structure de la table `civilisations`
--

CREATE TABLE `civilisations` (
  `id_civilisation` int(11) NOT NULL,
  `nom_civilisation` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `civilisations`
--

INSERT INTO `civilisations` (`id_civilisation`, `nom_civilisation`, `created_at`, `updated_at`) VALUES
(1, 'Rome antique', '2025-05-19 22:38:47', '2025-05-19 22:38:47'),
(2, 'Égypte ancienne', '2025-05-19 22:38:47', '2025-05-19 22:38:47'),
(3, 'Grèce antique', '2025-05-19 22:38:47', '2025-05-19 22:38:47');

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id_commentaire` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `statut` enum('en_attente','valide','refuse') DEFAULT 'en_attente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id_commentaire`, `id_utilisateur`, `id_evenement`, `contenu`, `statut`, `created_at`, `updated_at`) VALUES
(1, 1, 5, 'Très intéressant comme période historique !', 'valide', '2025-05-20 22:22:57', '2025-05-20 22:35:37'),
(2, 1, 1, 'Très bien !', 'valide', '2025-05-20 22:23:34', '2025-05-20 22:35:51'),
(3, 1, 2, 'j\'adore !', 'refuse', '2025-05-20 22:23:52', '2025-05-20 22:36:18'),
(4, 1, 6, 'j\'aime la description merci', 'en_attente', '2025-05-20 22:42:20', '2025-05-20 22:42:20');

-- --------------------------------------------------------

--
-- Structure de la table `evenement_historique`
--

CREATE TABLE `evenement_historique` (
  `id_evenement` int(11) NOT NULL,
  `description_evenement` text DEFAULT NULL,
  `titre_evenement` varchar(150) DEFAULT NULL,
  `id_civilisation` int(11) DEFAULT NULL,
  `id_lieu` int(11) DEFAULT NULL,
  `id_thematique` int(11) DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL,
  `id_periode` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_debut` datetime NOT NULL,
  `date_fin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `evenement_historique`
--

INSERT INTO `evenement_historique` (`id_evenement`, `description_evenement`, `titre_evenement`, `id_civilisation`, `id_lieu`, `id_thematique`, `id_categorie`, `id_periode`, `created_at`, `updated_at`, `date_debut`, `date_fin`) VALUES
(1, 'Selon la légende, Rome fut fondée en 753 av. J.-C.', 'Fondation de Rome', 1, 1, 3, 2, 4, '2025-05-19 23:04:31', '2025-05-19 23:04:31', '0753-04-21 02:00:00', '0753-04-21 02:00:00'),
(2, 'Fin officielle de l\'Empire romain d\'Occident en 476.', 'Chute de l\'Empire romain d\'Occident', 1, 1, 2, 1, 1, '2025-05-19 23:05:50', '2025-05-19 23:05:50', '0476-09-04 02:00:00', '0476-09-04 02:00:00'),
(4, 'Conflit majeur entre Athènes et Sparte ayant duré près de 30 ans.', 'Guerre du Péloponnèse', 3, 3, 2, 4, 1, '2025-05-19 23:19:27', '2025-05-19 23:19:27', '0431-01-01 02:00:00', '0404-01-01 02:00:00'),
(5, 'Construites sous les règnes de Khéops, Khéphren et Mykérinos.', 'Construction des Pyramides de Gizeh', 2, 2, 4, 2, 1, '2025-05-19 23:19:44', '2025-05-19 23:19:44', '2600-01-01 02:00:00', '2500-01-01 02:00:00'),
(6, 'Charlemagne est couronné empereur à Rome par le pape Léon III.', 'Couronnement de Charlemagne', 1, 1, 1, 1, 2, '2025-05-19 23:19:58', '2025-05-19 23:19:58', '0800-12-25 02:00:00', '0800-12-25 02:00:00'),
(7, 'Texte fondamental adopté pendant la Révolution française.', 'Déclaration des Droits de l\'Homme et du Citoyen', 1, 1, 1, 1, 4, '2025-05-19 23:20:11', '2025-05-19 23:20:11', '1789-08-26 02:00:00', '1789-08-26 02:00:00'),
(8, 'Conflit mondial opposant les Alliés aux puissances de l’Axe.', 'Seconde Guerre mondiale', 1, 1, 2, 4, 4, '2025-05-19 23:20:30', '2025-05-19 23:20:30', '1939-09-01 02:00:00', '1945-09-02 02:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

CREATE TABLE `favoris` (
  `id_favori` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_evenement` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `favoris`
--

INSERT INTO `favoris` (`id_favori`, `id_utilisateur`, `id_evenement`, `created_at`) VALUES
(4, 1, 1, '2025-05-20 22:20:02'),
(5, 1, 7, '2025-05-20 22:20:24');

-- --------------------------------------------------------

--
-- Structure de la table `lieu`
--

CREATE TABLE `lieu` (
  `id_lieu` int(11) NOT NULL,
  `nom_lieu` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `lieu`
--

INSERT INTO `lieu` (`id_lieu`, `nom_lieu`, `created_at`, `updated_at`) VALUES
(1, 'Rome', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(2, 'Thèbes', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(3, 'Athènes', '2025-05-19 22:41:27', '2025-05-19 22:41:27');

-- --------------------------------------------------------

--
-- Structure de la table `periode_historique`
--

CREATE TABLE `periode_historique` (
  `id_periode` int(11) NOT NULL,
  `nom_periode` varchar(100) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `periode_historique`
--

INSERT INTO `periode_historique` (`id_periode`, `nom_periode`, `date_debut`, `date_fin`, `created_at`, `updated_at`) VALUES
(1, 'Antiquité', '0500-01-01', '1500-01-01', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(2, 'Moyen Âge', '0500-01-01', '1500-01-01', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(3, 'Temps modernes', '1500-01-01', '1800-01-01', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(4, 'Époque contemporaine', '1800-01-01', '2025-01-01', '2025-05-19 22:41:27', '2025-05-19 22:41:27');

-- --------------------------------------------------------

--
-- Structure de la table `thematique`
--

CREATE TABLE `thematique` (
  `id_thematique` int(11) NOT NULL,
  `nom_thematique` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `thematique`
--

INSERT INTO `thematique` (`id_thematique`, `nom_thematique`, `created_at`, `updated_at`) VALUES
(1, 'Politique', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(2, 'Guerre', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(3, 'Religion', '2025-05-19 22:41:27', '2025-05-19 22:41:27'),
(4, 'Culture', '2025-05-19 22:41:27', '2025-05-19 22:41:27');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL,
  `nom_utilisateur` varchar(100) DEFAULT NULL,
  `prenom_utilisateur` varchar(100) DEFAULT NULL,
  `adresse_email` varchar(150) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `adresse_email`, `mot_de_passe`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Durand', 'Marie', 'marie@example.com', '$2b$10$myeNC9NOBJ.3.LWuNkombOgzOfkX4WaUnVNmR1etJ/9gcaJhAjCr2', 'utilisateur', '2025-05-18 09:21:20', '2025-05-18 09:21:20'),
(2, 'Temgoua', 'Carine', 'carine@example.com', '$2b$10$HcPwof/fKcrzGKCPIIFBkuUfjSRJLZfCGrJJa8YRwh8OqWXi5O5eO', 'admin', '2025-05-18 14:05:13', '2025-05-18 16:45:05');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `archivesmultimedia`
--
ALTER TABLE `archivesmultimedia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `civilisations`
--
ALTER TABLE `civilisations`
  ADD PRIMARY KEY (`id_civilisation`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id_commentaire`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `evenement_historique`
--
ALTER TABLE `evenement_historique`
  ADD PRIMARY KEY (`id_evenement`),
  ADD KEY `id_civilisation` (`id_civilisation`),
  ADD KEY `id_lieu` (`id_lieu`),
  ADD KEY `id_thematique` (`id_thematique`),
  ADD KEY `id_categorie` (`id_categorie`),
  ADD KEY `id_periode` (`id_periode`);

--
-- Index pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD PRIMARY KEY (`id_favori`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_evenement` (`id_evenement`);

--
-- Index pour la table `lieu`
--
ALTER TABLE `lieu`
  ADD PRIMARY KEY (`id_lieu`);

--
-- Index pour la table `periode_historique`
--
ALTER TABLE `periode_historique`
  ADD PRIMARY KEY (`id_periode`);

--
-- Index pour la table `thematique`
--
ALTER TABLE `thematique`
  ADD PRIMARY KEY (`id_thematique`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `adresse_email` (`adresse_email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `archivesmultimedia`
--
ALTER TABLE `archivesmultimedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `civilisations`
--
ALTER TABLE `civilisations`
  MODIFY `id_civilisation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id_commentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `evenement_historique`
--
ALTER TABLE `evenement_historique`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `favoris`
--
ALTER TABLE `favoris`
  MODIFY `id_favori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `lieu`
--
ALTER TABLE `lieu`
  MODIFY `id_lieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `periode_historique`
--
ALTER TABLE `periode_historique`
  MODIFY `id_periode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `thematique`
--
ALTER TABLE `thematique`
  MODIFY `id_thematique` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `archivesmultimedia`
--
ALTER TABLE `archivesmultimedia`
  ADD CONSTRAINT `archivesmultimedia_ibfk_1` FOREIGN KEY (`id_evenement`) REFERENCES `evenement_historique` (`id_evenement`);

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`),
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement_historique` (`id_evenement`);

--
-- Contraintes pour la table `evenement_historique`
--
ALTER TABLE `evenement_historique`
  ADD CONSTRAINT `evenement_historique_ibfk_1` FOREIGN KEY (`id_civilisation`) REFERENCES `civilisations` (`id_civilisation`),
  ADD CONSTRAINT `evenement_historique_ibfk_2` FOREIGN KEY (`id_lieu`) REFERENCES `lieu` (`id_lieu`),
  ADD CONSTRAINT `evenement_historique_ibfk_3` FOREIGN KEY (`id_thematique`) REFERENCES `thematique` (`id_thematique`),
  ADD CONSTRAINT `evenement_historique_ibfk_4` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`),
  ADD CONSTRAINT `evenement_historique_ibfk_5` FOREIGN KEY (`id_periode`) REFERENCES `periode_historique` (`id_periode`);

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `favoris_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`),
  ADD CONSTRAINT `favoris_ibfk_2` FOREIGN KEY (`id_evenement`) REFERENCES `evenement_historique` (`id_evenement`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
