export const API_CACHE_HANDLER = ({ cache, proxy, removeUpstreamResponseHeader }) => {
  removeUpstreamResponseHeader('set-cookie')
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
      // Cache responses even if they contain cache-control: private header
      // https://docs.layer0.co/guides/caching#private
      // https://docs.layer0.co/docs/api/core/interfaces/_router_cacheoptions_.edgecacheoptions.html#forceprivatecaching
      forcePrivateCaching: true,
    },
    browser: {
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
  proxy('api', { path: ':path*' })
}

export const EDGE_CACHE_HANDLER = ({ cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
    },
    browser: {
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
}

export const STATIC_CACHE_CONFIG = {
  browser: {
    serviceWorkerSeconds: 60 * 60 * 24 * 365,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    forcePrivateCaching: true,
  },
}
