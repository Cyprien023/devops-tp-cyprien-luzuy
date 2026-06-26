# Stratégie DevOps — SummitGear

> E-commerce de vêtements techniques de randonnée  
> Auteur : Cyprien Luzuy — M1 DevOps, École Hexagone  
> Dernière mise à jour : 26 juin 2026

---

## 1. Architecture technique cible

SummitGear suit une architecture trois tiers conteneurisée, avec un frontend, l'API REST et la base de données relationnelle.

```
┌─────────────────────────────────────────────────────────┐
│                     Utilisateur                         │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP :8080
┌───────────────────────▼─────────────────────────────────┐
│           Frontend — nginx:alpine                       │
│   React 18 + TypeScript + Tailwind CSS (build Vite)     │
│   Sert les fichiers statiques + proxy /api → backend    │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP :3001 (réseau Docker interne)
┌───────────────────────▼─────────────────────────────────┐
│           Backend — node:22-alpine                      │
│   Express + TypeScript + Prisma ORM                     │
│   JWT Auth · bcrypt · Helmet · CORS                     │
└───────────────────────┬─────────────────────────────────┘
                        │ TCP :5432 (réseau Docker interne)
┌───────────────────────▼─────────────────────────────────┐
│           Base de données — postgres:15-alpine          │
│   PostgreSQL · volume persistant db_data                │
└─────────────────────────────────────────────────────────┘
```

Les trois services communiquent sur un réseau Docker privé `summitgear`. Seuls les ports 8080 (frontend) et 3001 (API) sont exposés à l'hôte.

---

## 2. Structure du repository

Le repository est un monorepo contenant le frontend, le backend et toute l'infrastructure au même endroit. Cette approche simplifie la CI/CD et garantit la cohérence des versions.

---

## 3. Workflow Git

Le projet suit le workflow **GitHub Flow** adapté, avec des protections de branche sur `main`.

### Branches

| Branche | Rôle |
|---|---|
| `main` | Code stable, déployable en production |
| `dev` | Intégration continue des fonctionnalités |
| `feat/<nom>` | Nouvelle fonctionnalité |
| `fix/<nom>` | Correction de bug |
| `docs/<nom>` | Documentation uniquement |
| `chore/<nom>` | Maintenance (deps, config, CI) |

### Règles de protection sur `main`

- Les push directs sont interdits
- Toute modification passe par une Pull Request depuis `dev`
- Les status checks CI doivent être verts avant le merge :
    - `Backend — install / lint / test / build`
    - `Frontend — install / lint / build`
- La branche doit être à jour avec `main` avant le merge

### Conventions de commit (Conventional Commits)

```
feat(auth): add JWT login endpoint
fix(cart): fix quantity not updating on increment
docs(env): add env.example with all required variables
chore(deps): upgrade prisma to 5.22
test(auth): add register route unit tests
ci: add GitHub Actions workflow with postgres service
```

### Hook pre-commit (Husky + lint-staged)

Avant chaque commit, `lint-staged` lance automatiquement ESLint et Prettier sur les fichiers modifiés dans `summitgear-api/src/**/*.ts`. Un commit avec des erreurs de lint est automatiquement refusé.

---

## 4. Services Docker prévus

Le `docker-compose.yml` orchestre trois services sur un réseau bridge privé `summitgear`.

### `db` — PostgreSQL 15 Alpine
- Image légère `postgres:15-alpine`

### `backend` — API Express
- Démarre uniquement quand `db` est `healthy`
- Applique les migrations Prisma au démarrage (`prisma migrate deploy`)
- Exposé sur le port `3001`
- Tourne avec un utilisateur non-root car c'est mieux pour la sécurité

### `frontend` — React via nginx
- Build Vite en stage `builder`, via par `nginx:alpine`
- Le `nginx.conf` gère le routing SPA (toutes les routes → `index.html`)
- Proxifie les requêtes `/api/*` vers le service `backend` (résolution par nom de service Docker)
- Exposé sur le port `8080`

---

## 5. Variables d'environnement

Toutes les variables sensibles sont définies dans un fichier `.env` non versionné. Le fichier `.env.example` versionné sert de documentation et de template.

| Variable | Service | Description |
|---|---|---|
| `PORT` | backend | Port d'écoute de l'API (défaut : 3001) |
| `NODE_ENV` | backend | Environnement (`development`, `production`, `test`) |
| `DB_HOST` | backend | Hostname PostgreSQL (`db` en Docker, `localhost` en local) |
| `DB_PORT` | backend | Port PostgreSQL (défaut : 5432) |
| `DB_USER` | backend, db | Utilisateur PostgreSQL |
| `DB_PASSWORD` | backend, db | Mot de passe PostgreSQL — ne jamais committer |
| `DB_NAME` | backend, db | Nom de la base de données |
| `DATABASE_URL` | backend (Prisma) | URL de connexion complète pour Prisma |
| `JWT_SECRET` | backend | Clé secrète pour signer les tokens JWT — min. 64 caractères |
| `JWT_EXPIRES_IN` | backend | Durée de validité des tokens (ex: `7d`) |
| `CORS_ORIGIN` | backend | Origine autorisée pour les requêtes cross-origin |

### Génération du JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Règles de sécurité

- `.env` est dans le `.gitignore` — vérifié par `git status` avant chaque push
- En CI, les variables sont déclarées dans le bloc `env:` du job GitHub Actions, jamais dans le code
- En production, utiliser les **GitHub Secrets** pour injecter les valeurs sensibles

---

## 6. Stratégie de tests

La stratégie suit la pyramide des tests : beaucoup de tests unitaires rapides, quelques tests d'intégration.

### Tests unitaires (Jest + ts-jest)

Fichier : `src/__tests__/unit.test.ts`

Fonctions pures testées sans base de données ni réseau :

- **authUtils** : `hashPassword`, `verifyPassword`, `isValidEmail`, `isValidPassword`
- **orderUtils** : `computeCartTotal`, `transformAIRecommendation` (avec mock IA)

9 tests · pattern AAA (Arrange / Act / Assert) · exécution < 2s

### Tests d'intégration (Jest + Supertest)

Fichier : `src/__tests__/integration.test.ts`

Routes HTTP testées avec une instance Express réelle :

- `GET /health` → 200
- `POST /api/auth/register` → 400 si champs manquants
- `POST /api/auth/login` → 401 si mauvais credentials
- `GET /api/cart` → 401 sans token
- `GET /route-inconnue` → 404

9 tests et pas de base de données requise

### Mock IA (T20)

La fonction `transformAIRecommendation` simule une réponse d'IA sans aucun appel réseau. Les tests passent sans clé API configurée — validation : supprimer `JWT_SECRET`, lancer `npm test`, tout doit être vert.

### Couverture cible

```bash
npm run test:coverage
```
---

## 7. Pipeline CI prévu

Le pipeline GitHub Actions se déclenche sur chaque push vers `main` ou `develop`, et sur chaque Pull Request.

```
Push / PR
    │
    ├── Job: Backend ──────────────────────────────────────────
    │   ├── Checkout du code
    │   ├── Setup Node.js 22 (cache npm activé)
    │   ├── npm ci (summitgear-api/)
    │   ├── npx prisma generate
    │   ├── npx prisma migrate deploy (sur postgres:15 éphémère)
    │   ├── npm run lint (ESLint + Prettier)
    │   ├── npm test (18 tests Jest)
    │   └── npm run build (tsc --noEmit)
    │
    └── Job: Frontend ─────────────────────────────────────────
        ├── Checkout du code
        ├── Setup Node.js 22 (cache npm activé)
        ├── npm ci (e-commerce-rando/)
        ├── npm run lint (ESLint)
        └── npm run build (Vite)
```

### Cache des dépendances (T25)

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm
    cache-dependency-path: summitgear-api/package-lock.json
```

Le second run est plus rapide grâce au cache npm GitHub Actions.

### Protection de branche

Les deux jobs doivent être verts pour qu'une PR soit mergeable sur `main`.

---

## 8. Sécurité et secrets

### Authentification

- Mots de passe hashés avec **bcrypt** (12 rounds) — irréversibles
- Sessions gérées par **JWT** signé avec `JWT_SECRET` (durée : 7 jours)
- Toutes les routes sensibles (`/cart`, `/orders`) protégées par le middleware `requireAuth`

### Sécurité HTTP

- **Helmet** : positionne les headers de sécurité HTTP (CSP, HSTS, X-Frame-Options…)
- **CORS** : origine strictement limitée à `CORS_ORIGIN` (pas de wildcard `*` en production)
- L'API tourne sous un utilisateur non-root dans Docker (`appuser`)

### Gestion des secrets

- `.env` dans le `.gitignore` — jamais versionné
- En CI : variables dans le bloc `env:` du workflow, valeurs de test sans données réelles
- En production : utiliser les **GitHub Secrets** → injectés comme variables d'environnement dans le workflow de déploiement
- `JWT_SECRET` doit faire minimum 64 caractères aléatoires (généré avec `crypto.randomBytes`)

### Dépendances

```bash
npm audit          # vérification des vulnérabilités
npm audit fix      # correction automatique des vulnérabilités non-breaking
```

---

## 9. Logs prévus

### Logs applicatifs actuels

Le serveur Express loge au démarrage :
```
API SummitGear running on http://localhost:3001
```

La règle ESLint `no-console: warn` évite les `console.log` intempestifs en dehors du démarrage.

### Logs Docker

```bash
docker compose logs backend    # logs du backend en temps réel
docker compose logs -f         # tous les services en continu
docker compose logs --tail=50  # 50 dernières lignes
```

---

## 10. Risques DevOps

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Fuite du `.env` (commit accidentel) | Moyenne | Critique | `.gitignore` + hook pre-commit + `git-secrets` |
| Port 80 déjà alloué sur l'hôte | Élevée (Windows) | Faible | Port remappé sur `8080` dans `docker-compose.yml` |
| Token JWT expiré côté client | Élevée | Moyen | Intercepteur `apiFetch` → redirect `/login` si 401 |

---

## 11. Commandes de lancement

### Avec Docker (production)

```bash
git clone https://github.com/cyprien-luzuy/devops-tp-cyprien-luzuy.git
cd devops-tp-cyprien-luzuy
cp summitgear-api/.env.example .env
# Éditer .env : renseigner DB_PASSWORD et JWT_SECRET
docker compose up -d
```

| Service | URL |
|---|---|
| Frontend | http://localhost:8080 |
| API | http://localhost:3001/api |
| Health check | http://localhost:3001/health |

```bash
# Vérifier l'état des containers
docker compose ps

# Consulter les logs
docker compose logs -f backend

# Arrêter
docker compose down

# Arrêter et supprimer les données
docker compose down -v
```

### En développement local

```bash
# Backend (terminal 1)
cd summitgear-api
cp .env.example .env   # adapter DATABASE_URL avec localhost
npm install
npx prisma migrate dev
npm run dev            # http://localhost:3001

# Frontend (terminal 2)
cd e-commerce-rando
npm install
npm run dev            # http://localhost:5173
```

### Tests

```bash
cd summitgear-api
npm test               # 18 tests
npm run test:coverage  # rapport de couverture
npm run lint           # ESLint + Prettier
```

---

## 12. Prochaines actions


- **Validation des entrées** : ajouter `zod` ou `express-validator` sur toutes les routes pour rejeter les payloads malformés avant d'atteindre Prisma
- **Refresh token** : implémenter un le renouvellement du JWT pour éviter les déconnexions
- **Déploiement automatique** : ajouter un job `deploy` dans `ci.yml` qui pousse l'image Docker sur un registry (GHCR ou Docker Hub) et redémarre le service sur le serveur cible après un merge sur `main`
