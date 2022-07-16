<template>
  <div v-if="data" class="flex-col items-center justify-start">
    <div class="mb-5 flex w-full flex-row items-start px-5">
      <div class="hidden w-[15%] pt-5 md:block">
        <LeftSideBar />
      </div>
      <div class="flex w-full flex-col items-start pt-5 md:w-[70%]">
        <h2 class="text-[#FFFFFF75]">Showing {{ data.length }} Results</h2>
        <div class="mt-5 flex flex-row flex-wrap items-start">
          <Prefetch :key="item.path" v-for="item in data" :url="`/l0-api/products/${item.path.replace(/\//g, '')}`">
            <NuxtLink :to="`/product/${item.path.replace(/\//g, '')}`" class="relative mt-2 w-full border border-white p-1 sm:w-1/2 md:w-1/3">
              <div class="absolute top-0 left-0 z-10 flex flex-col items-start">
                <h3 class="bg-white py-2 px-4 text-xl font-medium text-black">{{ item.name }}</h3>
                <h4 class="text-md bg-white py-2 px-4 text-black">{{ item.prices.price.value }} {{ item.prices.price.currencyCode }}</h4>
              </div>
              <HeartIcon className="absolute top-0 right-0 h-[30px] w-[30px] bg-white p-2" />
              <img width="1200" height="1200" loading="lazy" :src="getImage(item.images[0].url)" />
            </NuxtLink>
          </Prefetch>
        </div>
      </div>
      <div class="hidden w-[15%] pt-5 md:block">
        <RightSideBar />
      </div>
    </div>
  </div>
</template>

<script>
import { Prefetch } from '@layer0/vue'
import { relativizeURL } from '../lib/helper'
import HeartIcon from '../components/HeartIcon.vue'
import LeftSideBar from '../components/LeftSideBar.vue'
import RightSideBar from '../components/RightSideBar.vue'

export default {
  components: {
    Prefetch,
    HeartIcon,
    LeftSideBar,
    RightSideBar,
  },
  methods: {
    getImage: (url) => relativizeURL(url),
  },
  async asyncData({ req, redirect }) {
    let link = undefined
    let data = undefined
    // If in browser (i.e. on client side)
    if (typeof window !== 'undefined') {
      link = window.location.origin
    }
    // If on server side (either on Layer0 or on local)
    else {
      let hostURL = req ? req.headers.host : process.env.API_URL
      // You have access to req.headers.host when running npm run dev
      // You have access to process.env.API_URL on Layer0 env after deployment, but there is no req header
      // Why's that? It's an added benefit of being on Layer0, as the project is compiled with target: 'static',
      // Which removes the req object from asyncData in nuxt to produce a full static application.
      // This rather is the beauty to ISG with Nuxt.js and Layer0, that you can combine full static site with
      // server side capabilities
      if (hostURL) {
        hostURL = hostURL.replace('http://', '')
        hostURL = hostURL.replace('https://', '')
        if (hostURL.includes('localhost:')) {
          link = `http://${hostURL}`
        } else {
          link = `https://${hostURL}`
        }
      }
    }
    let resp = await fetch(`${link}/l0-api/products/all`)
    if (!resp.ok) {
      redirect(404, '/error')
    } else {
      data = await resp.json()
    }
    return { data }
  },
}
</script>
