const port = process.env.PORT || 3443;
const http = require('http');
const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const Ddos = require('ddos');
const serveStatic = require('serve-static');

const routes = {
  podcasts: "/",
  podcastDetails: "/podcasts/:id",
  events: "/events",
  eventDetails: "/events/:type/:id",
  eventDetailsDefault: "/events/:id",
  charts: '/charts',
  releases: "/releases",
  releaseDetails: "/releases/:id",
  bio: '/biography',
  contact: '/contact',
  about: '/about'
}

const appFile = path.join(__dirname, '../dist', 'index.html');

const app = express();
const options = {
  key: fs.readFileSync(path.resolve(__dirname, "server.key")),// fs.readFileSync('./server.key'),
  cert: fs.readFileSync(path.resolve(__dirname, "server.crt"))
};

const hasGzip = (fileName) => {
  return fs.existsSync(path.resolve(__dirname, `../dist${fileName}.gz`));
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

if (process.env.NODE_ENV === 'production') {
  // Redirect http to https
  app.enable('trust proxy');
  app.use ((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

// DDOS protection
const ddos = new Ddos({
  burst: 900,
  limit: 1000,
  maxexpiry: 60,
  trustProxy: true,
  onDenial: (req) => {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    req.res.status(429).end(
        `<h1>You're temporary blocked! Too many request with IP ${ip}</h1>`
    );
  }
});

app.use(ddos.express);
app.get('*.js', gzip);
app.get('*.css', gzip);
app.get('*.eot', gzip);
app.get('*.ttf', gzip);
app.get('*.json', gzip);

app.use(compression({
  level: 9
}));

app.use(serveStatic(path.join(__dirname, '../dist')));

Object.keys(routes).forEach((r) => {
  app.get(routes[r], (req,res) => {
    res.status(200).sendFile(appFile);
  });
});

app.get('*', (req,res) => {
    res.status(404).sendFile(appFile);
});

const { createServer } = port === 3443 ? spdy : http;
createServer(options, app).listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + port + '.');
  }
});
