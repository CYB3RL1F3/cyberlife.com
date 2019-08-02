workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.cleanupOutdatedCaches();

workbox.precaching.precacheAndRoute(
  self.__precacheManifest.concat([
    {
      url: 'offline',
      revision: 1
    }
  ])
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
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
      new workbox.expiration.Plugin({
        maxEntries: 100,
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
      new workbox.expiration.Plugin({
        maxEntries: 100,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.routing.registerRoute(
  /^(http|https)?.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'offlineCache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200,
        purgeOnQuotaError: false
      })
    ]
  }),
  'GET'
);

workbox.googleAnalytics.initialize({});

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      const offlineCacheKey = workbox.precaching.getCacheKeyForURL('offline');
      return caches.match(offlineCacheKey);

    case 'image':
      return caches.match('images');

    case 'font':
      return caches.match('fonts');

    case 'video':
      return caches.match('videos');

    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});
