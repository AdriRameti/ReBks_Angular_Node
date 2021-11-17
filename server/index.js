const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const bodyParser = require('body-parser');
const routesBooks = require('./routes/routes.books');
const routesCourses = require('./routes/routes.courses');
const routesEnsenanza = require('./routes/routes.ensenanza');
const routesUsers = require('./routes/routes.user');
const app = express();
var dd_options = {
    'response_code':true,
    'tags': ['app:express']
  }
var connect_datadog = require('connect-datadog')(dd_options);
conectarDB();

const port = process.env.PORT || 3000

app.use(connect_datadog);

app.use(cors())

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/api/books',routesBooks);
app.use('/api/courses',routesCourses);
app.use('/api/ensenanza',routesEnsenanza);
app.use('/api/user',routesUsers);

app.listen( port, '0.0.0.0', () => { 
    console.log(`El servidor está corriendo perfectamente en el puerto ${port}`)
})