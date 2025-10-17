# Photol Diaye - Application de Vente de Produits

## Description

Photol Diaye est une application web de marketplace permettant aux vendeurs de publier des produits et aux clients de les consulter, acheter et interagir avec eux. L'application est construite avec Angular pour le frontend et Node.js/Express avec Prisma pour le backend, utilisant MySQL comme base de données.

## Fonctionnalités Principales

### Pour les Clients
- **Navigation des produits** : Parcourir tous les produits disponibles
- **Détails des produits** : Voir les informations détaillées, images, prix
- **Système de favoris** : Ajouter/retirer des produits aux favoris
- **Système de likes** : Aimer des produits
- **Chat intégré** : Communiquer avec les vendeurs via WhatsApp
- **Système de vues** : Suivre le nombre de vues des produits

### Pour les Vendeurs
- **Publication de produits** : Créer et gérer des produits avec images
- **Gestion des produits** : Modifier, supprimer, changer le statut
- **Points VIP** : Acheter des points VIP pour promouvoir les produits
- **Communication** : Répondre aux messages des clients

### Pour les Administrateurs
- **Tableau de bord** : Gérer les utilisateurs, produits et catégories
- **Modération** : Approuver/rejeter les produits
- **Gestion des utilisateurs** : Changer les rôles, supprimer des comptes
- **Gestion des catégories** : Créer, modifier, supprimer des catégories

## Technologies Utilisées

### Frontend
- **Angular 20** : Framework principal
- **TypeScript** : Langage de programmation
- **CSS** :CSS
- **RxJS** : Programmation réactive

### Backend
- **Node.js** : Runtime JavaScript
- **Express.js** : Framework web
- **TypeScript** : Langage de programmation
- **Prisma** : ORM pour la base de données
- **MySQL** : Base de données
- **JWT** : Authentification
- **bcrypt** : Hashage des mots de passe
- **Zod** : Validation des données

## Structure du Projet

```
projet-photol-diaye/
├── backend/                    # API Backend
│   ├── src/
│   │   ├── controllers/        # Logique des contrôleurs
│   │   ├── services/           # Logique métier
│   │   ├── repositories/       # Accès aux données
│   │   ├── routes/             # Définition des routes
│   │   ├── middleware/         # Middleware personnalisé
│   │   └── utils/              # Utilitaires
│   ├── prisma/
│   │   ├── schema.prisma       # Schéma de la base de données
│   │   └── migrations/         # Migrations Prisma
│   └── package.json
├── frontend/                   # Application Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/           # Module d'authentification
│   │   │   ├── products/       # Module des produits
│   │   │   ├── admin/          # Module d'administration
│   │   │   └── services/       # Services Angular
│   └── package.json
├── setup.sh                    # Script d'installation
└── README.md                   # Ce fichier
```

## Installation et Configuration

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- MySQL (version 8 ou supérieure)
- Angular CLI (installé globalement)

### Étapes d'Installation

1. **Cloner le repository**
   ```bash
   git clone <url-du-repository>
   cd projet-photol-diaye
   ```

2. **Configuration de la base de données**
   - Créer une base de données MySQL nommée `photol_diaye`
   - Créer un fichier `.env` dans le dossier `backend/` :
     ```
     DATABASE_URL="mysql://username:password@localhost:3306/photol_diaye"
     JWT_SECRET="votre-secret-jwt"
     ```

3. **Installation du backend**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Installation du frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Démarrage de l'application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

L'application sera accessible sur :
- Frontend : http://localhost:4200
- Backend : http://localhost:3000

## Utilisation

### Authentification
1. Accédez à l'application
2. Cliquez sur "S'inscrire" pour créer un compte
3. Ou "Se connecter" si vous avez déjà un compte

### Navigation
- **Page d'accueil** : Liste de tous les produits
- **Produits favoris** : Vos produits sauvegardés
- **Acheter des points VIP** : Améliorer la visibilité de vos produits
- **Administration** : (réservé aux administrateurs) Gestion de l'application

### Publication d'un Produit (Vendeurs)
1. Connectez-vous avec un compte vendeur
2. Allez dans "Nouveau produit"
3. Remplissez le formulaire avec les détails du produit
4. Ajoutez des images
5. Soumettez pour approbation

### Gestion Administrative
1. Connectez-vous avec un compte administrateur
2. Accédez au tableau de bord admin
3. Gérez les utilisateurs, produits et catégories

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Produits
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit
- `GET /api/products/:id` - Détails d'un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs (admin)
- `GET /api/users/:id` - Détails d'un utilisateur
- `PUT /api/users/:id/role` - Changer le rôle (admin)

### Autres
- `GET /api/categories` - Liste des catégories
- `POST /api/favorites` - Ajouter aux favoris
- `GET /api/favorites` - Liste des favoris
- `POST /api/likes` - Aimer un produit
- `POST /api/chat` - Envoyer un message

## Scripts Disponibles

### Backend
- `npm run dev` - Démarrage en mode développement
- `npm run build` - Compilation TypeScript
- `npx prisma studio` - Interface graphique Prisma
- `npx prisma migrate dev` - Appliquer les migrations

### Frontend
- `npm start` - Démarrage du serveur de développement
- `npm run build` - Build de production
- `npm test` - Exécution des tests

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout de nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## Licence

Ce projet est sous licence MIT.

## Support

Pour toute question ou problème, veuillez contacter l'équipe de développement.