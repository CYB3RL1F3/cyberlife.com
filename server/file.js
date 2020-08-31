const { readFile } = require('fs');

const getType = (type) => {
  if (type.indexOf('og:') > -1) return 'property';
  if (type.indexOf('fb:') > -1) return 'property';
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
        let html = file;
        const heads = [];
        Object.keys(meta).forEach((k) => {
          const type = getType(k);
          const contentFrom = `<meta ${getType(k)}="${k}" content="`;
          const indexFrom = html.indexOf(contentFrom) + contentFrom.length;
          if (indexFrom > contentFrom.length -1) {
            const indexTo = html.substr(indexFrom).indexOf('"');
            const segmentToReplace = html.substr(indexFrom, indexTo);
            html = html.replace(segmentToReplace, meta[k]);
          } else {
            heads.push(`<meta ${getType(k)}="${k}" content="${meta[k]}" data-react-helmet="true" />`);
          }
        });
        html = html.replace(/(<title>)[a-zA-Z0-9\s\-]*(<\/title>)/gmi, `<title>${title}</title> ${heads.join('')}`);

        
        resolve(html);
      } catch(e) {
        console.log(e);
        reject(e);
      }
    });
  });
}

module.exports = fileReplace;