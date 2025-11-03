# Déploiement sur GitHub Pages - Guide Complet

Ce guide vous montre comment déployer Autodealafrica avec GitHub Pages (frontend) et Render (backend).

## 🎯 Architecture de Déploiement

- **Frontend** : GitHub Pages (gratuit, illimité)
- **Backend** : Render (gratuit, se connecte à votre GitHub)
- **Database** : MongoDB Atlas (gratuit, 512MB)

---

## ✅ Étape 1 : Activer GitHub Pages (2 minutes)

Le code est déjà poussé sur GitHub. Maintenant activons GitHub Pages :

### 1.1 Activer GitHub Actions

1. Allez sur votre repository : https://github.com/Dhysna/autodealafrica
2. Cliquez sur **Settings** (en haut)
3. Dans le menu latéral gauche, cliquez sur **Pages**
4. Sous "Build and deployment" :
   - **Source** : Sélectionnez "GitHub Actions"
5. C'est tout ! Ne touchez à rien d'autre.

### 1.2 Déclencher le Déploiement

Le déploiement se fera automatiquement lors du prochain push. Pour forcer un déploiement maintenant :

1. Sur votre repository GitHub
2. Cliquez sur l'onglet **Actions**
3. Cliquez sur "Deploy to GitHub Pages" dans la liste de gauche
4. Cliquez sur **Run workflow** (bouton bleu à droite)
5. Cliquez sur **Run workflow** dans le popup

Le déploiement prendra 2-3 minutes.

### 1.3 Vérifier le Déploiement

Une fois terminé (coche verte ✓) :

1. Retournez dans **Settings → Pages**
2. Vous verrez "Your site is live at" avec l'URL
3. Votre site sera : **https://dhysna.github.io/autodealafrica/**

---

## ✅ Étape 2 : Déployer le Backend sur Render (5 minutes)

### 2.1 Créer un Compte Render

1. Allez sur https://render.com/
2. Cliquez sur **Sign Up**
3. Choisissez **Sign Up with GitHub**
4. Autorisez Render à accéder à vos repositories

### 2.2 Créer le Web Service

1. Une fois connecté, cliquez sur **New +** (en haut à droite)
2. Sélectionnez **Web Service**
3. Trouvez et sélectionnez le repository **autodealafrica**
4. Cliquez sur **Connect**

### 2.3 Configurer le Service

Remplissez les champs suivants :

| Champ | Valeur |
|-------|--------|
| **Name** | `autodealafrica-api` |
| **Region** | Choisissez le plus proche de vous |
| **Branch** | `master` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

### 2.4 Variables d'Environnement

Avant de cliquer sur "Create Web Service", descendez jusqu'à **Environment Variables**.

Cliquez sur **Add Environment Variable** et ajoutez :

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb://localhost:27017/autodealafrica` *(on va le changer à l'étape 3)* |
| `FRONTEND_URL` | `https://dhysna.github.io` |

### 2.5 Déployer

1. Cliquez sur **Create Web Service**
2. Render va commencer à builder et déployer (2-5 minutes)
3. Attendez que le statut devienne "Live" avec une coche verte ✓

### 2.6 Obtenir l'URL du Backend

Une fois déployé, en haut de la page vous verrez l'URL :
```
https://autodealafrica-api.onrender.com
```

**IMPORTANT : Copiez cette URL !** Vous en aurez besoin.

### 2.7 Tester le Backend

Visitez dans votre navigateur :
```
https://autodealafrica-api.onrender.com/api/health
```

Vous devriez voir :
```json
{
  "status": "OK",
  "timestamp": "...",
  "database": "disconnected"
}
```

C'est normal que database soit "disconnected" pour l'instant !

---

## ✅ Étape 3 : Créer la Base de Données MongoDB Atlas (5 minutes)

### 3.1 Créer un Compte

1. Allez sur https://www.mongodb.com/cloud/atlas/register
2. Inscrivez-vous avec Google ou Email
3. Remplissez le questionnaire :
   - Goal: "Learn MongoDB"
   - Use case: "Other"

### 3.2 Créer un Cluster Gratuit

1. Cliquez sur **Create** pour créer un deployment
2. Choisissez **M0 FREE** (à gauche)
3. **Provider** : AWS (ou votre préférence)
4. **Region** : Choisissez la plus proche de vous
5. **Cluster Name** : `autodealafrica`
6. Cliquez sur **Create Deployment**

### 3.3 Créer un Utilisateur

Un popup apparaît "Security Quickstart" :

1. **Username** : `autodealer`
2. **Password** : Cliquez sur "Autogenerate Secure Password"
3. **IMPORTANT** : Copiez et sauvegardez ce mot de passe !
4. Cliquez sur **Create Database User**

### 3.4 Configuration Réseau

1. Le même popup montre "Where would you like to connect from?"
2. Cliquez sur **Add My Current IP Address**
3. Puis cliquez aussi sur **Add a Different IP Address**
4. Entrez `0.0.0.0/0` (pour autoriser de partout)
5. Description : "Allow all"
6. Cliquez sur **Add Entry**
7. Cliquez sur **Finish and Close**

### 3.5 Obtenir la Connection String

1. Cliquez sur **Connect** (bouton dans votre cluster)
2. Choisissez **Drivers**
3. Copiez la connection string qui ressemble à :
```
mongodb+srv://autodealer:<password>@autodealafrica.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. **Remplacez** `<password>` par votre mot de passe réel
5. **Ajoutez** le nom de la database à la fin :
```
mongodb+srv://autodealer:VOTRE_MOT_DE_PASSE@autodealafrica.xxxxx.mongodb.net/autodealafrica?retryWrites=true&w=majority
```

### 3.6 Mettre à Jour Render avec MongoDB

1. Retournez sur Render Dashboard : https://dashboard.render.com/
2. Cliquez sur votre service **autodealafrica-api**
3. Dans le menu de gauche, cliquez sur **Environment**
4. Trouvez la variable `MONGODB_URI`
5. Cliquez sur l'icône crayon ✏️ pour éditer
6. Collez votre connection string MongoDB
7. Cliquez sur **Save Changes**

Render va automatiquement redéployer (1-2 minutes).

### 3.7 Vérifier la Connexion

Une fois redéployé, visitez à nouveau :
```
https://autodealafrica-api.onrender.com/api/health
```

Maintenant vous devriez voir :
```json
{
  "status": "OK",
  "timestamp": "...",
  "database": "connected"  ← Connecté ! ✓
}
```

---

## ✅ Étape 4 : Connecter le Frontend au Backend (2 minutes)

Maintenant que le backend est déployé, mettons à jour le frontend avec la bonne URL.

### 4.1 Mettre à Jour le Workflow

Vous devez mettre à jour l'URL du backend dans le fichier de déploiement :

1. Ouvrez le fichier : `.github/workflows/deploy.yml`
2. Trouvez la ligne (ligne 34) :
```yaml
VITE_API_URL: https://autodealafrica-api.onrender.com/api
```
3. Remplacez par votre URL Render réelle (si différente)
4. Sauvegardez le fichier

### 4.2 Pousser les Changements

```bash
cd C:\Users\HP\Desktop\autodealafrica
git add .
git commit -m "Update API URL with deployed backend"
git push
```

### 4.3 Vérifier le Déploiement

1. Allez sur GitHub → Actions
2. Attendez que le workflow se termine (2-3 minutes)
3. Une fois terminé, visitez : **https://dhysna.github.io/autodealafrica/**

---

## 🎉 Félicitations !

Votre application est maintenant **100% LIVE** !

### 🌐 Vos URLs :

- **Frontend** : https://dhysna.github.io/autodealafrica/
- **Backend API** : https://autodealafrica-api.onrender.com
- **API Health** : https://autodealafrica-api.onrender.com/api/health
- **Repository** : https://github.com/Dhysna/autodealafrica

---

## 🧪 Tester l'Application

1. **Visitez le site** : https://dhysna.github.io/autodealafrica/
2. **Recherchez des voitures** : Utilisez les filtres
3. **Ajoutez une annonce** : Cliquez sur "+ Add Your Listing"
4. **Remplissez le formulaire** et soumettez
5. **Vérifiez** : Votre voiture apparaît dans la liste !

---

## 🔄 Mises à Jour Futures

Pour mettre à jour votre site après des modifications :

```bash
cd C:\Users\HP\Desktop\autodealafrica

# Faites vos modifications...

git add .
git commit -m "Description des changements"
git push
```

Le site se mettra à jour automatiquement en 2-3 minutes ! ✨

---

## 🐛 Dépannage

### Le site ne charge pas
- Vérifiez que le workflow GitHub Actions a réussi
- Allez dans Actions et vérifiez qu'il y a une coche verte ✓

### "Loading..." infini
- Vérifiez que le backend fonctionne : https://autodealafrica-api.onrender.com/api/health
- Vérifiez l'URL de l'API dans le workflow

### Le backend ne répond pas
- Render gratuit s'endort après 15 min d'inactivité
- La première requête prend 30 secondes à réveiller le serveur
- C'est normal pour le plan gratuit !

### Erreur de base de données
- Vérifiez que 0.0.0.0/0 est dans la whitelist IP de MongoDB
- Vérifiez que la connection string est correcte dans Render
- Vérifiez que le mot de passe ne contient pas de caractères spéciaux (ou qu'ils sont encodés)

---

## 📊 Limites des Plans Gratuits

### GitHub Pages
- ✅ Bande passante illimitée
- ✅ Toujours en ligne
- ✅ CDN global
- ✅ HTTPS automatique

### Render (Free)
- ⚠️ S'endort après 15 min d'inactivité
- ⚠️ 750 heures/mois (suffisant !)
- ✅ 512 MB RAM
- ✅ Déploiement automatique depuis GitHub

### MongoDB Atlas (Free)
- ✅ 512 MB de stockage
- ✅ Largement suffisant pour des milliers de voitures
- ✅ Toujours en ligne

---

## 🚀 Améliorations Futures

- [ ] Ajouter un domaine personnalisé
- [ ] Implémenter l'authentification utilisateur
- [ ] Ajouter l'upload d'images (Cloudinary)
- [ ] Ajouter un système de favoris
- [ ] Notifications email
- [ ] Chat en temps réel

---

**Besoin d'aide ?** Ouvrez une issue sur GitHub : https://github.com/Dhysna/autodealafrica/issues

**Bon succès avec Autodealafrica ! 🚗✨**
