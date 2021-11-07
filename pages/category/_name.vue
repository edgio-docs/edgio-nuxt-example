<script lang="ts">
import { getProductsByCategory, getApiPath } from '../../lib/cms'
import Rating from '../../components/Rating.vue'
const { Prefetch } = require('@layer0/vue')

export default {
  components: {
    Rating,
    Prefetch,
  },
  async asyncData({ params }: { params: any }) {
    const products = await getProductsByCategory(params.name)

    return { products }
  },
  methods: {
    getApiPath,
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div class="mt-10 grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.name">
        <Prefetch :url="getApiPath(product.href)">
          <NuxtLink :to="product.href">
            <div class="relative flex flex-col items-center">
              <div
                class="pb-2/3 bg-contain bg-center bg-no-repeat h-48 w-48"
                :style="{ 'background-image': 'url(' + product.picture + ')' }"
              />
              <div class="text-center lowercase font-bold">
                {{ product.name }}
              </div>
              <Rating :value="Number(product.rating)" />
              <p class="text-center">${{ product.price }}</p>
            </div>
          </NuxtLink>
        </Prefetch>
      </div>
    </div>
  </div>
</template>
