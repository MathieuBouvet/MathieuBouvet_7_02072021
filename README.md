# Projet n°7 - les petits plats

## Introduction

L'objectif de ce projet est l'implémentation d'un algorithme de recherche de recette de cuisine.
Deux implémentations de l'algorithme existent dans deux branches différentes.

La branche `basic-search` utilise les fonctionalités du langage, comme les méthodes *Array.filter*, *String.includes*, etc.

La branche `optimized-search` utilise une version optimisée de la recherche de sous-chaînes dans une chaîne.

Une demo en ligne est disponible ici : [https://mb-p7-les-petits-plats.netlify.app/](https://mb-p7-les-petits-plats.netlify.app/)


## Stack technique

Le projet utlise **react + typescript** et a été initilisé avec [Create React App](https://github.com/facebook/create-react-app)

Afin de lancer le projet en local, il est nécésssaire d'avoir [node.js](https://nodejs.org/en/) installé sur sa machine

## Commandes disponibles

*Les commandes indiquées ici sont aussi disponibles avec leur équivalents npm*

### `yarn start`

Lance l'application en mode développement.  
Se rendre sur [http://localhost:3000](http://localhost:3000) pour un rendu dans le navigateur.

### `yarn test`

Lance le test de l'algorithme de recherche.

### `yarn build`

Lance le build de l'application dans le répertoire `build`.\
L'application est créé en mode `production` et est prête au déploiement.


### `yarn run benchmark`

Lance le benchmarking de l'algorithme de recherche. Requiiert la confirmation de l'installation de `ts-node` pour s'éxécuter