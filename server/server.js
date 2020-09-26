const port = process.env.PORT || 3443;
const http = require('http');
const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const Ddos = require('ddos');
const serveStatic = require('serve-static');
const player = require('./player');
const releaseDetails = require('./release');
const eventDetails = require('./event');
const fileReplace = require('./file');

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
  if (fileName.indexOf('service-worker') > -1 || fileName.indexOf('workbox') > -1) return false;
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
// app.get('*.eot', gzip);
// app.get('*.ttf', gzip);
app.get('*.json', gzip);

app.use(compression({
  level: 9
}));

app.use(serveStatic(path.join(__dirname, '../dist')));

const cyberlife = (title) => ({
  description: "Inspired by a wide range of electronic genres, between dub techno, IDM, drum and bass, dubstep, tribalistic world music, ambient, trip hop, psychedelic rock & goa trance, Cyberlife, who got rooted years ago in the techno culture, brings the ambition to shape a very personal style, surfing on forward thinking, psychedelic, hypnotic and melancholic vibes. By applying layers of effects on stretched field recordings or destructured analog synths jams on a large scale of tempos, the exploration of the meanders of the matrix of electronic music defines his director line, with an aim to find transcendance and reveal a futuristic and organic universe. As both DJ and producer, he gets a natural attraction for modern and organic sounds, mixing with old school influences. Don't look for the nerd behind this name, keep the mystery and unpredictability, and share a musical mindtrip.",
  title,
  url: `https://cyberlife-music.com`,
  image: "https://res.cloudinary.com/hw2jydiif/image/upload/v1592758419/android-icon-512x512_rd0xq8.png"
});

const meta = (title, path) => {
  const { description, url, image, imageAlt } = cyberlife(title);
  return {
    'charset': 'utf-8',
    'robots': 'all',
    'theme-color': '#36595C',
    'description': description,
    'og:description': description,
    'twitter:description': description,
    'title': title,
    'og:title': title,
    'twitter:title': title,
    'og:type': 'website',
    'og:url': `${url}/${path}`,
    'og:image': image,
    'og:image:alt': title,
    'image': image,
    'twitter:image': image,
    'twitter:card': 'summary',
    'og:site_name': "Cyberlife music",
    'twitter:site': '@cyberlife_music',
    'fb:app_id': process.env.FB_APP_ID,
    }
}

const getTitle = (path) => {
  switch(true) {
    case /(events)/gmi.test(path):
      return 'Cyberlife - Events'
    case /(releases)/gmi.test(path):
      return 'Cyberlife - Releases'
    case /(charts)/gmi.test(path):
      return 'Cyberlife - Charts'
    case /(contact)/gmi.test(path):
      return 'Cyberlife - Contact'
    case /(about)/gmi.test(path):
      return 'Cyberlife - About this website'
    default:
      return null;
  }
}

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// app routes...
Object.keys(routes).forEach((r) => {
  app.get(routes[r], async (req, res) => {
    // if (/^(facebookexternalhit|twitterbot)/gmi.test(ua)) {
      if (/(podcasts)\/[0-9]/gmi.test(req.path)) {
        return player(req, res, appFile);
      } else if (/(releases)\/[0-9]/gmi.test(req.path)) {
        return releaseDetails(req, res, appFile);
      } else if (/(events)\/[a-zA-Z0-9]*/gmi.test(req.path)) {
        return eventDetails(req, res, appFile);
      } else {
        const title = getTitle(req.path);
        const metadata = meta(title, req.path);
        const html = await fileReplace(appFile, title, metadata);
        return res.status(200).send(html); 
      }
    // }
  });
});


/*
svg   as "image/svg+xml"                  (W3C: August 2011)
ttf   as "application/x-font-ttf"         (IANA: March 2013)
      or "application/x-font-truetype"
otf   as "application/x-font-opentype"    (IANA: March 2013)
woff  as "application/font-woff"          (IANA: January 2013)
woff2 as "application/font-woff2"         (W3C W./E.Draft: May 2014/March 2016)
eot   as "application/vnd.ms-fontobject"  (IANA: December 2005)
sfnt  as "application/font-sfnt"          (IANA: March 2013) 
*/

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
