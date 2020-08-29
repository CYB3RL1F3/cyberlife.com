const axios = require('axios');
require('dotenv').config();
const fileReplace = require('./file');

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 20000
});

const eventDetails = async (req, res, appFile) => {
  const eventId = req.params.id;
  const type = req.params.type;
  try {
    const { data } = await instance.get('event', {
      params: {
        type,
        eventId
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (!data) throw new Error('event not found');
    const title = data.title;
    const description = `@${data.location.address} on ${data.date}`;
    const image = data.flyer.front;
    const meta = {
      'charset': 'utf-8',
      'robots': 'all',
      'theme-color': '#36595C',
      'viewport': 'width=device-width, initial-scale=1.0, minimal-ui',
      'description': description,
      'og:description': description,
      'twitter:description': description,
      'title': title,
      'og:title': title,
      'twitter:title': title,
      'og:type': 'article',
      'og:url': `https://cyberlife-music.com/${req.path}`,
      'og:image': image,
      'image': image,
      'twitter:card': image,
      'og:site_name': "Cyberlife music",
      'fb:app_id': process.env.FB_APP_ID,
    }
    const newTitle = `<title>Cyberlife @${title} - ${data.date}</title>`;

    const heads = Object.keys(meta).map(((k) => `    <meta name="${k}" content="${meta[k]}" data-react-helmet="true" />`)).join('\n');
    const html = await fileReplace(appFile, title, {
      '<title>Cyberlife</title>': `${newTitle} ${heads}`
    });
    return res.status(200).send(html);
  } catch(e) {
    console.log(e);
    res.status(404).sendFile(appFile);
  }
}

module.exports = eventDetails;