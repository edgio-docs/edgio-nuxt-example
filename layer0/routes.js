import { Router } from '@layer0/core'
import { nuxtRoutes } from '@layer0/nuxt'
import getPrerenderRequests from './getPrerenderRequests'
import { isProductionBuild } from '@layer0/core/environment'
import { API_CACHE_HANDLER, IMAGE_CACHE_HANDLER, EDGE_CACHE_HANDLER } from './cache'

const router = new Router()

// Regex to catch multiple hostnames
// Any deployment will have a L0 permalink
// Don't allow Google bot to crawl it, read more on:
// https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
router.noIndexPermalink()

// Pre-render the static home page
// By pre-rendering, once the project is deployed
// the set of links are visited to warm the cache
// for future visits (expected to be the first view for real users)
// More on static prerendering: https://docs.layer0.co/guides/static_prerendering
router.prerender(getPrerenderRequests)

// Serve the old Layer0 predefined routes by the latest prefix
router.match('/__xdn__/:path*', ({ redirect }) => {
  redirect('/__layer0__/:path*', 301)
})

// API (Any backend) caching
router.match('/l0-api/:path*', API_CACHE_HANDLER)

// Image caching
router.match('/l0-opt', IMAGE_CACHE_HANDLER)

router.get('/service-worker.js', ({ serviceWorker }) => {
  return serviceWorker('.nuxt/dist/client/service-worker.js')
})

// Only compiled with 0 build / 0 deploy
if (isProductionBuild()) {
  // Cache but not in 0 dev mode
  router.match('/', EDGE_CACHE_HANDLER)
  router.match('/about', EDGE_CACHE_HANDLER)
  router.match('/commerce', EDGE_CACHE_HANDLER)
  router.match('/product/:name', EDGE_CACHE_HANDLER)
  router.match('/commerce/:name', EDGE_CACHE_HANDLER)
}

// Fallback in case any request is not served by any routes above will be handled by default routes
router.use(nuxtRoutes)

export default router
