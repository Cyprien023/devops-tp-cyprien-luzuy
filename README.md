# SummitGear — E-commerce de vêtements techniques de randonnée

![CI](https://github.com/Cyprien023/devops-tp-cyprien-luzuy/actions/workflows/ci.yml/badge.svg)

Application web e-commerce full-stack permettant aux utilisateurs de parcourir une collection de vêtements techniques de randonnée, de créer un compte, de gérer leur panier en base de données et de passer commande.

---

## Stack

React 18, TypeScript, Vite, Tailwind
React Router
Node.js, Express, TypeScript
Prisma 5
PostgreSQL 15
JWT , bcryptjs

---

## Lancer le projet

### Prérequis

- Node.js >= 22.12
- PostgreSQL 15 installé et démarré
- Git

### 1. Cloner le dépôt

```bash
git clone https://github.com/<votre-username>/devops-tp-cyprien-luzuy.git
cd devops-tp-cyprien-luzuy
```

### 2. Backend

```bash
cd summitgear-api

# Installer les dépendances
npm install

# Copier et remplir les variables d'environnement
cp .env.example .env
# → éditer .env avec vos valeurs (DATABASE_URL, JWT_SECRET)

# Créer la base de données PostgreSQL
psql -U postgres -c "CREATE DATABASE summitgear;"

# Appliquer les migrations et générer le client Prisma
npx prisma migrate dev
npx prisma generate

# Démarrer le serveur de développement (port 3001)
npm run dev
```

### 3. Frontend

```bash
cd e-commerce-rando

# Installer les dépendances
npm install

# Démarrer le serveur de développement (port 5173)
npm run dev
```

### 4. Accéder à l'application

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:3001/api |
| Prisma Studio | http://localhost:5555 (via `npx prisma studio`) |

---

## Tester

```bash
# Backend — lancer les tests
cd summitgear-api
npm test

# Frontend — lancer les tests
cd e-commerce-rando
npm test
```

> Les tests sont à implémenter avec **Vitest** (frontend) et **Jest + Supertest** (backend).

---

## Architecture

```
devops-tp-cyprien-luzuy/
├── e-commerce-rando/          # Frontend React + Vite
│   ├── src/
│   │   ├── api/               # Client HTTP (fetch + gestion token)
│   │   ├── components/        # Composants réutilisables (Navbar…)
│   │   ├── context/           # Contextes React (Auth, Cart)
│   │   ├── data/              # Données statiques produits
│   │   └── pages/             # Pages (Home, Shop, Product, Cart, Login, Register)
│   └── public/                # Images produits
│
├── summitgear-api/            # Backend Express + Prisma
│   ├── prisma/
│   │   ├── schema.prisma      # Modèles de données
│   │   └── migrations/        # Historique des migrations SQL
│   └── src/
│       ├── middleware/        # Middleware JWT (requireAuth)
│       ├── routes/            # Routes Express (auth, products, cart, orders)
│       └── index.ts           # Point d'entrée du serveur
│
└── docs/                      # Documentation complémentaire
```

Pour la documentation détaillée de l'API et du schéma de base de données, voir [`docs/`](./docs/).

---

## Endpoints API

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Non | Créer un compte |
| POST | `/api/auth/login` | Non | Se connecter |
| GET | `/api/auth/me` | Oui | Profil utilisateur connecté |
| GET | `/api/products` | Non | Liste des produits |
| GET | `/api/products/:slug` | Non | Détail d'un produit |
| GET | `/api/cart` | Oui | Lire le panier |
| POST | `/api/cart/items` | Oui | Ajouter un article |
| DELETE | `/api/cart/items/:id` | Oui | Retirer un article |
| POST | `/api/orders` | Oui | Passer commande |
| GET | `/api/orders` | Oui | Historique des commandes |

---

## Auteur

**Cyprien Luzuy** — étudiant M1 DevOps  
[github.com/cyprien-luzuy](https://github.com/cyprien-luzuy)
