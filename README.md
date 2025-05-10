# MVP_Project
Projet dans le cadre du cours MVP

## Setup

1. Modifier le fichier `.env` :
```bash
DATABASE_URL="..."
SESSION_SECRET="..." # openssl rand -base64 32
```

2. Lancer la base de données :
```bash
cd securityplanner/database
docker-compose up
```

3. Générer la base de données :
```bash
cd securityplanner
npx prisma migrate dev --name init
npx prisma db seed
```

4. Lancer le serveur :
```bash
cd securityplanner
npm run dev
```
