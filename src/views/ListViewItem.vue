<template>
  <li class="product">
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
    <div class="product_info">
      <span v-if="product.dietaryOptions.glutenFree" :title="strings.glutenFree"><GlutenIcon /></span>
      <span v-if="product.dietaryOptions.nutFree" :title="strings.nutFree"><NutIcon /></span>
      <span v-if="product.dietaryOptions.kosher" :title="strings.kosherParve"><KosherIcon /></span>
      <span v-if="product.dietaryOptions.vegetarian" :title="strings.vegetarian"><VegetarianIcon /></span>
      <span v-if="product.dietaryOptions.vegan" :title="strings.vegan"><VeganIcon /></span>
      <span v-if="product.nutrition.lowSugar" :title="strings.lowSugar"><SugarIcon /></span>
      <span v-if="product.nutrition.lowFat" :title="strings.lowFat"><HeartIcon /></span>
      <span v-if="product.nutrition.kCalPerServing < 500" :title="strings.kCalPerServing"><CaloriesIcon /></span>
    </div>
    <div class="product_summary">
      <div class="product_name">{{ product.name }}</div>
      <div class="price_beforeDiscount" v-if="product.discount">{{product.priceBeforeDiscount}}</div>
      <div class="product_cost">{{ product.price }}</div>
      <div class="product_serves"><span>Serves: </span><span>{{ product.servings }}</span></div>
    </div>
  </li>
</template>

<script lang="ts">
import { computed , defineComponent} from 'vue';
import { useStore } from "vuex";
import { Product } from '../products/Product';
import i18n from "../i18n";

import BasketIcon from '../icons/basket.vue';
import SugarIcon from '../icons/sugar.vue';
import HeartIcon from '../icons/heart.vue';
import GlutenIcon from '../icons/gluten-free.vue';
import NutIcon from '../icons/nut-free.vue';
import KosherIcon from '../icons/kosher.vue';
import VegetarianIcon from '../icons/vegetarian.vue';
import VeganIcon from '../icons/vegan.vue';
import CaloriesIcon from '../icons/kcal.vue';

export default defineComponent({
  name: "ListViewItem",
  props: ["product"],
  components: {
    BasketIcon,
    SugarIcon,
    HeartIcon,
    GlutenIcon,
    NutIcon,
    KosherIcon,
    VegetarianIcon,
    VeganIcon,
    CaloriesIcon
  },
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

.product {
  border: 1px solid $clr-border;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover .product_image img {
    filter: saturate(0.75);
    transform: scale(1.1);
  }
}

.product_outOfStock {
  &:before {
    content: "Out of Stock";
    font-size: 2rem;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .product_image,
  .product_summary {
    opacity: 0.5;
  }
}

.product_actions {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  top: 0;
  padding: 0.5rem;
  position: absolute;
  width: 100%;
}

.product_action {
  align-items :center;
  background-color: var(--nc-bg-1);
  border: 2px solid transparent;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  cursor:pointer;
  height: 3rem;
  outline: none;
  transition: transform 0.25s ease-in-out, border 0.25s ease-in-out;
  width: 3rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  span {
    display: none;
  }

  &.product_addBasket {
    position: relative;

    svg {
      height: 2rem;
      width: 2rem;
    }
  }

  &:active,
  &:focus {
    border-color: var(--nc-lk-tx);
  }
  &:hover,
  &:active  {
    transform: scale(1.1);
  }
}

.product_info {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  position: absolute;
  top: 20rem;

  span {
    align-items: center;
    background-color: var(--nc-bg-1);
    border: 1px solid var(--nc-lk-1);
    box-shadow: 0 3px 3px $clr-shadow;
    border-radius: 50%;
    cursor: help;
    display: inline-flex;
    justify-content: center;
    height: 2rem;
    width: 2rem;
  }
}

.product_summary {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.4rem;
  gap: 0.5rem;
  padding: 0.5rem;
}

.product_name {
  color: var(--nc-tx-2);
  font-size: 1.6rem;
  line-height: 1.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}

.price_beforeDiscount,
.product_cost {
  color: var(--nc-tx-2);
  flex: 0 0 3rem;
  font-weight: bold;

  &:before {
    content: "£";
  }
}

.price_beforeDiscount{
  text-decoration: line-through;
  opacity: 0.5;
}

.product_serves {
  flex: 1 1 auto;
  text-align: right;
}

.product_image {
  display: flex;
  flex: 0 0 23rem;
  margin: 0 0 1rem;
  overflow: hidden;
  place-items: center;
  width: 23rem;

  img {
    filter: saturate(1);
    transition: transform 0.25s ease-in-out, filter 0.25s ease-in-out;
    width: 100%;
  }
}

.product_add {
  font-size: 1rem;
  display: inline-block;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  background: var(--nc-lk-1);
  color: var(--nc-lk-tx);
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--nc-lk-tx);
}
</style>
