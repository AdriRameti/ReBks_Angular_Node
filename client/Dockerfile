##Partimos de una imagen de node en la versión 14.17.3 
## ya que en la última versión daba error en la librería Hash
FROM node:14.17.3

##Creamos el directorio de trabajo predefinido del cliente
WORKDIR /usr/src/app/client

##Copiamos los archivos package.json y package-lock.json 
COPY package.json package-lock.json ./

##Copiamos todo el proyecto en el directorio de trabajo establecido anteriormente
## y instalamos angular en su version CLI
COPY . .
RUN npm install -y -g @angular/cli
RUN npm install
## Exponemos el puerto de trabajo de la parte cliente
## y listamos la aplicación en la dirección del Localhost que sera la que escuche la aplicación
EXPOSE 4200
CMD ng serve --host 0.0.0.0
