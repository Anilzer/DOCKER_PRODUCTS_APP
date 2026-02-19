<!-- # Mini-app CRUD – Gestion de produits  
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

```text
mini-app/
├── frontend/ # Application React (Create React App)
├── backend/ # API Node.js / Express / Mongoose
├── docker/
│ ├── frontend/ # Dockerfile frontend
│ └── backend/ # Dockerfile backend
├── docker-compose.yml # Orchestration des services
└── README.md
```

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

Un arrêt ou redémarrage des conteneurs ne supprime pas les données.



## Développement & Bind Mounts

Les dossiers suivants sont montés en bind mount :

```text
frontend/
backend/
```

---


## Toute modification du code est prise en compte sans rebuild des images Docker (hot reload).

## Tests & validation

L’application est accessible depuis le navigateur

Les opérations CRUD fonctionnent

Les données sont visibles via mongo-express et MongoDB Compass

Les données persistent après redémarrage des conteneurs

Le code est modifiable à chaud grâce aux bind mounts -->

# 🚀 DOCKER_PRODUCTS_APP

Mini-application CRUD de gestion de produits  
Stack : **React + Node.js + MongoDB + Docker + GitHub Actions (CI/CD)**

---

# Lancer le projet en local

## Cloner le projet

```bash
git clone https://github.com/Anilzer/DOCKER_PRODUCTS_APP.git
cd DOCKER_PRODUCTS_APP
```

---

## Lancer avec Docker

```bash
docker compose up --build
```

---
## Accéder aux services

Frontend → http://localhost:3000

Backend → http://localhost:5000/health

Mongo UI → http://localhost:8081

## 🔐 Variables nécessaires

```text
Backend (.env en local)
PORT=5000
MONGO_URI=mongodb://localhost:27017/tp_docker
En Docker, ces variables sont injectées automatiquement via docker-compose.yml.

Variables CI/CD (GitHub Actions)
APP_ENV → variable non sensible (visible dans les logs)

DUMMY_SECRET → secret masqué automatiquement dans les logs
```

## ⚙️ Déroulement du pipeline CI
Le pipeline GitHub Actions se déclenche automatiquement sur :

```text
push

pull_request
```

Étapes exécutées :

1️- Unit Tests
```text
Backend (Jest)

Frontend (React Testing Library)

Exécutés en parallèle
```

2️- Integration Tests
```text
Lancement automatique d’un service MongoDB

Test API ↔ Base de données (Supertest + Mongoose)
```

3️- Artefacts
```text
Génération d’un artefact test-results

Réutilisation par un autre job

Téléchargeable depuis l’interface GitHub

Durée de conservation définie
```

4️- Build multi-environnement

```text
Build React pour :

dev

staging

prod

Génération d’artefacts distincts par environnement
```

5️- Image Docker du Frontend
```text
Construction d’une image Docker du build React

Export en fichier .Zip

Upload comme artifact téléchargeable
```
6️- Self-hosted Runner
```text
Un job spécifique s’exécute sur un runner local Windows

Exécution uniquement sur push (sécurité repo public)
```

## 🐳 Tester une image Docker exportée

```bash
docker load -i tp-frontend-prod.tar
docker run --rm -p 8080:80 tp-frontend:prod
```

```text
Puis ouvrir :

http://localhost:8080
```

## Fonctionnalités couvertes

```text
-CI automatique

-Tests unitaires

-Tests d’intégration

-Variables & secrets

-Artefacts réutilisables

-Jobs parallèles

-Build multi-environnement

-Image Docker générée

-Runner local
```