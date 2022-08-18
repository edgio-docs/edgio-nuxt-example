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
    Layer0RUM('1f41ba2b-dc10-4935-8d7d-62ac857a4d63')
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Layer0
    installDevtools()
  },
}
</script>
