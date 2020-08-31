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
        Object.keys(meta).forEach((key) => {
          const type = getType(key);
          const contentFrom = `<meta ${type}="${key}" content="`;
          const indexFrom = html.indexOf(contentFrom) + contentFrom.length;
          if (indexFrom > contentFrom.length -1) {
            const indexTo = html.substr(indexFrom).indexOf('"');
            const contentToReplace = html.substr(indexFrom, indexTo);
            const segmentToReplace = `${contentFrom}${contentToReplace}`;
            const finalMeta = `${contentFrom}${meta[key]}`;
            html = html.replace(segmentToReplace, finalMeta);
          } else {
            heads.push(`<meta ${type}="${key}" content="${meta[key]}" data-react-helmet="true" />`);
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