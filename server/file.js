const { readFile } = require('fs');

const fileReplace = (appFile, title, content) => {
  return new Promise((resolve, reject) => {
    readFile(appFile, {
      encoding: 'utf8'
    }, (err, file) => {
      try {
        if (err || !file) throw new Error('no file');
        console.log(file);
        let html = file;
        Object.keys(content).forEach((data) => {
          html = html.replace(data, content[data]);
        });
        html = !!title ? html.replace('<title>Cyberlife</title>', `<title>Cyberlife: ${title}</title>`) : html;
        resolve(html);
      } catch(e) {
        reject(e);
      }
    });
  });
}

module.exports = fileReplace;