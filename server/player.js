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
    const meta = {
      'charset': 'utf-8',
      'robots': 'all',
      'theme-color': '#36595C',
      'viewport': 'width=device-width, initial-scale=1.0, minimal-ui',
      'description': track.description,
      'og:description': track.description,
      'twitter:description': track.description,
      'title': track.title,
      'og:title': track.title,
      'twitter:title': track.title,
      'og:type': 'music.song',
      'Content-Type': 'text/html',
      'og:url': `https://cyberlife-music.com/${req.path}`,
      'og:audio': track.url,
      'og:audio:type': 'audio/vnd.facebook.bridge',
      'og:image': track.artwork,
      'image': track.artwork,
      'twitter:card': track.artwork,
      'og:site_name': "Cyberlife music",
      'fb:app_id': process.env.FB_APP_ID,
      'music:musician': "https://www.facebook.com/cyberlife.music",
      'music:duration': track.duration
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