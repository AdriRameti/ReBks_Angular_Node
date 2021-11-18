# Practica Docker-Compose
## Adrian Ramos Ureña

### ¿Que és docker-compose?
Compose es una herramienta para definir y ejecutar aplicaciones Docker de contenedores múltiples. Con Compose, utiliza un archivo YAML para configurar los servicios de su aplicación. Luego, con un solo comando, crea e inicia todos los servicios desde su configuración.
Compose funciona en todos los entornos: producción, puesta en escena, desarrollo, pruebas, así como flujos de trabajo de CI.
Usar Compose es básicamente un proceso de tres pasos:
  1. Defina el entorno de su aplicación con un Dockerfile para que pueda reproducirse en cualquier lugar.
  2. Defina los servicios que componen su aplicación docker-compose.yml para que puedan ejecutarse juntos en un entorno aislado.
  3. Ejecuta docker-compose up y Compose inicia y ejecuta toda su aplicación.

### ¿Que és Kubernetes?
Kubernetes es una plataforma portable y extensible de código abierto para administrar cargas de trabajo y servicios. Kubernetes facilita la automatización y la configuración declarativa. Tiene un ecosistema grande y en rápido crecimiento. El soporte, las herramientas y los servicios para Kubernetes están ampliamente disponibles.
Kubernetes tiene varias características. Puedes pensar en Kubernetes como:
  1. Una plataforma de contenedores
  2. Una plataforma de microservicios
  3. Una plataforma portable de nube
y mucho más.
Kubernetes ofrece un entorno de administración centrado en contenedores. Kubernetes orquesta la infraestructura de cómputo, redes y almacenamiento para que las cargas de trabajo de los usuarios no tengan que hacerlo. Esto ofrece la simplicidad de las Plataformas como Servicio (PaaS) con la flexibilidad de la Infraestructura como Servicio (IaaS) y permite la portabilidad entre proveedores de infraestructura

### Crear nueva rama git
Para porceder a realizar la práctica, sobre el proyecto, crearemos una nueva rama denominada main_docker_compose.
Aquí alojaremos todos los elementos de la práctica. La rama la crearemos con el comando:

```s
git branch main_docker_compose
```

![New Branch](/img/crear_rama_git.png)

Una vez hemos creado la rama, verificaremos que se ha creado bien con el comando:
```s
git branch
```

Aquí nos apareceran todas las ramas que tenemos creadas.

### Crear el Dockerfile del cliente
Una vez tengamos ya la rama creada y verificada, empezaremos por la parte cliente creando su dockerfile. 
En él, utilizaremos una imagen de node versión alpine para que su tamaño sea menor. Además, fijaremos un directorio de trabajo el cual será /usr/src/app/client.
Copiaremos todos los archivos del directorio client en nuestro nuevo directorio de trabajo.
Seguidamente, realizaremos dos RUN para instalar las dependencias, con ellas la de angular cli.
Expondremos nuestro puerto de trabajo el cual sera el 4200 y por último pondremos en marcha la parte cliente

```s
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
```s
![Client](/img/Dockerfile_client.png)

### Crear el Dockerfile del servidor
Creado ya el dockerfile del cliente, continuaremos por la parte del servidor creando su dockerfile. 
En él, utilizaremos una imagen de node versión alpine para que su tamaño sea menor. Además, fijaremos un directorio de trabajo el cual será /usr/src/app/server.
Copiaremos todos los archivos del directorio client en nuestro nuevo directorio de trabajo.
Seguidamente, realizaremos dos RUN para instalar las dependencias.
Expondremos nuestro puerto de trabajo el cual sera el 3000 y por último pondremos el comando para inicializar el servidor cuando se cree la imagen.

```s
##Partimos de una imagen de node alpine para que el tamaño se reduzca 
#y se utilizará la misma en el cliente
FROM node:lts-alpine
##Creamos el directorio de trabajo predefinido del cliente
WORKDIR /usr/src/app/server

##Copiamos todo el contenido del sitio donde estamos al directorio especificado
COPY . .

##Realizamos la instalacion de los modulos de la aplicación
RUN npm install 

## Exponemos el puerto que gastara la parte servidor
EXPOSE 3000

## Arrancamos el servidor
CMD node index.js
```s

![Client](/img/Dockerfile_server.png)

### Base de datos
Al utilizar una base de datos como es Mongo, necesitaremos de alguna forma poder extraer los datos que tenemos en ella y para eso deberemos entender que es mongodump
##### ¿Que és Mongodump?
Mongodump es la aplicación por defecto para realizar copias de seguridad del contenido de una instancia mongodb, el formato utilizado es el bson que  presenta de forma binaria las estructuras de datos y sus mapas. Los backups se pueden ejecutar en modo consistente o inconsistente.

Para ello deberemos tener instalado las funciones de mongodump y mongorestore. Dependiendo de la descarga que se realizó de mongo, algunos ya llevan estos comandos y otros se deben descargar de la pagina oficial
##### Exportar los datos de la base de datos
Para exportar la información de nuestra base de datos utilizaremos un comando en que le diremos el host y el nombre de la base de datos y él nos creará una carpeta en nuestro proyecto denominada DUMP, donde realizara la exportación de nuestra base de datos.

```s
mongodump --host 127.0.0.1:27017 -db ourbooks
```
Una vez realizada la exportación, verificaremos que se han creado el directorio con los datos.
![Dump](/img/dump.png)

##### Crear Dockerfile de Mongo
Para poder asignar estos datos en nuestra aplicación, deberemos crear un contenedor de Mongo. En este caso partiremos de un Dockerfile sencillo para Mongo en el cual lo que cabe recalcar es que crearemos una carpeta dump para copiar el contenido de la exportación a esta. El puerto que utilizaremos será el 27017.
```s
FROM mongo:latest
RUN mkdir dump
COPY /dump /dump
EXPOSE 27017
```
### Crear archivo .env 
En este punto, lo que haremos será crear un archivo .env donde declararemos los puertos de los contenedores. Es una manera optima de realizar la asignacion de puertos ya que si se cambiaran por cualquier necesidad, solo modificariamos el valor de estos en el archivo creado. En este archivo también se puede declarar variables sensibles.
![ENV](/img/env.png)


### Crear docker-compose 
En este paso, crearemos un docker-compose con los servicios necesarios para el despliegue de la aplicación.
Los servicios definidos son:
  1. angular  (Parte del cliente)
  2. mongo  (Base de Datos)
  3. express (Parte del servidor)
Ellos 3 estarán comunicados por una network creada denominada ourbooks. La otra network que utilizan es para comunicarse con otro docker-compose y así estar comunicados.
Como hemos visto en el apartado del archivo .env , los puertos vendran especificados por las variables declaradas en dicho archivo.
En el servicio de express, utilizara el operador env_file para declarar el archivo donde debe coger la información de la base de datos.
Por otra parte, en este servicio también se utilizara el depends_on ya que necesita la información del servicio Mongo (base de datos) para obtener los valores.
```s
version: '3'
services:
  angular:
    build: ./client
    ports:
      - ${CLIENT_PORT}
    networks:
      - ourbooks
      - logs-network
  mongo:
    build: .
    container_name: mongodb
    ports:
      - ${MONGO_PORT}
    networks:
      - ourbooks
      - logs-network
  express:
    build: ./server
    env_file:
      - ./server/variablesDb.env
    ports:
      - ${SERVER_PORT}
    networks:
      - ourbooks
      - logs-network
    depends_on:
      - mongo

networks:
  ourbooks:
  logs-network:
    external: true
```
Una vez tengamos el docker-compose hecho realizaremos un docker-compose up para ver si realmente funciona el despliegue.
Si accedemos a localhost:4200 podremos ver que la vista es cargada pero que la información de la base de datos no. Esto se debe a que debemos realizar un compando para restaurar la información extraida y que se localiza en el directorio dump. Este comando se debe realizar una vez esten los contenedores corriendo.
El comando tiene la siguiente estructura : docker exec <nombre_contenedor> mongorestore /dump
```s
docker exec mongodb mongorestore /dump
```
Una vez ejecutado el comando, si actualizamos nuestra página, veremos que ya se han cargado los datos.

### Gestión de los logs y las métricas
Para realizar esta parte de la práctica, utilizaremos Prometheus y Grafana. 
¿Que és Prometheus?
Prometheus es un sistema de monitoreo de código abierto basado en métricas. Recopila datos de servicios y hosts mediante el envío de solicitudes HTTP en puntos finales de métricas. Luego, almacena los resultados en una base de datos de series de tiempo y los pone a disposición para análisis y alertas.

¿Que és Grafana?
Grafana es una herramienta hecha en software libre, específicamente con licencia Apache 2.0, ideada por Torkel Ödegaard (quien todavía está al frente de su desarrollo y mantenimiento) y creada en enero de 2014. Este desarrollador sueco comenzó su carrera en el ambiente .NET y en 2012 (hasta la fecha) sigue ofreciendo servicios de desarrollo y consultoría en esta popular plataforma privativa, de forma paralela con el desarrollo de software libre.

Grafana está escrita en Lenguaje Go (creado por Google) y Node.js LTS y con una fuerte Interfaz de Programación de Aplicaciones (API).

Una vez hemos entendido que es cada uno de estos sistemos de monitoreo, vamos con los siguientes pasos de la aplicación.

##### Crear Dockerfile Prometheus
En este parte, crearemos el Dockerfile para la ejecución de prometheus.
Este Dockerfile parte de una imagen de prometheus version v2.20.1.
Además crearemos un directorio de trabajo el cual sera /etc/prometheus en el que copiaremos el archivo .yml proporcionado por el profesor.
En este archivo, especifica las variables de entorno de uso, en que aplicación se gastara y en que puerto.
Prometheus estara expuesto en el puerto 9090.
Por ultimo, ejecutara el comando --config.file=/etc/prometheus/prometheus.yml en el cual asignara la configuración al archivo .yml nombrado anteriormente
```s
FROM prom/prometheus:v2.20.1
WORKDIR /etc/prometheus
COPY ./prometheus.yml /etc/prometheus/
EXPOSE 9090
CMD ["--config.file=/etc/prometheus/prometheus.yml"]
```
##### Crear Dockerfile Grafana
Crearemos un dockerfile para la ejecución de Grafana. 
Partira de una imagen de grafana version 7.1.5.
Crearemos un directorio de trabajo el cual será  /etc/grafana/provisioning/datasources/ y en el cual copiaremos el archivo datasources.yml proporcionado por el profesor.
Grafa trabaja en el puerto 3000 por lo tanto expondremos este puerto.
```s
FROM grafana/grafana:7.1.5
WORKDIR  /etc/grafana/provisioning/datasources/
COPY ./datasources.yml /etc/grafana/provisioning/datasources/
EXPOSE 3000
```

##### Crear archivo server.js 
Este archivo estará situado en el directorio del servidor y en él, utilizaremos la dependencia prom-client para realizar los extractos de las métricas. Este archivo, dependiendo de las direcciones, enviara unas métricas o la información que nosotros le especifiquemos. 
Se deberá inicializar con el comando:
```s
node server.js
```
##### Crear otro docker-compose
En esta parte crearemos el segundo docker-compose que estará vinculado con el creado anteriormente con la network explicada logs-network.
En él, crearemos un servicio para prometheus y otro para grafana.
En el servicio de prometheus, construiremos a partir del directorio ./prometheus en el que se aloja el Dockerfile de prometheus. Expondremos el puerto que utilizará y le daremos nombre al contenedor.
En el servicio de garfana, construiremos a partir del directorio ./grafana en el que se aloja su Dockerfile. El puerto que utiliza es el 3000 pero nosotros le asignaremos el 3500 ya que el 3000 es utilizado para la parte servidora de la aplicación. Además de asignarle el nombre del contenedor, especificaremos las variables de entorno que será:
  1. Deshabilitar el login de acceso a Grafana
  2. Permitir la autenticación anónima
  3. Que el rol de autenticación anónima sea Admin
  4. Que instale el plugin grafana-clock-panel 1.0.1

Por otra parte, también contara con un volumen denominado myGrafanaVol y que sera asignado a la ruta /etc/grafana/provisioning/datasources/
```s
version: '3' 
services: 
  prometheus:
    build: ./prometheus
    ports:
      - '9090:9090'
    container_name: prometheus_practica
  grafana:
    build: ./grafana
    ports:
      - '3500:3000'
    container_name: grafana_practica
    environment:
      - GF_AUTH_DISABLE_LOGIN_FORM=true
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_INSTALL_PLUGINS=grafana-clock-panel 1.0.1
    volumes:
      - myGrafanaVol:/etc/grafana/provisioning/datasources/
volumes:
  myGrafanaVol:
networks: 
  logs-network:
    external: true
```

Una vez creado el docker-compose-1 , realizaremos el docker-compose up. Para lanzar los dos docker-compose a la vez se realizara con el siguiente comando:
```s
docker-compose -f docker-compose.yml -f docker-compose1.yml up -d
```

##### Distintos Localhost
En localhost:4200 encontraremos el despliegue de nuestra aplicación
![image](https://user-images.githubusercontent.com/75810680/142489700-7f778c26-a1f8-43f0-9777-685a04d5d257.png)

En localhost:8080/metrics encontraremos las métricas (se debe iniciar el server.js antes)
![metrics](/img/metrics.png)

En localhost:9090 tendremos el dashboard de Prometheus
![prometheus](/img/prometheus.png)

En localhost:3500 tendremos el dashboard de Grafana
![grafana](/img/grafana.png)





















