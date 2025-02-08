<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

// seed('vueprojectproducts');
// seed40articles('vueprojectproducts');
</script>

<template>
  <div class="app-container">
    <AppHeader class="header" />
    <div class="app-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </template>
      </router-view>
    </div>
    <AppFooter class="footer hide-xs" />
  </div>
</template>

<style lang="scss">
@use './assets/scss/base.scss';
@use './assets/scss/debug.scss';

.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}

.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>
