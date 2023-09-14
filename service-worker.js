importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

const routing = workbox.routing;
const strategies = workbox.strategies;

workbox.routing.registerRoute(
	/.(?:css|js|jsx|json)$/,
	new workbox.strategies.StaleWhileRevalidate({
		"cacheName": "assets",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000
			})
		]
	})
);

workbox.routing.registerRoute(
	/.(?:png|jpg|jpeg|gif|woff2)$/,
	new workbox.strategies.CacheFirst({
		"cacheName": "images",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000
			})
		]
	})
);

workbox.routing.registerRoute(
	/(\/)$/,
	new workbox.strategies.StaleWhileRevalidate({
		"cacheName": "startPage",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000
			})
		]
	})
);


const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
