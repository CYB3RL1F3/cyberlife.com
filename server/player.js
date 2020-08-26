const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 20000
});

const player = async (req, res) => {
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
      'title': track.title,
      'og:title': track.title,
      'twitter:title': track.title,
      'og:type': 'music.song',
      'og:url': req.url,
      'og:audio': track.url,
      'og:audio:type': 'audio/vnd.facebook.bridge',
      'og:image': track.artwork,
      'twitter:card': track.artwork,
      'og:site_name': "Cyberlife music",
      'fb:app_id': process.env.FB_APP_ID,
      'music:musician': "https://www.facebook.com/cyberlife.music",
      'music:duration': track.duration
    }
  
    return res.status(200).send(`
      <html lang="en-us">
        <head>
          <link rel="canonical" href="https://cyberlife-music.com" />
          <meta http-equiv="Content-Type" content="audio/vnd.facebook.bridge" />
          ${Object.keys(meta).map(((k) => `<meta name="${k}" content="${meta[k]}" />`))}
        </head>
        <body>
          Audio player
        </body>
      </html>
    `)
  } catch(e) {
    res.status(404).send(`
      <html>
        <body>
          No music available here!
        </body>
      </html>
    `)
  }
}

module.exports = player;