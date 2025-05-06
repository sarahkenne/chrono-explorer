create database Chrono_Explorer_DB;
USE Chrono_Explorer_DB;


-- Table Utilisateurs
CREATE TABLE Utilisateurs (
    id_utilisateur INT PRIMARY KEY IDENTITY,
    nom_utilisateur VARCHAR(100),
    prenom_utilisateur VARCHAR(100),
    adresse_email VARCHAR(150) UNIQUE,
	mot_de_passe VARCHAR(255),
    role VARCHAR(50)
);

-- Table Civilisations
CREATE TABLE Civilisations (
    id_civilisation INT PRIMARY KEY IDENTITY,
    nom_civilisation VARCHAR(100)
);

-- Table Categorie
CREATE TABLE Categorie (
    id_categorie INT PRIMARY KEY IDENTITY,
    nom_categorie VARCHAR(100)
);

-- Table Lieu
CREATE TABLE Lieu (
    id_lieu INT PRIMARY KEY IDENTITY,
    nom_lieu VARCHAR(100)
);

-- Table Thematique
CREATE TABLE Thematique (
    id_thematique INT PRIMARY KEY IDENTITY,
    nom_thematique VARCHAR(100)
);
-- Table Periode_historique
CREATE TABLE Periode_historique (
    id_periode INT PRIMARY KEY IDENTITY,
    nom_periode VARCHAR(100),
    date_debut DATE,
    date_fin DATE
);


-- Table Evenement_historique
CREATE TABLE Evenement_historique (
    id_evenement INT PRIMARY KEY IDENTITY,
    nom_evenement VARCHAR(150),
    description_evenement TEXT,
    titre_evenement VARCHAR(150),
    date_evenement DATE,
    id_civilisation INT,
    id_lieu INT,
    id_thematique INT,
    id_categorie INT,
    id_periode INT,
    FOREIGN KEY (id_civilisation) REFERENCES Civilisations(id_civilisation),
    FOREIGN KEY (id_lieu) REFERENCES Lieu(id_lieu),
    FOREIGN KEY (id_thematique) REFERENCES Thematique(id_thematique),
    FOREIGN KEY (id_categorie) REFERENCES Categorie(id_categorie),
    FOREIGN KEY (id_periode) REFERENCES Periode_historique(id_periode)
);

-- Table Fiche_descriptive
CREATE TABLE Fiche_descriptive (
    id_fiche INT PRIMARY KEY IDENTITY(1,1),
	titre_fiche VARCHAR(150),
    id_evenement INT NOT NULL,
    description TEXT,
    FOREIGN KEY (id_evenement) REFERENCES Evenement_historique(id_evenement)
);

-- Table pour les images associées à une fiche
CREATE TABLE Image_fiche (
    id_image INT PRIMARY KEY IDENTITY(1,1),
    id_fiche INT NOT NULL,
    url_image VARCHAR(255) NOT NULL,
    legende VARCHAR(255),
    FOREIGN KEY (id_fiche) REFERENCES Fiche_descriptive(id_fiche)
);

-- Table pour les sources associées à une fiche
CREATE TABLE Source_fiche (
    id_source INT PRIMARY KEY IDENTITY(1,1),
    id_fiche INT NOT NULL,
    url_source VARCHAR(255) NOT NULL,
    type_source VARCHAR(50),         -- exemple : livre, article, lien web...
    titre VARCHAR(255),
    FOREIGN KEY (id_fiche) REFERENCES Fiche_descriptive(id_fiche)
);

-- Table Commentaire
CREATE TABLE Commentaire (
    id_commentaire INT PRIMARY KEY IDENTITY,
    description_commentaire TEXT,
    date_commentaire DATE,
    statut_commentaire VARCHAR(50),
    id_utilisateur INT,
    id_evenement INT,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateurs(id_utilisateur),
    FOREIGN KEY (id_evenement) REFERENCES Evenement_historique(id_evenement)
);

-- Table ArchivesMultimedia
CREATE TABLE ArchivesMultimedia (
    id INT PRIMARY KEY IDENTITY,
    description_archive TEXT,
    type_archive VARCHAR(50),
    id_evenement INT,
    FOREIGN KEY (id_evenement) REFERENCES Evenement_historique(id_evenement)
);

-- Table Favoris
CREATE TABLE Favoris (
    id_utilisateur INT,
    id_evenement INT,
    date_ajout DATE,
    PRIMARY KEY (id_utilisateur, id_evenement),
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateurs(id_utilisateur),
    FOREIGN KEY (id_evenement) REFERENCES Evenement_historique(id_evenement)
);

-- Table Proposition_evenement
CREATE TABLE Proposition_evenement (
    id_utilisateur INT,
    id_evenement INT,
    statut_proposition VARCHAR(50),
    date_proposition DATE,
    PRIMARY KEY (id_utilisateur, id_evenement),
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateurs(id_utilisateur),
    FOREIGN KEY (id_evenement) REFERENCES Evenement_historique(id_evenement)
);
