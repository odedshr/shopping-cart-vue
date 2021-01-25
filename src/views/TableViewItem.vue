<template>
  <tr class="product">
    <td class="product_image_col">
      <figure class="product_image">
        <img
          :src="product.images[0].src"
          :alt="product.images[0].alt"
        />
      </figure>
      <div class="product_actions">
        <button
          class="product_action product_addBasket"
          @click="addToCart(product)"
        >
          <BasketIcon/>
          <span>Add to basket</span>
        </button>
        <div class="product_qty">{{count}}</div>
      </div>
    </td>
    <td class="product_name">{{ product.name }}</td>
    <td class="product_cost">{{ product.price }}</td>
    <td class="product_servings">{{ product.servings }}</td>
    <td class="product_kCalPerServing">{{ product.nutrition.kCalPerServing }}</td>
    <td class="product_lowSugar"><SugarIcon v-if="product.lowSugar" />&nbsp;</td>
    <td class="product_lowFat"><HeartIcon v-if="product.nutrition.lowFat" />&nbsp;</td>
    <td class="product_glutenFree"><GlutenIcon v-if="product.dietaryOptions.glutenFree" />&nbsp;</td>
    <td class="product_nutFree"><NutIcon v-if="product.dietaryOptions.nutFree" />&nbsp;</td>
    <td class="product_kosher">{{ product.dietaryOptions.kosher }}</td>
    <td class="product_vegetarian"><VegetarianIcon v-if="product.dietaryOptions.vegetarian" />&nbsp;</td>
    <td class="product_vegan"><VeganIcon v-if="product.dietaryOptions.vegan" />&nbsp;</td>
  </tr>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from "vuex";
import { Product } from '../products/Product';
import i18n from "../i18n";

import BasketIcon from '../icons/basket.vue';
import SugarIcon from '../icons/sugar.vue';
import HeartIcon from '../icons/heart.vue';
import GlutenIcon from '../icons/gluten-free.vue';
import NutIcon from '../icons/nut-free.vue';
import VegetarianIcon from '../icons/vegetarian.vue';
import VeganIcon from '../icons/vegan.vue';

export default defineComponent({
  name: "ListViewItem",
  props: ["product"],
  components: {
    BasketIcon,
    SugarIcon,
    HeartIcon,
    GlutenIcon,
    NutIcon,
    VegetarianIcon,
    VeganIcon }, 
  setup(props){
    const strings = i18n.strings;
    const store = useStore();
    const count = computed(() => store.state.cart[props.product.id]?.quantity || "+");
    function addToCart(product: Product) {
      store.dispatch("cart/addItem", product);
    }

    return {
      count,
      addToCart,
      strings
    }
  }
});
</script>

<style scoped lang="scss">
@import "../controls/common";

.product_kosher {
  text-transform: capitalize;
}

tr {
  height: 6rem;
  
  &:not(:last-child) td {
    border-bottom: 1px solid $clr-border;
  }
}

td {
  padding: 0.5rem;
}

.product_name {
  color: var(--nc-tx-2);
  font-size: 2rem;
}

.product_cost {
  color: var(--nc-tx-2);
  font-size: 1.6rem;

  &:before {
    content: "£";
  }
}

.product_cost,
.product_servings,
.product_kCalPerServing {
    text-align: right;
}

.product_lowSugar,
.product_lowFat,
.product_glutenFree,
.product_nutFree,
.product_vegetarian,
.product_vegan {
  text-align: center;;
}

.product_image_col {
  padding: 0.5rem;
  position: relative;
  text-align: center;
  vertical-align: middle;
}

.product_image {
  align-items: center;
  display: flex;
  height: 4rem;
  overflow: hidden;
  justify-content: center;
  padding: 0;
  margin: 0.5rem;
  width: 4rem;

  img {
    width: 100%;
  }
}

.product_actions {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  transform: scale(1);
  transition: transform 0.25s ease-in-out;

  tr:not(:hover) & {
    transform: scale(0);
  }
}
</style>
