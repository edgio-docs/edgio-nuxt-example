<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-col" :key="item" v-for="(item, value, index) in listingItems">
      <h2 class="text-white text-lg font-medium" :class="{ 'mt-10': index > 0 }">
        {{ value }}
      </h2>
      <NuxtLink :key="subItem.name" :to="subItem.route" v-for="subItem in item">
        <h3 class="text-md mt-2 font-light text-[#FFFFFF75]">{{ subItem.name }}</h3>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      listingItems: {
        'All Categories': [
          {
            name: 'Apparel',
            route: '/commerce/apparel',
          },
          {
            name: 'Shop All',
            route: '/commerce/shop-all',
          },
        ],
        'All Designers': [
          {
            name: 'Sagaform',
            route: '/commerce/sagaform',
          },
          {
            name: 'OFS',
            route: '/commerce/ofs',
          },
          {
            name: 'ACME',
            route: '/commerce/acme',
          },
        ],
      },
    }
  },
}
</script>
