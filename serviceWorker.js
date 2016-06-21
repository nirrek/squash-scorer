const currentCacheName = 'sw-cache-v2';

const precacheResources = [
  '/',
  '/bundle.js',
];

const ignoredQueryParams = [
  'cache-bust',
];

function toCacheBustingUrl(urlString) {
  const url = new URL(urlString, self.location.origin);
  const delimiter = url.search ? '&' : '?';
  return `${urlString}${delimiter}cache-bust=${Date.now()}`;
}

// stripIgnoredQueryParams :: (string, Array<string>) -> string
function stripIgnoredQueryParams(urlString, queryParamsToIgnore) {
  const url = new URL(urlString, self.location.origin);

  queryParamsToIgnore.forEach(queryParam => {
    url.searchParams.delete(queryParam);
  });

  return url.toString();
}

// addToCache :: (Cache, string) -> Promise<void>
// Fetches the given url resource and adds the response to the cache, ensures
// that the fetch is from the network (never the browser cache).
function addToCache(cache, urlString) {
  const requestUrl = toCacheBustingUrl(urlString);
  const cacheUrl = stripIgnoredQueryParams(requestUrl, ignoredQueryParams);

  return fetch(requestUrl)
    .then(res => cache.put(cacheUrl, res));
}

// addAllToCache :: (Cache, Array<string>) -> Promise<void>
function addAllToCache(cache, urls) {
  return Promise.all(
    urls.map(url => addToCache(cache, url))
  );
}

// Precache the app-shell when the service worker is installed.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => addAllToCache(cache, precacheResources))
  );
});

// Remove non-current caches once the new service worker has taken control.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== currentCacheName)
          .map(cacheName => caches.delete(cacheName))
      )
    )
  );
});

// Cache-first strategy for all requests.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/match/')) {
    event.respondWith(
      caches.match('/', { cacheName: currentCacheName })
        .then(response => response || fetch('/'))
    );
  } else {
    const cacheUrl = stripIgnoredQueryParams(event.request.url, ignoredQueryParams);

    event.respondWith(
      caches.match(cacheUrl, { cacheName: currentCacheName })
        .then(response => response || fetch(event.request))
    );
  }
});

// Main thread tells the service worker to take control of the page.
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
