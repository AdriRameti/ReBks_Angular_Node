##Partimos de una imagen de node en su última versión
FROM node:latest
##Creamos el directorio de trabajo predefinido del cliente
WORKDIR /usr/src/app/server

##Copiamos todo el contenido del sitio donde estamos al directorio especificado
COPY . .

##Realizamos la instalacion de los modulos de la aplicación
RUN npm install 

## Exponemos el puerto que gastara la parte servidor
EXPOSE 3000

## Arrancamos el servidor
CMD ["node","index.js"]