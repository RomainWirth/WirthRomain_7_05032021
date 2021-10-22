Ceci est le résultat du développement d'une application web "réseau social d'entreprise".
Il s'agit du projet 7 du parcours Développeur Web d'OpenClassrooms.

Le projet est constitué de deux parties : frontend et backend.
Le frontend fonctionne sous VueJS.
Le backend fonctionne sous NodeJS, Express et la base de données est sous le langage MySQL.

Afin de faire fonctionner l'application, veuillez installer les packages necessaires en suivant les instructions ci-dessous.
Vous trouverez plus de détails sous les fichiers packages.json, ainsi que des fichiers README du frontend et backend afin de faire démarrer l'application et le serveur.
à noter que le fichier images du backend est commenté sur le gitignore afin de pouvoir accéder aux images lors du clônage du repo git.

Veuillez suivre les instructions d'installation pour le bon fonctionnement de l'application :

## Frontend
## Install VueCLI dans Windows Ligne de Commande (as administrator)
npm install -g @vue/cli
## Vérification
vue --version

run :
npm run serve

## Backend
## Application Express
npm install --save express
npm install --save body-parser
npm install --save bcrypt
npm install --save jsonwebtoken
npm install --save multer
npm install --save mysql2
npm install --save cors

npm install --save nodemon

run :
node index 
ou
nodemon index
## base de données mysql
La base de données est déjà créée.
Il faudra la copier depuis le répertoire ../backend/"commandes sql"/p7_bdd.sql
(modifier les ".." selon le chemin ou vous avez enregistré le repo git et le nom donné au dossier contenant l'application).

SET PATH=%PATH%;"path_to_mysql"/MySQL/"MySQL Server 8.0"/bin

Attention, il est possible de devoir créer la base de données en locale avant de copier le contenu. Exécuter les commandes suivantes :
CREATE DATABASE p7_bdd CHARACTER SET 'utf8';
mysql -u root -p p7_bdd < "path_to_project_folder"/backend/"commandes sql"/p7_bdd.sql

puis entrer votre mot de passe

afin de logger l'utilisateur déjà existant : 
mysql --host=localhost --user=p7_main_user --password=p7_main_mdp

ou créez l'utilisateur avec les commandes suivantes :
CREATE USER 'p7_main_user'@'localhost' IDENTIFIED BY 'p7_main_mdp';
GRANT ALL PRIVILEGES ON p7_bdd.* TO 'p7_main_user'@'localhost';

mysql -u p7_main_user -p

## utilisateur du projet :
## user :
p7_main_user
## MDP :
p7_main_mdp

## Commandes communes
SHOW DATABASES;
USE p7_bdd;
SHOW TABLES;
DESCRIBE topic_messages;
DESCRIBE users;
SELECT * FROM topic_messages;
SELECT * FROM users;

une fois un nouvel utilisateur créé depuis l'application (signup sur http://localhost:PORT/)
sur mysql, pour faire d'un utilisateur un modérateur :

UPDATE users SET u_level = 0 WHERE u_id = ?; 
## ? = u_id correspondant à l'utilisateur à passer en modérateur

## pour accéder aux profils utilisateurs déjà existants depuis le frontend sur http://localhost:8080/
pseudo : userAAA
email: userAAA@gmail.com
mdp : pwduserAAA

pseudo : userBBB
email: userBBB@gmail.com
mdp : pwduserBBB

pseudo : userCCC
email: userCCC@gmail.com
mdp : pwduserCCC

pseudo : userAdmin
email: userAdmin@gmail.com
mdp : pwduserAdmin