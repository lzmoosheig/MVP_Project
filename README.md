# MVP_Project
Projet dans le cadre du cours MVP

## Setup

1. Lancer la base de données :
```bash
cd securityplanner/database
docker-compose up
```

2. Générer la base de données :
```bash
cd securityplanner
npx prisma migrate dev --name init
npx prisma db seed
```

3. Lancer le serveur :
```bash
cd securityplanner
npm run dev
```
