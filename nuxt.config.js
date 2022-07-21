export default {
  head: {
    title: 'layer0-nuxt-example',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  },
  components: true,
  css: ['@/assets/css/main.css'],
  buildModules: ['@nuxt/postcss8', '@layer0/nuxt/module'],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'Commerce',
        path: '/commerce/:name',
        component: resolve(__dirname, 'pages/commerce.vue'),
      })
    },
  },
}
