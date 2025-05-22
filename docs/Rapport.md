# MVP - Projet de planification des agents de sécurité

## Introduction

### Problématique

Une société de sécurité a un planificateur responsable d'attribuer des plages horaires à des agents. Le problème est que le planificateur reçoit les plages horaires de tous les agents par message sur WhatsApp. Cela lui fait perdre un temps considérable car il doit manuellement gérer les disponibilités et contraintes des agents, notamment en utilisant un fichier Excel.

En une phrase, la problèmatique est la **complexité dans la planification horaire des agents de sécurité**.

### Objectifs du projet

L'objectif principal du projet est de réduire l'effort du planificateur et lui faire gagner du temps tout en minimisant le risque d'erreur humaine. Pour cela, une application permettrait de centraliser les données des agents et ainsi simplifier le travail du planificateur. D'autre part, l'application permettrait aux agents de gérer leurs disponibilités de manière autonome et de les transmettre au planificateur.

## Membres de l'équipe

### Léo Zmoos

- leo.zmoos@heig-vd.ch
- Spécialisé dans le développement backend

### Dylan Oliveira Ramos

- dylan.oliveiraramos@heig-vd.ch
- Spécialisé dans le développement frontend

## Présentation de l'idée

Notre idée est de créer une application web qui permettrait aux agents de sécurité de gérer leurs disponibilités et de les transmettre au planificateur. Le planificateur pourrait ainsi visualiser les disponibilités des agents et attribuer les plages horaires en toute simplicité. L'application serait accessible via un navigateur web et serait responsive pour s'adapter à tous les appareils (mobile, tablette, desktop).
L'application serait divisée en deux parties : une partie pour le planificateur et une partie pour les agents. Le planificateur aurait accès à un calendrier avec les disponibilités des agents, tandis que les agents pourraient gérer leurs disponibilités et consulter leur planning.

## Secteur de marché

Le secteur de marché de cette application se situerait principalement dans **la gestion des ressources humaines et la planification du personnel**, avec un focus particulier sur les **services de sécurité privée**. Voici les principaux segments concernés :

1. **Sécurité privée et surveillance** : entreprises de gardiennage, sociétés de sécurité privée, services de protection rapprochée.
2. **Gestion des effectifs et RH** : solutions de gestion des plannings pour entreprises ayant des horaires flexibles ou des équipes en rotation.
3. **Entreprises de facility management** : gestion des agents de sécurité au sein des grandes infrastructures (hôpitaux, aéroports, centres commerciaux).
4. **Événementiel** : entreprises gérant la sécurité pour des événements temporaires.
5. **Secteur public** : municipalités et administrations ayant des services de sécurité internes.

## Public cible

Le public cible de cette application est constitué principalement de deux groupes : les planificateurs et les agents de sécurité.

1. **Planificateurs** : responsables de la gestion des plannings et de l'attribution des plages horaires aux agents. Ils sont souvent confrontés à des défis liés à la complexité de la planification, à la gestion des disponibilités et à la communication avec les agents.

2. **Agents de sécurité** : professionnels chargés de la surveillance et de la sécurité sur le terrain. Ils doivent gérer leurs disponibilités et communiquer avec le planificateur pour s'assurer qu'ils sont affectés aux bons événements.

### Personae

#### Planificateur

- **Nom** : Jean Dupont
- **Âge** : 35 ans
- **Poste** : Responsable de la planification des agents de sécurité
- **Contexte** : Jean travaille pour une entreprise de sécurité privée et est responsable de la gestion des plannings des agents. Il utilise actuellement un fichier Excel pour gérer les disponibilités, mais il trouve cela compliqué et chronophage.
- **Besoins** : Jean a besoin d'une solution qui lui permette de centraliser les disponibilités des agents, de simplifier la communication avec eux et de réduire le risque d'erreur humaine dans la planification.
- **Objectifs** : Jean souhaite gagner du temps dans la gestion des plannings, réduire le stress lié à la planification et améliorer la satisfaction des agents.

#### Agent de sécurité

- **Nom** : Pierre Martin
- **Âge** : 28 ans
- **Poste** : Agent de sécurité
- **Contexte** : Pierre travaille pour une entreprise de sécurité privée et est souvent affecté à des événements variés. Il doit gérer ses disponibilités et communiquer avec le planificateur pour s'assurer qu'il est affecté aux bons événements.
- **Besoins** : Pierre a besoin d'une solution qui lui permette de gérer facilement ses disponibilités, de consulter son planning et de communiquer avec le planificateur.
- **Objectifs** : Pierre souhaite avoir un moyen simple de gérer ses disponibilités, de consulter son planning et de recevoir des notifications concernant les événements à venir.

## Questionnaires et hypothèses à valider avec le public cible

Nous avons réfléchi à plusieurs questions en essayant d'être le plus exhaustif possible. Lors de nos interviews, nous avons commencé par poser des questions ouvertes pour comprendre le fonctionnement actuel de la planification et les besoins des agents. Ensuite, nous avons posé des questions plus spécifiques sur les fonctionnalités souhaitées dans l'application. Le tout en évitant de poser des questions orientées pour ne pas influencer les réponses.

### Planificateur

> Quelle est votre méthode de travail actuelle? (workflow)

> Qu'est-ce qui fait que la planification est difficile?

> Qu'est-ce qu'il se passe si un agent annonce qu'il ne peut pas venir?

> Quelle est la fréquence (semaine, mois) des planifications?

> Quelles sont les informations necéssaires concernant les agents?

> Y-a-t'il du matériel à fournir aux agents?

> Y-a-t'il différents types d'agents?

> Si vous aviez une application pour la planification, à quoi celle-ci ressemblerait?

### Agent

> Expliquez-nous votre travail d'agent, qu'est-ce que vous faites?

> Comment transmettez-vous vos disponibilités au planificateur?

> Que devez-vous faire si vous ne pouvez pas vous présenter à l'événement?

> Trouvez-vous l'organisation au sein de l'entreprise efficace?

> Cela vous dérange-t'il de devoir créer un compte?

> Si vous aviez une application pour la planification, à quoi celle-ci ressemblerait?

## Analyse des retours du public cible

### Retours des planificateurs

De manière générale, les planificateurs ont exprimé le besoin d'une solution centralisée pour gérer les disponibilités des agents. Ils ont souligné la complexité de la planification actuelle, notamment en raison de la communication par message. Ils souhaitent une application qui leur permette de visualiser facilement les disponibilités des agents et d'attribuer les plages horaires sans effort.

Nous avons également interviewé des planificateurs ayant déjà une application dédiée à la gestion des plannings. Dans l'ensemble, ils trouvent que leur application fonctionne très bien, mais qu'elle pourrait être améliorée en termes d'ergonomie et de fonctionnalités.

### Retours des agents

La majorité des agents ont dit être satisfaits de la manière dont ils transmettent leurs disponibilités au planificateur. En effet, ceux-ci n'ont pas de difficulté à communiquer avec le planificateur par message ou via l'application déjà existante. Nous en avons conclu que le problème ne se situe pas au niveau de la communication entre le planificateur et les agents, mais plutôt au niveau de la gestion des disponibilités par le planificateur.

Certains agents nous ont fait part de leur ressenti concernant les planificateurs. Selon eux, le problème n'est pas la gestion des disponibilités des agents, mais plutôt le nombre d'événements à planifier. Cela nous a amené à réfléchir à la possibilité d'intégrer une fonctionnalité de gestion des événements dans l'application.

## Maquettes

### Wireframes

Nous avons réalisé quelques wireframes pour visualiser l'interface de l'application. Nous n'avons pas fait de wireframes pour chaque page car la plupart des pages sont similaires.

![wireframes](/docs/img/wireframes.png)

#### Page home

Pour les planificateurs :

- La home page contient la liste des événements à venir.

Pour les agents :

- La home page contient la liste des événements à venir où l'agent doit intervenir.

#### Page profil

Pour les planificateurs :

- La page profil contient les informations de la personne.

Pour les agents :

- La page profil contient les informations de la personne et la possibilité d'accéder à la page des disponibilités.

#### Page calendrier

Pour les planificateurs :

- La page calendrier contient tous les événements planifiés sur plusieurs mois.

Pour les agents :

- La page calendrier contient tous les événements auxquels l'agent intervient.

#### Page disponibilités

Pour les agents :

- La page disponibilités permet aux agents de gérer leur disponibilités.

### Mockups

Par manque de temps, nous n'avons pas pu réaliser de mockups pour l'application. Cependant, nous avons une idée précise de ce à quoi l'application devrait ressembler. Nous avons pris en compte les retours des planificateurs et des agents pour concevoir une interface simple et intuitive.

D'autre part, nous avions prévu de réaliser l'application en utilisant des composants déjà existants, ce qui réduit le risque d'avoir une interface peu ergonomique et nous autorise à ne pas faire de mockups.

## Choix technologiques

Nous avons choisi de développer l'application en utilisant le framework fullstack **Next.js**. Ce framework nous permet de créer une application web complète avec un backend et un frontend en utilisant le même langage (JavaScript). De plus, Next.js offre des fonctionnalités intéressantes telles que le rendu côté serveur, la génération de pages statiques et la gestion des routes. D'autre part, nous sommes familiers avec le langage JavaScript et le framework React, ce qui nous a évidemment orienté vers Next.js.

Nous avons également choisi d'utiliser **Prisma** comme ORM pour interagir avec la base de données. Prisma est un ORM moderne et performant qui nous permet de gérer facilement les migrations de la base de données et d'effectuer des requêtes complexes.

Nous avons opté pour une base de données **PostgreSQL** car elle est robuste et bien supportée par Prisma. De plus, PostgreSQL est une base de données relationnelle qui convient parfaitement à notre besoin de gérer des relations entre les agents, les événements et les disponibilités.

Concernant l'authentification, nous avions initialement prévu d'utiliser **NextAuth** pour gérer l'authentification des utilisateurs. Cependant, nous avons finalement décidé de ne pas implémenter cette fonctionnalité dans le MVP, car cela aurait nécessité un temps de développement supplémentaire. Nous avons donc opté pour une solution simple où les utilisateurs peuvent se connecter avec un nom d'utilisateur et un mot de passe ce qui, à l'aide de la librairie **Jose**, génère un token JWT stocké dans un cookie. Nous utilisons également **bcrypt** pour le hachage des mots de passe.

Pour le frontend, nous utilisons des composants React préfabriqués par la librairie **Material UI**. Cette librairie nous permet de créer une interface utilisateur moderne et responsive sans avoir à développer tous les composants nous-mêmes. De plus, Material UI est bien documentée et facile à utiliser.

### Résumé

Pour résumer, voici les choix technologiques que nous avons faits :

- **Framework** : Next.js
- **ORM** : Prisma
- **Base de données** : PostgreSQL
- **Authentification** : JWT avec bcrypt
- **Librairie UI** : Material UI

## Tests utilisateurs

## Pérennité du projet

## Difficultés rencontrées et solutions

## Conclusion
