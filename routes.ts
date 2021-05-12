// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'
import { nuxtRoutes } from '@layer0/nuxt'
import { API_CACHE_HANDLER, SSR_CACHE_HANDLER } from './layer0/cache'
import getPrerenderRequests from './layer0/getPrerenderRequests'

export default new Router()
  // @ts-ignore
  .prerender(getPrerenderRequests)
  .match('/api/:build_id/:path*', API_CACHE_HANDLER)
  .match('/category/:name', SSR_CACHE_HANDLER)
  .match('/product/:name', SSR_CACHE_HANDLER)
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .use(nuxtRoutes)
