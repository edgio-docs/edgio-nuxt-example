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
              <img v-if="item.images" width="1200" height="1200" loading="lazy" :src="getImage(item.images[0].url)" />
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
import HeartIcon from '../components/HeartIcon.vue'
import LeftSideBar from '../components/LeftSideBar.vue'
import RightSideBar from '../components/RightSideBar.vue'
import { relativizeURL, getOrigin, filterProducts } from '../lib/helper'

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
  watchQuery: (newVal, oldVal) => {
    return newVal.filter !== oldVal.filter
  },
  async asyncData({ req, params, query, redirect }) {
    let data = undefined
    let resp = await fetch(`${getOrigin(req)}/l0-api/products/all`)
    if (!resp.ok) {
      redirect(404, '/error')
    } else {
      data = await resp.json()
      if (params.name === 'jackets') {
        data = data.filter((i) => i.name.toLowerCase().includes('jacket'))
      } else if (params.name === 't-shirts') {
        data = data.filter((i) => i.name.toLowerCase().includes('t-shirt'))
      } else if (params.name === 'joggers') {
        data = data.filter((i) => i.name.toLowerCase().includes('jogger'))
      }
    }
    data = filterProducts(data, query.filter)
    return { data }
  },
}
</script>
