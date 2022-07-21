<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-col" :key="value" v-for="(item, value, index) in listingItems">
      <h2 class="text-white text-lg font-medium" :class="{ 'mt-10': index > 0 }">
        {{ value }}
      </h2>
      <NuxtLink :key="subItem.name" :to="subItem.route" v-for="subItem in item">
        <h3
          class="text-md mt-2"
          :class="{ 'font-medium text-[#FFFFFF]': $route.path === subItem.route, 'font-light text-[#FFFFFF75]': $route.path !== subItem.route }"
        >
          {{ subItem.name }}
        </h3>
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
            name: 'Joggers',
            route: '/commerce/joggers',
          },
          {
            name: 'Jackets',
            route: '/commerce/jackets',
          },
          {
            name: 'T-Shirts',
            route: '/commerce/t-shirts',
          },
          {
            name: 'Shop All',
            route: '/commerce/shop-all',
          },
        ],
      },
    }
  },
}
</script>
