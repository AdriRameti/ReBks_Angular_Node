const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const bodyParser = require('body-parser');
const routesBooks = require('./routes/routes.books');
const routesCourses = require('./routes/routes.courses');
const routesEnsenanza = require('./routes/routes.ensenanza');
const routesUsers = require('./routes/routes.user');
const app = express();

conectarDB();

var dd_options = {
  'response_code':true,
  'tags': ['app:express']
}
var connect_datadog = require('connect-datadog')(dd_options);
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
level: 'info',
exitOnError: false,
format: format.json(),
transports: [
  new transports.File({ filename: `C:/datadog-agent/my-logs.log` }),
],
});

module.exports = logger;

// Example logs
logger.log('info', 'Hello simple log!');
logger.info('Hello log with metas',{color: 'blue' });

const tracer = require('dd-trace').init({
  logInjection: true
});

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
    console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
})