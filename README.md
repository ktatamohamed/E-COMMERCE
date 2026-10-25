# E-commerce application

Application e-commerce : interface React/Vite et API Express/TypeScript avec MongoDB et Mongoose.

## Prérequis

- Node.js 20 ou version ultérieure
- npm 10 ou version ultérieure
- MongoDB local ou URI de connexion MongoDB (pour démarrer l'API)

## Installation et démarrage

1. Installer les dépendances depuis la racine du dépôt :

   ```sh
   npm install
   ```

2. Démarrer la boutique :

   ```sh
   npm run dev
   ```

   Ouvrir l'adresse Vite affichée dans le terminal. `npm run dev:client` est également disponible.

3. Pour démarrer l'API, copier `.env.example` vers `server/.env`, renseigner `MONGODB_URI`, `CLIENT_ORIGIN` et un `JWT_SECRET` aléatoire long, puis lancer dans un second terminal :

   ```sh
   npm run dev:server
   ```

   Le point de contrôle de l'API est `http://localhost:5000/api/health`. La boutique actuelle utilise un catalogue de démonstration côté client et reste consultable sans API ni base de données.

Les variables Stripe sont des valeurs de remplacement pour le futur module de paiement ; ne pas utiliser de clés live en développement.

## Compilation et vérification des types

```sh
npm run typecheck
npm run build
```

## API

| Méthode | Chemin | Utilité |
| --- | --- | --- |
| GET | `/api/health` | Vérification de l'état de l'API |

Les routes d'authentification, de catalogue, de panier, de paiement, de commandes et d'administration seront ajoutées par module.

## Modèles de données

Les modèles Mongoose se trouvent dans `server/src/modules/*/*.model.ts`. Les montants sont stockés en centimes. Les lignes de commande conservent un instantané des produits. Les mots de passe fournis au champ `passwordHash` du modèle User sont hachés avec bcrypt avant sauvegarde et exclus des résultats de requête par défaut.
