# MVP - Projet Agent Sécurité

## Introduction

### Problématique

Une société de sécurité a un planificateur responsable d'attribuer des plages horaires à des agents. Le problème est que le planificateur reçoit les plages horaires de tous les agents par message sur WhatsApp. Cela lui fait perdre un temps considérable car il doit manuellement gérer les disponibilités et contraintes des agents, notamment en utilisant un fichier Excel.

En une phrase, la problèmatique est la **complexité dans la planification horaire des agents de sécurité**.

### Objectifs du projet

L'objectif principal du projet est de réduire l'effort du planificateur et lui faire gagner du temps tout en minimisant le risque d'erreur humaine. Pour cela, une application permettrait de centraliser les données des agents et ainsi simplifier le travail du planificateur.

## Membres de l'équipe

### Léo Zmoos

- leo.zmoos@heig-vd.ch
- Spécialisé dans le développement backend

### Dylan Oliveira Ramos

- dylan.oliveiraramos@heig-vd.ch
- Spécialisé dans le développement frontend

## Présentation de l'idée

Nous envisageons de développer une application visant à simplifier la planification des agents de sécurité. Actuellement, dans certaines entreprises, cette gestion est particulièrement complexe et exige des efforts considérables de la part du planificateur. Actuellement, la planification repose sur une immense feuille Excel, et le planificateur doit vérifier manuellement chaque message de ses agents pour connaître leur disponibilité. Ce processus, particulièrement chronophage, pourrait être grandement optimisé, permettant ainsi un gain de temps considérable pour le planificateur.

## Secteur de marché
Le secteur de marché de cette application se situerait principalement dans **la gestion des ressources humaines et la planification du personnel**, avec un focus particulier sur les **services de sécurité privée**. Voici les principaux segments concernés :  

1. **Sécurité privée et surveillance** : Entreprises de gardiennage, sociétés de sécurité privée, services de protection rapprochée.  
2. **Gestion des effectifs et RH** : Solutions de gestion des plannings pour entreprises ayant des horaires flexibles ou des équipes en rotation.  
3. **Entreprises de facility management** : Gestion des agents de sécurité au sein des grandes infrastructures (hôpitaux, aéroports, centres commerciaux).  
4. **Événementiel** : Entreprises gérant la sécurité pour des événements temporaires.  
5. **Secteur public** : Municipalités et administrations ayant des services de sécurité internes.  


"MAYBE USEFUL LATER?"
> Le marché peut être abordé via un modèle **SaaS (Software as a Service)**, avec un abonnement mensuel ou annuel, ou via une **licence unique** pour des entreprises souhaitant une solution en interne.


## Public cible

## Questionnaires et hypothèses à valider avec le public cible

### Planificateur

> Quelle est votre méthode de travail actuelle? (workflow)
1. la demande du client (Excel comme premier logiciel, entrer les services et les différents horaire, début du mois pour les disponibilités, demande sur whatsapp, compliqué de faire le suivi, créer un groupe whatsapp pour chaque mandat => beaucoup de groupe. Une fois confirmé, il rentre sur excel que c'est bon, mettre dans un CMS, trois plateformes différentes pour ça => double saisie, erreur humaines)

> Qu'est-ce qui fait que la planification est difficile

multitasking biaisé car la méthode n'est pas performante. Méthodologie pas optimisée.

> Qu'est-ce qu'il se passe si un agent annonce qu'il ne peut pas venir?

regarder les dispos, depuis le téléphone, contacter les agents, mettre à jour sur les trois plateforme. 

> Quelle est la fréquence (semaine, mois) des planifications?

planning évoluant de jour en jour, ça change très régulierement, 

> Quelles sont les informations necéssaires concernant les agents?

Dépend de la distance du service, IKIT: indémnisation de temps de trajet et kilomètre, essayer de mettre un véhicule de service, au feeling avec l'expérience, demander si ils ont besoin de radio, 

> Véhicule partagé:

Se fait par téléphone, désigne un responsable véhicule, donner un rdv 

> Y-a-t'il différents types d'agents?

Agents armés, surveillance, 


> Si vous aviez une application pour la planification, à quoi celle-ci ressemblerait? 

nature de la manif, donner l'adresse, le point de contact, 





### Agent

> Expliquez-nous votre travail d'agent, qu'est-ce que vous faites?

> Comment transmettez-vous vos disponibilités au planificateur?

> Que devez-vous faire si vous ne pouvez pas vous présenter à l'événement?

> Trouvez-vous l'organisation au sein de l'entreprise efficace?

> Cela vous dérange-t'il de devoir créer un compte?

#### Justin
proposition de planning des 2 et envoie au responsable quand ils se mettent d'accord
liste des dates et envoi par mail -> chiant par msg avec l'autre puis tout recopier pour envoyer au responsable

arrange avec l'autre quand imprévu sinon compté absence

pas efficace et oubli du planificateur d'envoyer le planning et oubli de l'autre une fois qui avait échangé

manque un truc centralisé -> simple et efficace

Dérange pas de faire un compte

#### Leonard
1) Surveillance, ronde, garder des portes pendant des événements sportifs (foot), concerts, (Securitas Lausanne)

2) Calendrier numérique via site web (mobile), pas très très bien faite => affichage téléphone fucked up, indique les dispos (tel jour je suis là), c'est eux qui t'appelle, connexion avec le numéro d'agent et un mdp. 

Comment l'application pourrait être améliorée: ergonomique sur le tel, sorte de menu burger avec planif, calendrier et événements à venir, messages => pas souvent utilisé, plutôt appel

3) Appeler la planification, prefere savoir en avance (au moins 7 jours dans le contrat), sous urgence => les planificateurs se démerdent pour trouver un remplaçant, si c'est trop dernière minute => attende avant de confirmer que ça soit bon. Les planificateurs râlaient etc..

4) Oui, ça marchait plutot bien, simple. Recherche de matériel à Lausanne même si le truc est pas à Loz. Mettre le matériel directement sur place si les agents restent longtemps là (exemple: Manor 7 mois)

5) Non, pas besoin dans ce cas là. Assez bien fait, pour prouver qu'on est sur place (il fallait entrer un code qui était sur une feuille de mission).

#### André
1) Travail service d'ordre, zone à risque, gros événement de fête, bcp à la gare de Fribourg en général, service de nuit pour assurer que les chauffeurs soit en sécurité

2) Site web dediée à la gestion de l'entreprise (communiqué direction), partie calendrier (demande vacances ou dire les dispos) => sur téléphone, deux apps web (mobile et desktop), on dit je ne suis pas dispo de tel à tel heure, dire les dispo. Les slots non alloué peuvent être attribué

3) Essaie de trouver un remplacant (envoyer un message à qqn), envoi d'un mail à la planificatrice, soit elle trouvait pour toi si tu dis ça bien à l'avance, complexité à trouver un remplacant

4) ça se passait bien, possibilité de dire qu'on est pas dispo pendant plusieurs mois et ça ne pose pas problème

5) Identifiant (numéro d'agent), pour toute la gestion, communication direction, le salaire n'était pas reçu la dessus

Formation de 2/3j, selon le physique, on ne peut pas prendre tout les services

Problème c'est pas le fonctionnement c'est les gens, le nombre trop élevé d'évenements

## Analyse des retours du public cible

### Retours des planificateurs

### Retours des agents

## Maquettes

### Wireframes

![wireframes](/docs/img/wireframes.png)

#### Home page

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

## Choix technologiques

## Tests utilisateurs

## Pérennité du projet

## Difficultés rencontrées et solutions

## Conclusion
