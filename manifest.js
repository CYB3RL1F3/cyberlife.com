const path = require('path');
const manifest = require('./src/assets/pwa/manifest.json');

const icons = manifest.icons.map((icon) => {
  icon.src = icon.src.replace(
    '/',
    `${path.resolve(__dirname, 'src/assets/pwa')}/`
  );
  return icon;
});

manifest.icons = icons;

manifest.serviceworker = path.resolve(
  __dirname,
  'src/assets/pwa/service_worker.js'
);

module.exports = manifest;
