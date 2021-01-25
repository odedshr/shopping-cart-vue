<template>
  <form @submit.prevent="">
    <h3 class="filters_title">Show only</h3>
    <div class="filters_copy">Select all that applies</div>

    <section>
      <h4>Category</h4>
      <MultiSelect class="filter-type"
        :items="allTypes"
        :value="types"
        @update="updateTypes"
      />    
    </section>
    
    <section>
      <h4>Dietary requirement</h4>
      <Checkbox value="lowSugar" :checked="false" @update="updateBooleanFilter"><SugarIcon /><span>{{strings.lowSugar}}</span></Checkbox>
      <Checkbox value="lowFat" :checked="false" @update="updateBooleanFilter"><HeartIcon /><span>{{strings.lowFat}}</span></Checkbox>
      <Checkbox value="glutenFree" :checked="false" @update="updateBooleanFilter"><GlutenIcon /><span>{{strings.glutenFree}}</span></Checkbox>
      <Checkbox value="nutFree" :checked="false" @update="updateBooleanFilter"><NutIcon /><span>{{strings.nutFree}}</span></Checkbox>
      <Checkbox value="kosherParve" :checked="false" @update="updateBooleanFilter"><KosherIcon /><span>{{strings.kosherParve}}</span></Checkbox>
      <Checkbox value="vegetarian" :checked="false" @update="updateBooleanFilter"><VegetarianIcon /><span>{{strings.vegetarian}}</span></Checkbox>
      <Checkbox value="vegan" :checked="false" @update="updateBooleanFilter"><VeganIcon /><span>{{strings.vegan}}</span></Checkbox>
      <Checkbox value="kCalPerServing" :checked="false" @update="updateBooleanFilter"><CaloriesIcon /><span>{{strings.kcal}}</span></Checkbox>
    </section>

    <section>
      <h4>Servings</h4>
      <div>
        <input type="number" class="numberField" :max="maxServing" v-model="minServing" @change="updateServing">
        to
        <input type="number" class="numberField" :min="minServing" v-model="maxServing" @change="updateServing">
        people
      </div>
    </section>

    <section>
      <h4>Delivery</h4>
      <Checkbox value="nextDayDelivery" :checked="false" @update="updateBooleanFilter" data-theme="mute"><CheckboxIcon /><span>{{strings.nextDayDelivery}}</span></Checkbox>
      <Checkbox value="homeFreezing" :checked="false" @update="updateBooleanFilter" data-theme="mute"><CheckboxIcon /><span>{{strings.homeFreezing}}</span></Checkbox>
      <Checkbox value="inStock" :checked="false" @update="updateBooleanFilter" data-theme="mute"><CheckboxIcon /><span>{{strings.inStock}}</span></Checkbox>
    </section>

    <section>
      <h4>Personalization</h4>
      <Checkbox value="personalized" :checked="false" @update="updateBooleanFilter" data-theme="mute"><CheckboxIcon /><span>{{strings.personalized}}</span></Checkbox>
      <Checkbox value="specialMessage" :checked="false" @update="updateBooleanFilter" data-theme="mute"><CheckboxIcon /><span>{{strings.specialMessage}}</span></Checkbox>
    </section>
  </form>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import i18n from '../i18n';
import { SearchQuery, QueryFilter } from '../filters/SearchQuery';
import { KeyValue } from '../controls/key-value';
import MultiSelect from '../controls/multi-select.vue';
import Checkbox from '../controls/checkbox.vue'
import SugarIcon from '../icons/sugar.vue';
import HeartIcon from '../icons/heart.vue';
import GlutenIcon from '../icons/gluten-free.vue';
import NutIcon from '../icons/nut-free.vue';
import KosherIcon from '../icons/kosher.vue';
import VegetarianIcon from '../icons/vegetarian.vue';
import VeganIcon from '../icons/vegan.vue';
import CaloriesIcon from '../icons/kcal.vue';
import CheckboxIcon from '../icons/checkbox.vue';

import { getProductTypes } from '../products/products.data-provider';

export default defineComponent({
  name: "FilterBar",
  components: {
    MultiSelect,
    Checkbox,
    SugarIcon,
    HeartIcon,
    GlutenIcon,
    NutIcon,
    KosherIcon,
    VegetarianIcon,
    VeganIcon,
    CaloriesIcon,
    CheckboxIcon
  },
  setup() {
    const allTypes = ref([] as {key: string; value: string}[]);
    const types = ref([] as string[]);
    const minServing = ref(1);
    const maxServing = ref(12);
    const query: Partial<SearchQuery> = {};

    const store = useStore();
    const count = computed(() => store.state.products.items.length);
    
    (async function getTypes() {
      allTypes.value = (await getProductTypes()).map(type=>({key: type,value: type}));
    })();

    function refresh() {
      store.dispatch('products/query', query);
    }

    function updateTypes(newTypes: string[]) {
      types.value = newTypes;
      query.types = newTypes;
      refresh();
    }

    function updateServing() {
      query.minServing = minServing.value;
      query.maxServing = maxServing.value;
      refresh();
    }

    function updateBooleanFilter(item: KeyValue) {
      query[item.key as unknown as QueryFilter] = (item.value as unknown as boolean);
      refresh();
    }

    refresh();
      return {
        strings: i18n.strings,
        minServing,
        maxServing,
        allTypes,
        types,
        refresh,
        updateServing,
        updateTypes,
        updateBooleanFilter,
        count,
        store
      };
    }
});

</script>

<style scoped lang="scss">
  .filters_title {
    border-bottom: 1px solid var(--nc-tx-2);
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  .filter-type {
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  h4 {
    margin: 0;
  }
  
  section {
    margin: 1rem 0 2rem;
  }

  .numberField {
    height: 3rem;
    text-align: right;
    width: 4.5rem;
  }

  .checkbox {
    span {
      display: block;
      height: 2rem;
    }

    svg {
      height: 1.5rem;
      margin-right: 1rem;
      width: 1.5rem;
    }
  } 
</style>