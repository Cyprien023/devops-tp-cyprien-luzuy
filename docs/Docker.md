# Section à ajouter dans le README.md principal
# Remplace la section "Lancer le projet" existante

## Lancer le projet

### Prérequis

- [Docker](https://www.docker.com/get-started) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2.x
- Git

> Pour le développement local sans Docker, voir [Développement local](#développement-local) ci-dessous.

### Avec Docker (recommandé)

```bash
git clone https://github.com/cyprien-luzuy/devops-tp-cyprien-luzuy.git
cd devops-tp-cyprien-luzuy
cp summitgear-api/.env.example summitgear-api/.env
# Éditer .env : renseigner DB_PASSWORD et JWT_SECRET
docker compose up -d
```

L'application est accessible sur :

| Service | URL                          |
|---|------------------------------|
| Frontend | http://localhost:8080/             |
| API | http://localhost:3001/api    |
| Health check | http://localhost:3001/health |

Vérifier que tout tourne :

```bash
docker compose ps
curl http://localhost:3001/health
```

Arrêter :

```bash
docker compose down
# Pour supprimer aussi les données :
docker compose down -v
```

### Développement local

```bash
# Backend
cd summitgear-api
cp .env.example .env   # renseigner DATABASE_URL avec localhost
npm install
npx prisma migrate dev
npm run dev            # http://localhost:3001

# Frontend (autre terminal)
cd e-commerce-rando
npm install
npm run dev            # http://localhost:5173
```