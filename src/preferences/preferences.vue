<template>
  <form @submit.prevent="">
    <nav class="viewAs">
      <label>{{strings.viewAs}}</label>
      <router-link  class="toggleBtn btn_list"
        :disabled="!isListView" 
        :event="!isListView ? 'click' : ''"
        :data-pressed="isListView"
        to="/"
      ><ListIcon /><span> {{strings.viewList}}</span></router-link>
      <router-link  class="toggleBtn btn_table"
        :disabled="isListView" 
        :event="isListView ? 'click' : ''"
        :data-pressed="!isListView"
        to="/compare"
      ><GridIcon /><span> {{strings.viewTable}}</span></router-link>
    </nav>
    <div class="sortBy">
      <label>{{strings.sortBy}}</label>
      <select @change="updateOrder($event.target)" class="sortBy_field">
        <option value= "popularity">{{strings.sortPopularity}}</option>
        <option value= "price-asc">{{strings.sortPriceAsec}}</option>
        <option value= "price-desc">{{strings.sortPriceDesc}}</option>
        <option value= "kcal-asc">{{strings.sortkCalAsec}}</option>
        <option value= "kcal-desc">{{strings.sortkCalDesc}}</option>
        <option value= "servings-asc">{{strings.sortServingsAsec}}</option>
        <option value= "servings-desc">{{strings.sortServingsDesc}}</option>
      </select>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
import i18n from '../i18n';

import { SearchQuery, OrderOptions } from '../filters/SearchQuery';
import GridIcon from '../icons/grid.vue';
import ListIcon from '../icons/list.vue';

export default defineComponent({
  name: "FilterBar",
  components: { GridIcon, ListIcon },
  setup() {
    const route = useRoute();

    const isListView = computed(()=>(route.name === "List"));
    const query: Partial<SearchQuery> = {};

    const store = useStore();
    const count = computed(() => store.state.products.items.length);
    

    function refresh() {
      store.dispatch('products/query', query);
    }

    function updateOrder(dropdown: HTMLSelectElement) {
      query.order = dropdown.value as OrderOptions;
      refresh();
    }

    refresh();
      return {
        strings: i18n.strings,
        isListView,
        refresh,
        count,
        store,
        updateOrder
      };
    }
});

</script>

<style scoped lang="scss">
  form,
  .viewAs {
    align-items: center;
    justify-content: flex-end;
    display: flex;
    gap: 1rem;
  }

  .viewAs {
    margin-right: 1rem;
  }

  .btn_list,
  .btn_table {
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2rem;
    display: inline-flex;
    height: 4rem;
    place-content: center;
    width: 4rem;

    span {
      display: none;
    }
  }

  .sortBy_field {
    appearance: none;       /* Remove default arrow */
    background-image: url(../assets/arrow-down.svg);   /* Add custom arrow */
    background-repeat: no-repeat;
    background-position: right 1rem center;
    height: 4rem;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    width: 18rem;

  }
</style>