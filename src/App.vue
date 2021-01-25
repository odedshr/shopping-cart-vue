<template>
  <main class="grid-container">
    <header class="hero">
      <div class="topBar">
        <h1 class="appTitle">Casa <sub>de</sub> Olaf</h1>
        <Cart />
      </div>
      <div class="breadcrumbs"><a href="#">home</a> / <a href="#">products</a> / <a href="#">delivery</a></div>
      <h2 class="pageTitle">Products for Delivery</h2>
    </header>
    <Filters class="filters" />
    <Preferences class="preferences" />
    <router-view class="content"/>
  </main>
</template>

<script lang="ts">
  import Filters from './filters/filters.vue';
  import Preferences from './preferences/preferences.vue';
  import Cart from './cart/Cart.vue'

  export default {
    components: { Filters, Cart, Preferences }
  };
</script>

<style lang="scss">
#app {
  padding: 1rem;
  margin: 0 2rem;

  @media screen and (min-width: 1000px) {
    margin: 0 calc((50vw - 50rem));
  }
}

.grid-container {
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: 32rem 4rem 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "hero hero"
    "filters preferences"
    "filters content";
}

.hero {
  grid-area: hero;
  display: flex;
  flex-direction: column;
}

.topBar {
  align-items: center;
  border-bottom: 1px solid var(--nc-tx-1);
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.filters { grid-area: filters; }
.preferences { grid-area: preferences; }
.content { grid-area: content; }

.appTitle {
  font-size: 3rem;
  font-weight: 500;
  margin: 0;
  line-height: 3rem;
  text-transform: uppercase;

  sub {
    vertical-align: baseline;
    font-size: 1.6rem;
  }
}

.breadcrumbs a {
  color: var(--nc-lk-2);
  font-size: 1.4rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.pageTitle {
  flex: 1 1 auto;
  place-content: center;
  display: flex;
  align-items: center;
  font-size: 4.6rem;
  font-weight: 100;
}
</style>
