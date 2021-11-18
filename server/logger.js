const { createLogger, format, transports, config } = require('winston');
 
const logger = createLogger({
   transports: [
    new transports.File({ filename: `C:/datadog-agent/my-logs.log` })
     ]
 });
 module.exports = logger;