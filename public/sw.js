const CACHE_PREFIX = 'neilpatrickbeltran-assets-'
const CACHE = `${CACHE_PREFIX}v1`
const LEGACY_CACHE = 'assets-v1'
const MAX_AGE = 30 * 24 * 60 * 60 * 1000
const CACHED_AT = 'x-neilpatrickbeltran-cached-at'

async function pruneExpired(cache) {
  for (const request of await cache.keys()) {
    const response = await cache.match(request)
    const cachedAt = Number(response?.headers.get(CACHED_AT))
    if (!Number.isFinite(cachedAt) || Date.now() - cachedAt > MAX_AGE) {
      await cache.delete(request)
    }
  }
}

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => (
          key === LEGACY_CACHE || (key.startsWith(CACHE_PREFIX) && key !== CACHE)
        )).map((key) => caches.delete(key)),
      ))
      .then(() => caches.open(CACHE))
      .then(pruneExpired)
      .then(() => self.clients.claim()),
  )
})

// Cache-first for hashed build assets (filenames change when content changes).
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return
  if (!url.pathname.includes('/assets/')) return
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      await pruneExpired(cache)
      const hit = await cache.match(request)
      if (hit) {
        const headers = new Headers(hit.headers)
        headers.delete(CACHED_AT)
        return new Response(hit.body, { status: hit.status, statusText: hit.statusText, headers })
      }
      const res = await fetch(request)
      if (res.status === 200) {
        const headers = new Headers(res.headers)
        headers.set(CACHED_AT, Date.now().toString())
        await cache.put(
          request,
          new Response(res.clone().body, { status: res.status, statusText: res.statusText, headers }),
        )
      }
      return res
    }),
  )
})
