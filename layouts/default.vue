<template>
  <div class="flex flex-col bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D] min-h-screen">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Layer0RUM from '@/layer0/rum.js'
import Header from '@/components/Header.vue'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

export default {
  components: {
    Header,
  },
  mounted: () => {
    // Monitor real user as it gets mounted
    Layer0RUM('a7990ffe-9ee9-478c-b94a-95489221ddd3')
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Layer0
    installDevtools()
  },
}
</script>
