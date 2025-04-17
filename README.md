# 🎬 CinéHall – Application Frontend

Bienvenue dans le dépôt frontend de **CinéHall**, une application web intuitive permettant aux utilisateurs de consulter les films, réserver leurs sièges de cinéma, gérer leurs billets et leur profil personnel. Cette interface consomme l’API CinéHall développée séparément.

---

## 🚀 Objectif du projet

Développer une application **responsive**, **moderne** et **ergonomique** en **React.js** (ou JavaScript natif/Vue.js selon le choix) qui interagit avec l’API CinéHall et offre les fonctionnalités suivantes :

- Consultation des films et des séances disponibles
- Réservation et paiement des places
- Téléchargement de billets avec QR Code
- Gestion du profil utilisateur et des réservations

---

## 🧩 Fonctionnalités principales

### 👤 Gestion des utilisateurs
- Inscription / Connexion via **JWT**
- Modification et suppression de profil
- Affichage des informations personnelles

### 🎞️ Films & séances
- Liste des films (titre, description, image, durée, genre, âge minimum…)
- Détails et bande-annonce intégrée
- Séances par film avec informations détaillées
- Filtrage des séances (Normale / VIP)

### 🪑 Réservation de sièges
- Visualisation graphique de la salle et des sièges
- Sélection manuelle des sièges (support spécial pour sièges couple)
- Calcul automatique du prix
- Avertissement de réservation expirant dans 15 min
- Suivi du statut de réservation (réservé, payé, expiré)

### 💳 Paiement
- Simulation de paiement (Stripe, PayPal, ou interface fictive)
- Validation et mise à jour du statut après paiement

### 🎟️ Billet électronique
- Affichage détaillé du billet
- Génération d’un **QR Code**
- Téléchargement du billet au format **PDF**

### 📁 Espace utilisateur
- Liste des réservations (passées et en cours)
- Téléchargement de billets
- Annulation ou modification de réservation

---

## 🛠️ Technologies utilisées

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) (ou Bootstrap)
- [Axios](https://axios-http.com/) pour la communication avec l’API
- [React Router](https://reactrouter.com/) pour la navigation
- [JWT](https://jwt.io/) pour l’authentification
- [QRCode.react](https://github.com/zpao/qrcode.react) pour les QR Codes
- [jspdf](https://github.com/parallax/jsPDF) pour la génération de PDF

---

## 🧪 Lancer le projet en local

### 1. Cloner le dépôt
```bash
git clone https://github.com/Mahdi732/CineHall.git
cd CineHall
