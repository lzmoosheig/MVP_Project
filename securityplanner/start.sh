#!/bin/bash

echo "=== Création automatique du fichier .env ==="

# Générer le SESSION_SECRET
SESSION_SECRET=$(openssl rand -base64 32)

# Définir les paramètres de la base de données (modifiable si besoin)
DB_USER="postgres"
DB_PASSWORD="example"
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="securityplanner"

# Générer DATABASE_URL
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# Écrire dans le fichier .env
cat > .env <<EOF
DATABASE_URL=${DATABASE_URL}
SESSION_SECRET=${SESSION_SECRET}
EOF

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