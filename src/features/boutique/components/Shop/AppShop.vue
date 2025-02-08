<script setup lang="ts">
import type { FiltersInterface, FilterUpdate, ProductInterface } from '@/interfaces'
import AppShopProductList from './AppShopProductList.vue'
import AppShopFilters from './AppShopFilters.vue'
import AppCalc from '@/components/AppCalc.vue'
import { ref } from 'vue'

const open = ref<boolean>(!matchMedia('(max-width: 575px)').matches)
const isMobile = ref<boolean>(matchMedia('(max-width: 575px)').matches)

defineProps<{
  products: ProductInterface[]
  filters: FiltersInterface
  moreResults: boolean
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
  (e: 'updateFilter', updateFilter: FilterUpdate): void
  (e: 'incPage'): void
}>()
</script>

<template>
  <div class="d-flex flex-row shop-container">
    <AppCalc :open="isMobile && open" @close="open = false" :transparent="true" />
    <Transition>
      <AppShopFilters
        v-if="open"
        :filters="filters"
        :nbr-of-products="products.length"
        @update-filter="emit('updateFilter', $event)"
        class="shop-filter"
      />
    </Transition>

    <div class="d-flex flex-column">
      <button
        @click="open = !open"
        class="btn btn-primary d-flex flex-row justify-content-center align-items-center"
      >
        <i class="fa-solid fa-magnifying-glass mr-10"></i>
        <span>Rechercher</span>
      </button>
      <AppShopProductList
        class="flex-fill scrollable"
        @add-product-to-cart="emit('addProductToCart', $event)"
        @inc-page="emit('incPage')"
        :products="products"
        :more-results="moreResults"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';
.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}

button {
  margin: 20px 20px 10px 20px;
  @include mixins.sm {
    display: none;
  }
}

.shop-container {
  position: relative;
}

.shop-filter {
  flex: 0 0 200px;
  @include mixins.xs {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: white;
    z-index: 2;
  }
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
</style>
