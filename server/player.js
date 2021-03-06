const axios = require('axios');
require('dotenv').config();
const fileReplace = require('./file');

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 20000
});

const player = async (req, res, appFile) => {
  const id = req.params.id;
  try {
    const { data } = await instance.get('playlist', {
      params: {
        name: 'dj-sets'
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (!data || !data.tracks) throw new Error('track not found');
    const track = data.tracks.find(t => t.id === parseInt(id));
    if (!track) throw new Error('track not found');
    const image = track.artwork && track.artwork.replace('large', 't500x500');
    const description = track.description.replace(/\"/gmi, '');
    const meta = {
      'charset': 'utf-8',
      'robots': 'all',
      'theme-color': '#36595C',
      'description': description,
      'og:description': description,
      'twitter:description': description,
      'title': track.title,
      'og:title': track.title,
      'twitter:title': track.title,
      'og:type': 'music.song',
      'Content-Type': 'text/html',
      'og:url': `https://cyberlife-music.com/${req.path}`,
      'og:audio': track.url,
      'og:audio:type': 'audio/vnd.facebook.bridge',
      'og:image': image,
      'og:image:secure_url': image,
      'og:image:alt': track.title,
      'image': image,
      'twitter:image': image,
      'og:site_name': "Cyberlife music",
      'twitter:card': 'player',
      'twitter:player': track.url,
      'twitter:player:width': 500,
      'twitter:player:height': 250,
      'twitter:site': '@cyberlife_music',
      'fb:app_id': process.env.FB_APP_ID,
      'fb:page_id': process.env.FB_PAGE_ID,
      'og:music:musician': "https://www.facebook.com/cyberlife.music",
      'og:music:duration': track.duration
    }
    const title = `Cyberlife - ${track.title}`;
    const html = await fileReplace(appFile, title, meta);
    return res.status(200).send(html);
    /*
    return readFile(appFile, {
      encoding: 'utf8'
    }, (err, file) => {
      if (err || !file) throw new Error('no file');
      console.log(file);
      const html = file.replace('<meta name="Content-Type" content="text/html; charset=utf-8">', heads.replace(/\"/gmi, "'")).replace('<title>Cyberlife</title>', `<title>Cyberlife - ${track.title}</title>`);
      console.log(html);
      return res.status(200).send(html);
    });
    */
  } catch(e) {
    console.log(e);
    res.status(404).sendFile(appFile);
  }
}

module.exports = player;