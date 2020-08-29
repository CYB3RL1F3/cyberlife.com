const axios = require('axios');
require('dotenv').config();
const fileReplace = require('./file');

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 20000
});

const releaseDetails = async (req, res, appFile) => {
  const id = req.params.id;
  try {
    const { data } = await instance.get('release', {
      params: {
        id
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (!data) throw new Error('release not found');
    const title = data.title;
    const description = data.info;
    const image = data.thumb;
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
    const name = `<title>Cyberlife - ${title}</title>`
    const heads = Object.keys(meta).map(((k) => `    <meta name="${k}" content="${meta[k]}" />`)).join('\n');
    const html = await fileReplace(appFile, title, {
      '<title>Cyberlife</title>': `${heads} ${name}`
    });
    console.log(html);
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

module.exports = releaseDetails;