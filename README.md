# MVP - Projet de planification des agents de sécurité

## Landing Page
La landing page du projet est accessible à cette URL: https://www.zmoos.net

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

Un script d'installation est disponible pour configurer l'environnement de développement. Il met en place la base de données et les dépendances nécessaires. Exécutez les commandes suivantes :

```bash
# Donner les droits d'exécution au script d'installation
chmod +x start.sh

# Lancer le script d'installation
./start.sh
```

## Utilisation

### Accès à l'application

Dans un navigateur, accédez à l'URL suivante pour utiliser l'application :

```
http://localhost:3000
```

### Credentials par défaut

**Pour le compte planificateur :**
- **Email :** alice@example.com
- **Mot de passe :** test123

**Pour le compte agent :**
- **Email :** bob@example.com
- **Mot de passe :** test123
