<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-col" :key="value" v-for="(item, value, index) in listingItems">
      <h2 class="text-white text-lg font-medium" :class="{ 'mt-10': index > 0 }">
        {{ value }}
      </h2>
      <a
        :key="subItem.name"
        v-for="subItem in item"
        @click="pushFilter(subItem.filter)"
        class="text-md mt-2 cursor-pointer"
        :class="{
          'font-medium text-[#FFFFFF]': $route.query.filter === subItem.filter,
          'font-light text-[#FFFFFF75]': $route.query.filter !== subItem.filter,
        }"
      >
        {{ subItem.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      listingItems: {
        Relevance: [
          {
            name: 'Trending',
            filter: 'trending',
          },
          {
            name: 'Price: Low to High',
            filter: 'price-low-to-high',
          },
          {
            name: 'Price: High to Low',
            filter: 'price-high-to-low',
          },
        ],
      },
    }
  },
  methods: {
    pushFilter(filter) {
      this.$router.push({ path: this.$route.path, query: { filter } })
    },
  },
}
</script>
