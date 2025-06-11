#!/bin/bash

echo "=== Lancement de la base de données..."
cd database
docker compose up -d
cd ../

echo "=== Attente de la disponibilité de PostgreSQL..."
# On vérifie que postgres est prêt
until docker exec database-db-1 pg_isready -U postgres > /dev/null 2>&1; do
  sleep 1
done

echo "=== Migration de la base..."
npx prisma migrate deploy

echo "=== Génération du client Prisma..."
npx prisma generate

echo "=== Seed de la base..."
npx prisma db seed

echo "=== Lancement du serveur Next.js..."
npm run dev