# Utiliser l'image officielle Node.js
FROM node:14

# Installer netcat et copier wait-for-it.sh
RUN apt-get update && apt-get install -y netcat
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD [ "npm", "start"]
