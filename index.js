const http = require('http');
const { database } = require('./src/config/database');
const app = require('./src/app');
/**
 *  Normalize a port into  a number , string , false
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    //pipe
    return val;
  }
  if (port >= 0) {
    // number
    return port;
  }
  return false;
};
const server = http.createServer(app);
const PORT = normalizePort(process.env.PORT) || 8000;
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${PORT}`;
  console.log(`listening on ${bind}`);
  const log = '[?] Connecting ...';
  console.log(log);
  database.connect('mongodb://127.0.0.1:27017/authentication').then(() => {
    console.log(`Successfully Established Connection to the Database`);
  });
});
server.listen(PORT);
