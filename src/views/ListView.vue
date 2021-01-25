<template>
  <ul class="listView">
    <ListViewItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex';
import ListViewItem from './ListViewItem.vue';

export default {
  name: 'ListView',

  setup() {
    const store = useStore();
    const products = computed(() => store.state.products.items);

    return {
      ListViewItem,
      products,
      store
    }
  }
};
</script>

<style scoped lang="scss">
.listView {
  display: grid;
  justify-content: flex-start;
  grid-template-columns: repeat(auto-fit, 23rem);
  grid-template-rows: repeat(auto-fit, 30rem);
  grid-gap: 15px;
  list-style: none;
  margin: 5rem 0 0;
  padding: 0 1rem;
}
</style>
