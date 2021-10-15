# Groupomania

Projet réalisé dans le cadre du projet 7 de la formation d'OpenClass Rooms.

Contexte : 
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.


## Developpment server

1. Clonez le repository
2. Ouvrez un terminal de commande
3. Exécutez le back-end avec la commande npm install 
4. Puis exécutez node server
5. Exécutez dans un autre terminal à partir du dossier frontend npm install 
6. Puis exécutez npm start

Il vous faudra rajouter un dossier 'images' dans le dossier backend qui permettra d'enregistrer l'image d'un utilisateur.

## Connexion à la base de données MySQL

Dans le fichier app.js et la fonction mongoose.connect, l'url de connexion à mongoDB n'est pas directement affiché. Je l'ai rajouté dans une variable d'environnement pour une question de sécurité. L'url se trouve dans le fichier .env.

## Test 
Valeurs des variables d'environnement à rajouter dans un fichier .env à créer dans le backend

TOKEN = RANDOM_TOKEN_SECRET

MONGO = mongodb+srv://olivierco1:logicbobby@cluster0.5jrov.mongodb.net/Projet6?retryWrites=true&w=majority

Valeurs des variables d'environnement à rajouter dans un fichier .env à créer dans le frontend
