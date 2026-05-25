#  Site Web - Association des Jeunes El Kendi

Ce projet consiste en la réalisation d'un site web dynamique complet pour l'**Association des Jeunes El Kendi**. Il intègre un formulaire fonctionnel relié à une base de données MySQL avec une architecture de code propre.

---

## Technologies utilisées

### **Back-end & Données**
* **PHP** : 
  * `index.php` : Page d'accueil et structure dynamique du site.
  * `db.php` : Script centralisé de connexion à la base de données MySQL.
  * `save.php` : Traitement et insertion des données du formulaire.
* **MySQL** : Base de données pour stocker les informations de l'association.

### **Front-end & Médias**
* **HTML5 / CSS3** : Structure et design personnalisé de l'interface (dossier `/css`).
* **JavaScript** : Animations et éléments interactifs (dossier `/javascript`).
* **Images / Photos** : Ressources visuelles illustrant l'association des jeunes El Kendi.

---

##  Instructions pour la correction (Déploiement en local)

Le projet fonctionnant avec **PHP/MySQL**, il nécessite un environnement de serveur local pour être testé.

**Pour tester le site et le formulaire sur votre ordinateur :**
1. Téléchargez le projet au format ZIP (Bouton vert **Code** > **Download ZIP**).
2. Placez le dossier extrait dans le répertoire de votre serveur local (ex: `wamp/www/`, `xampp/htdocs/` ou `Laragon`).
3. Lancez votre serveur local (activez **Apache** et **MySQL**).

4. **Configuration de la base de données :** Si nécessaire, ajustez les identifiants de connexion (hôte, nom de la base, utilisateur, mot de passe) directement dans le fichier `db.php`.
5. Ouvrez votre navigateur et accédez à l'adresse : `http://localhost/nom-du-dossier/index.php`

*Vous pourrez ainsi tester le formulaire, admirer le design avec ses images, et vérifier la bonne insertion des données dans votre base de données locale.*
