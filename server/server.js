const port = 3443;
const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
serveStatic = require('serve-static');

const app = express();
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

const hasGzip = (fileName) => {
  return fs.existsSync(`../dist${fileName}.gz`);
};

const gzip = (req, res, next) => {
  if (hasGzip(req.url)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  } else {
    next();
  }
};

app.get('*.js', gzip);
app.get('*.css', gzip);

app.use(compression());

app.use(serveStatic(path.join(__dirname, '../dist')));

spdy.createServer(options, app).listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + port + '.');
  }
});
