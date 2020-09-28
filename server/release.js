const axios = require('axios');
require('dotenv').config();
const fileReplace = require('./file');
const { format } = require('date-fns');

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
    const description = `${data.label} (${data.cat}) | Release date: ${format(new Date(data.releaseDate.replace(/(00)/mgi, '01')), 'dd/MM/yyyy')}`;
    const image = data.thumb;
    const meta = {
      'charset': 'utf-8',
      'robots': 'all',
      'theme-color': '#36595C',
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
      'og:image:alt': title,
      'twitter:image': image,
      'twitter:card': 'summary',
      'og:site_name': "Cyberlife music",
      'twitter:site': '@cyberlife_music',
      'fb:app_id': process.env.FB_APP_ID,
      'fb:page_id': process.env.FB_PAGE_ID
    }
    const name = `Cyberlife - ${title}`
    const html = await fileReplace(appFile, name, meta);
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