<template>
  <tr class="product">
    <td class="product_actions">
      <button
        data-task="add"
        class="product_action product_addBasket"
        @click="addToCart(product)"
      >
        <span>Add to basket</span>
      </button>
    </td>
    <td class="product_image_col">
      <img
        class="product_image"
        :src="product.images[0].src"
        :alt="product.images[0].alt"
      />
    </td>
    <td class="product_name">{{ product.name }}</td>
    <td class="product_cost">{{ product.price }}</td>
    <td class="product_servings">{{ product.servings }}</td>
    <td class="product_kCalPerServing">{{ product.nutrition.kCalPerServing }}</td>
    <td class="product_lowSugar"><CheckIcon v-if="product.lowSugar" />&nbsp;</td>
    <td class="product_lowFat"><CheckIcon v-if="product.nutrition.lowFat" />&nbsp;</td>
    <td class="product_glutenFree"><CheckIcon v-if="product.dietaryOptions.glutenFree" />&nbsp;</td>
    <td class="product_nutFree"><CheckIcon v-if="product.dietaryOptions.nutFree" />&nbsp;</td>
    <td class="product_kosher">{{ product.dietaryOptions.kosher }}</td>
    <td class="product_vegetarian"><CheckIcon v-if="product.dietaryOptions.vegetarian" />&nbsp;</td>
    <td class="product_vegan"><CheckIcon v-if="product.dietaryOptions.vegan" />&nbsp;</td>
  </tr>
</template>
<script lang="ts">
import i18n from "../i18n";
import { Product } from '../products/Product';
import store from "../store";

import CheckIcon from '../icons/check.vue';

export default {
  name: "ListViewItem",
  props: ["product"],
  components: { CheckIcon }, 
  setup(){
    const strings = i18n.strings;
    function addToCart(product: Product) {
      store.dispatch("cart/addItem", product);
    }

    return {
      addToCart,
      strings
    }
  }
}
</script>

<style scoped lang="scss">
@import "../controls/common";

.product_kosher {
  text-transform: capitalize;
}

tr:not(:last-child) td {
  border-bottom: 1px solid $clr-border;
}

td {
  padding: 0.5rem;

  &:not(:last-child) {
    border-right: 1px solid $clr-border;
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
  &,
  &:hover,
  &:focus,
  &:active {
    background-color: var(--nc-bg-1);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid var(--nc-lk-tx);
    border-radius: 50%;
    display: inline-block;
    cursor:pointer;
    outline: none;
    height: 3rem;
    width: 3rem;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    span {
      display: none;
    }

    &.product_addBasket {
      &,
      &:hover,
      &:focus {
        background-image: url(../assets/add-to-basket.svg);
      }
    }
  }
}

.product_summary {
  display: flex;
  justify-content: space-between;
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
  vertical-align: middle;
  text-align: center;
}

.product_image {
  height: 4rem;
  display: inline-block;
  width: 4rem;
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
