# MVP_Project

Projet dans le cadre du cours MVP

## Prérequis

- Node.js
- Docker

## Setup

1. Lancer la base de données :

```bash
cd securityplanner/database
docker compose up
```

2. Aller dans le dossier `securityplanner` :

```bash
cd securityplanner
```

3. Créer le fichier `.env` en copiant le fichier `.env.example` :

```
DATABASE_URL=postgresql://postgres:example@localhost:5432/securityplanner
SESSION_SECRET=openssl rand -base64 32
```

4. Installer les dépendances :

```bash
npm install
```

5. Générer la base de données :

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

6. Lancer le serveur :

```bash
npm run dev
```
