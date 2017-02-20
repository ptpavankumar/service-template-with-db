#!/usr/bin/env node

const http = require('http');

const app = require('./app');
const userRoute = require('./routes/user');
const addressRoute = require('./routes/address');
const healthRoute = require('./routes/healthcheck');

const server = http.createServer(app);
const port = process.env.PORT || '3000';

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`); // eslint-disable-line no-console
};

const mount = (expressApp, base, handler) => {
  if (base) {
    expressApp.use(base, handler);
  } else {
    expressApp.use(handler);
  }
};

mount(app, process.env.MOUNT_PATH, healthRoute);
mount(app, process.env.MOUNT_PATH, userRoute);
mount(app, process.env.MOUNT_PATH, addressRoute);

app.set('port', port);
server.listen(port);
server.on('listening', onListening);
