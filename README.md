# Mini-app CRUD – Gestion de produits  
**React · Node.js · Express · MongoDB · Docker**

---

## Objectif du projet
Réalisation d’une **mini-application CRUD full-stack conteneurisée** permettant la gestion de produits, dans le cadre d’un TP Docker.

L’application permet :
- Ajouter un produit  
- Lister les produits  
- Supprimer un produit (bonus)

---

##  Groupe
- **Classe** : (25-26 DSP) DSP5 Archi O24A (4-5)
- **Membre** :
  - **ABAYOMI Andil**

---

## Architecture du projet
mini-app/
├── frontend/ # Application React (Create React App)
├── backend/ # API Node.js / Express / Mongoose
├── docker/
│ ├── frontend/ # Dockerfile frontend
│ └── backend/ # Dockerfile backend
├── docker-compose.yml # Orchestration des services
└── README.md

---
## Services Docker

Le projet est orchestré via **docker-compose** et comprend les services suivants :

- **frontend** : application React (Create React App)
- **backend** : API REST Node.js / Express
- **mongodb** : base de données MongoDB
- **compass** : interface web MongoDB (mongo-express) pour visualiser et manipuler les données

> MongoDB Compass (application desktop officielle) peut également être utilisé en local via l’URI :  
> `mongodb://localhost:27017`

---

## 🌐 Ports utilisés

| Service    | Port |
|------------|------|
| Frontend   | 3000 |
| Backend    | 5000 |
| MongoDB    | 27017 |
| UI Mongo (compass) | 8081 |

---

##  Lancer le projet

Depuis la **racine du projet** :

```bash
docker compose up --build
```

---

## Accès aux services

Frontend : http://localhost:3000

Backend (health check) : http://localhost:5000/health

UI Mongo (mongo-express) : http://localhost:8081

## Arrêter le projet : 

```bash
docker compose down
```

---

## Persistance des données

Les données MongoDB sont persistantes grâce à un volume Docker : mongo_data:/data/db

---

## Un arrêt ou redémarrage des conteneurs ne supprime pas les données.


---

## Développement & Bind Mounts

Les dossiers suivants sont montés en bind mount :

frontend/
backend/

---


## ➡️ Toute modification du code est prise en compte sans rebuild des images Docker (hot reload).

## Tests & validation

L’application est accessible depuis le navigateur

Les opérations CRUD fonctionnent

Les données sont visibles via mongo-express et MongoDB Compass

Les données persistent après redémarrage des conteneurs

Le code est modifiable à chaud grâce aux bind mounts