# Utilisons une image légère d'nginx comme base
FROM nginx:alpine

# Ajoutons une étiquette pour spécifier l'auteur
LABEL maintainer="sidibe issiaka <issiaka.sidibe19@inphb.ci>"

# Copions les fichiers HTML, CSS, JS et les images dans les répertoires appropriés de l'image
COPY *.html /usr/share/nginx/html/
COPY styles /usr/share/nginx/html/styles
COPY js /usr/share/nginx/html/js
COPY img /usr/share/nginx/html/img

# Exposons le port 80 pour que l'application puisse être accessible depuis l'extérieur
EXPOSE 80

# Commande à exécuter lorsque le conteneur démarre
CMD ["nginx", "-g", "daemon off;"]
