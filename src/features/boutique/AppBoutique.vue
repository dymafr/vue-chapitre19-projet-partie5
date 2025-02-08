<script setup lang="ts">
import AppShop from './components/Shop/AppShop.vue'
import AppCart from './components/Cart/AppCart.vue'
import { computed, provide, ref, watch, watchEffect } from 'vue'
import type {
  FiltersInterface,
  FilterUpdate,
  ProductCartInterface,
  ProductInterface,
} from '../../interfaces'
import { DEFAULT_FILTERS } from './data/filters'
import { fetchProduct } from '@/shared/services/product.service'
import { pageKey } from '@/shared/injectionKeys/pageKey'

const products = ref<ProductInterface[]>([])
const cart = ref<ProductCartInterface[]>([])
const filters = ref<FiltersInterface>({ ...DEFAULT_FILTERS })
const page = ref<number>(1)
const isLoading = ref<boolean>(true)
const moreResults = ref<boolean>(true)

watch([() => filters.value.priceRange, () => filters.value.category], () => {
  page.value = 1
  products.value = []
})

provide(pageKey, page)

watchEffect(async () => {
  isLoading.value = true
  const fetchedProducts = await fetchProduct(filters.value, page.value)
  if (Array.isArray(fetchedProducts)) {
    products.value = [...products.value, ...fetchedProducts]
    if (fetchedProducts.length < 20) {
      moreResults.value = false
    }
  } else {
    products.value = [...products.value, fetchedProducts]
  }
  isLoading.value = false
})

function addProductToCart(productId: string): void {
  const product = products.value.find((product) => product._id === productId)
  if (product) {
    const productInCart = cart.value.find((product) => product._id === productId)
    if (productInCart) {
      productInCart.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }
}

function removeProductFromCart(productId: string): void {
  const productFromCart = cart.value.find((product) => product._id === productId)
  if (productFromCart) {
    if (productFromCart.quantity === 1) {
      cart.value = cart.value.filter((product) => product._id !== productId)
    } else {
      productFromCart.quantity--
    }
  }
}

function updateFilter(filterUpdate: FilterUpdate) {
  if (filterUpdate.search !== undefined) {
    filters.value.search = filterUpdate.search
  } else if (filterUpdate.priceRange) {
    filters.value.priceRange = filterUpdate.priceRange
  } else if (filterUpdate.category) {
    filters.value.category = filterUpdate.category
  } else {
    filters.value = { ...DEFAULT_FILTERS }
  }
}

const cartEmpty = computed(() => cart.value.length === 0)

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    if (product.title.toLocaleLowerCase().startsWith(filters.value.search.toLocaleLowerCase())) {
      return true
    } else {
      return false
    }
  })
})
</script>

<template>
  <div class="d-flex flex-column">
    <AppShop
      @update-filter="updateFilter"
      @add-product-to-cart="addProductToCart"
      @inc-page="page++"
      :products="filteredProducts"
      :filters="filters"
      :more-results="moreResults"
    />
    <AppCart v-if="!cartEmpty" :cart="cart" @remove-product-from-cart="removeProductFromCart" />
  </div>
</template>

<style scoped lang="scss"></style>
