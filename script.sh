#Creamos el network
docker network create ourbooks

#CLIENT PART

#Creamos la imágen de frontend y su contenedor
cd client
docker build -t frontend .
docker run -p 4200:4200 --name frontend_angCli --network ourbooks  frontend

#MONGO DATABASE PART

#Creamos la imágen de mongo y su contenedor
cd ..
docker build -t container_mongo .
docker run -p 27017:27017 --name mongo_database --network ourbooks container_mongo

#BACKEND PART 
#Creamos la imágen de backend y su contenedor
cd server
docker build -t backend .
docker run -p 3000:3000 --name backend_container --network ourbookurbooks backend