const port = 3001;
const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
serveStatic = require('serve-static');

const app = express();
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

const gzip = (req, res, next) => {
  if (req.url.indexOf('bundle.js') === -1) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  } else {
    next();
  }
};

app.get('*.js', gzip);
app.get('*.css', gzip);

app.use(serveStatic(path.join(__dirname, '../dist')));

spdy.createServer(options, app).listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + port + '.');
  }
});
