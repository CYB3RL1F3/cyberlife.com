const { readFile } = require('fs');

const getType = (type) => {
  if (type.indexOf('og:') > -1) return 'property';
  if (type.indexOf('fb:app_id') > -1) return 'property';
  if (type === "Content-Type") return 'http-equiv';
  return 'name';
}

const fileReplace = (appFile, title, meta) => {
  return new Promise((resolve, reject) => {
    readFile(appFile, {
      encoding: 'utf8'
    }, (err, file) => {
      try {
        if (err || !file) throw new Error('no file');
       const heads = Object.keys(meta).map(((k) => `<meta ${getType(k)}="${k}" content="${meta[k]}" data-react-helmet="true" />`)).join('');
       const html = file.replace('<title>Cyberlife</title>', `<title>${title}</title>${heads}`);
       resolve(html);
      } catch(e) {
        console.log(e);
        reject(e);
      }
    });
  });
}

module.exports = fileReplace;