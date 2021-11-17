##Partimos de una imagen de node en la versión lts-alpine para que pese menos la imagen
FROM node:lts-alpine

##Creamos el directorio de trabajo predefinido del cliente
WORKDIR /usr/src/app/client

##Copiamos todo el proyecto en el directorio de trabajo establecido anteriormente
## y instalamos angular en su version CLI
COPY . .
RUN npm install -y -g @angular/cli
RUN npm install
## Exponemos el puerto de trabajo de la parte cliente
## y listamos la aplicación en la dirección del Localhost que sera la que escuche la aplicación
EXPOSE 4200
CMD ng serve --host 0.0.0.0