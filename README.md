# MVP - Projet de planification des agents de sécurité

## Prérequis

- Node.js
- Docker

## Setup

### Etape 1

Allez dans le répertoire du projet :

```bash
cd securityplanner
```

### Etape 2

Mettez en place les variables d'environnement nécessaires en copiant le fichier `.env.example` et en remplaçant les valeurs par défaut (notamment `SESSION_SECRET`) :

```bash
# Copier le fichier d'exemple des variables d'environnement
cp .env.example .env

# Générer une clé secrète pour la session et la remplacer dans le fichier .env
openssl rand -base64 32
```

> **Note :** L'url de la base de données ne doit être changée que si vous utilisez votre propre instance, par défaut elle est configurée pour utiliser le conteneur Docker du projet.

### Etape 3

Un script d'installation est disponible pour configurer l'environnement de développement. Il met en place la base de données et les dépendances nécessaires. Exécutez les commandes suivantes :

```bash
# Donner les droits d'exécution au script d'installation
chmod +x start.sh

# Lancer le script d'installation
./start.sh
```
