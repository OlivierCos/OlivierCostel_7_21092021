# Groupomania

Projet réalisé dans le cadre du projet 7 de la formation d'OpenClass Rooms.

Contexte : 
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.


## Developpment server

1. Clonez le repository
2. Ouvrez un terminal de commande
3. Exécutez le back-end avec la commande "npm install" 
4. Puis exécutez node server
5. Exécutez dans un autre terminal à partir du dossier groupomania "npm install"
6. Puis exécutez npm start

Il vous faudra rajouter un dossier 'images' dans le dossier backend qui permettra d'enregistrer l'image d'un utilisateur.

## Connexion à la base de données MySQL

Pour ceux qui n'ont pas MySQL, il vous faudra le télécharger sur :  https://dev.mysql.com/downloads/installer/.
Pour lancer MySQL sur Windows, si vous n'avez pas encore créé d'utilisateur rendez-vous de préférence dans le fichier bin du dossier téléchargé, et enfin exécutez : mysqladmin -u root -p '' 
Ensuite connectez vous à MySQL avec la commande mysql -u root -p (Le mot de passe étant vide il vous suffira d'appuyer sur Entrée si on vous le demande).

Puis lancer la commande : CREATE DATABASE groupomania;

De retour sur votre éditeur de code, ouvrez un terminal du backend du projet et lancer la commande : 
npx sequelize-cli db:migrate


## Test 
Valeurs des variables d'environnement à rajouter dans un fichier .env à créer dans le dossier backend

TOKEN=RANDOM_TOKEN_SECRET
SEQUELIZEDB='groupomania', 'root', '', {host: 'localhost', dialect: 'mysql'}
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=groupomania
DB_HOST=127.0.0.1
DB_PORT=3308



Valeurs des variables d'environnement à rajouter dans un fichier .env à créer dans le dossier groupomania

REACT_APP_URLAPI=http://localhost:3000
