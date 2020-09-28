importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ debug: false });
workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.cleanupOutdatedCaches();

self.addEventListener('push', (event) => {
  const { title, content, action } = JSON.parse(event.data.text());
  const options = {
    body: content,
    icon: "./android-icon-192x192.png",
    vibrate: [100, 50, 100],
    actions: [
      {
        action, 
        title: "Check out",
        icon: 'images/checkmark.png'
      }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  console.log(event);
  const url = event.action;
  event.notification.close();
  if (url && url !== "close") event.waitUntil(clients.openWindow(url));
});

workbox.precaching.precacheAndRoute(
  self.__WB_MANIFEST.concat([
    {
      url: '/',
      revision: 1
    }
  ])
);

workbox.routing.registerRoute(
  /^(http|https)?.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'offlineCache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.routing.registerRoute(
  /\.(?:js)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'scripts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.routing.registerRoute(
  /\.(?:css)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'styles',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);


workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.routing.registerRoute(
  /\.(?:webm|mp4)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'videos',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100, 
        maxAgeSeconds: 86400,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.routing.registerRoute(
  /\.(?:ttf)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'fonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100, 
        maxAgeSeconds: 86400,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.googleAnalytics.initialize({});

workbox.routing.setCatchHandler((t) => {
  switch (t.event.request.destination) {
    case 'document':
      const offlineCacheKey = workbox.precaching.getCacheKeyForURL('offline');
      return caches.match(offlineCacheKey);

    case 'image':
      return caches.match('images');

    case 'font':
      return caches.match('fonts');

    case 'video':
      return caches.match('videos');

    case 'script':
      return caches.match('scripts');

    case 'style':
      return caches.match('styles');

    default:
      return Response.error();
  }
});