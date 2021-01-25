<template>
  <table class="tableView" cellspacing="0">
    <thead>
      <th colspan="2">{{strings.name}}</th>
      <th>{{strings.price}}</th>
      <th>{{strings.servings}}</th>
      <th :title="strings.kCal"><CaloriesIcon /></th>
      <th class="boolCol" :title="strings.lowSugar"><SugarIcon /></th>
      <th class="boolCol" :title="strings.lowFat"><HeartIcon /></th>
      <th class="boolCol" :title="strings.glutenFree"><GlutenIcon /></th>
      <th class="boolCol" :title="strings.nutFree"><NutIcon /></th>
      <th  :title="strings.kosherParve"><KosherIcon /></th>
      <th class="boolCol" :title="strings.vegetarian"><VegetarianIcon /></th>
      <th class="boolCol" :title="strings.vegan"><VeganIcon /></th>
    </thead>
    <tbody>
    <TableViewItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex';
import i18n from '../i18n';
import TableViewItem from './TableViewItem.vue';

import SugarIcon from '../icons/sugar.vue';
import HeartIcon from '../icons/heart.vue';
import GlutenIcon from '../icons/gluten-free.vue';
import NutIcon from '../icons/nut-free.vue';
import KosherIcon from '../icons/kosher.vue';
import VegetarianIcon from '../icons/vegetarian.vue';
import VeganIcon from '../icons/vegan.vue';
import CaloriesIcon from '../icons/kcal.vue';

export default {
  name: 'ListView',
  components: {
    TableViewItem,
    SugarIcon,
    HeartIcon,
    GlutenIcon,
    NutIcon,
    KosherIcon,
    VegetarianIcon,
    VeganIcon,
    CaloriesIcon
  },

  setup() {
    const store = useStore();
    const products = computed(() => store.state.products.items);

    return {
      strings: i18n.strings,
      products,
      store
    }
  }
};
</script>

<style scoped lang="scss">
@import "../controls/common";

.tableView {
  border: 1px solid $clr-border;
  margin: 2.1rem 1rem 0;
  width: 100%;
}

th {
  border-bottom: 1px solid $clr-border;
}

th {
  font-weight: 100;
  line-height: 1rem;
  padding-top: 0.75rem;

  &[title] {
    cursor: help;
  }
}

tr:not(:nth-child(2n)) {
  background-color: rgba(0,0,0, 0.1);
}

td {
  padding: 0.5rem;
}

.boolCol {
  width: 3rem;
}
</style>
