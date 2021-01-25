<template>
  <tr class="cartItem">
    <td class="cartItem_imageTd">
      <img class="cartItem_image" :src="item.product.images[0].src" />
    </td>
    <td class="cartItem_name">{{ item.product.name }}</td>
    <td class="cartItem_cost">{{ item.product.price }}</td>
    <td class="cartItem_qty">
      <button class="cartItem_qty_dec" @click.stop="decrease(item.product)">
        -
      </button>
      <input class="cartItem_qty_field"
        type="number"
        :value="item.quantity"
        @change="updateQuantity({ ...item, quantity: +$event.target.value })"
      />
      <button class="cartItem_qty_inc" @click.stop="increase(item.product)">
        +
      </button>

      <button class="cartItem_remove_btn" @click.stop="remove(item.product)">
        <TrashIcon /><span>{{ strings.remove }}</span>
      </button>
    </td>
    <td class="cartItem_totalCost">
      {{ (item.quantity * item.product.price).toFixed(2) }}
    </td>
  </tr>
</template>

<script lang="ts">
import { Product } from "../products/Product";
import { CartItem} from './CartItem';
import store from "../store";
import i18n from "../i18n";

import TrashIcon from '../icons/trash.vue';

export default {
  name: 'CartRow',
  props: ["item"],
  setup() {
    function updateQuantity(cartItem: CartItem) {
      store.dispatch("cart/setQuantity", cartItem);
    }
    function increase(product: Product) {
      store.dispatch("cart/increaseItem", product);
    }

    function decrease(product: Product) {
      store.dispatch("cart/decreaseItem", product);
    }

    function remove(product: Product) {
      store.dispatch("cart/removeItem", product);
    }

    return {
      TrashIcon,
      strings: i18n.strings,
      updateQuantity,
      increase,
      decrease,
      remove
    }
  }
};
//  item!: CartItem;
</script>

<style scoped lang="scss">
td {
  border: none;
  color: var(--nc-tx-1);
  font-size: 1.6rem;
  vertical-align: top;
}

.cartItem_remove_btn {
  background: transparent;
  border: none;
  color: var(--nc-lk-2);
  display: inline-block;
  font-size: 1.2rem;
  text-transform: capitalize;
  text-decoration: underline;
  outline: var(--nc-lk-2);

  &:active {
    background-color: var(--nc-lk-2);
    text-decoration: none;
  }

  svg {
    height: 1rem;
    margin-right: 0.5rem;
    width: 1rem;
  }
}


.cartItem:nth-child(2n) {
  background-color: var(--nc-bg-2);
}

.cartItem_imageTd {
  width: 5rem;
}

.cartItem_image {
  grid-area: image;
  margin-right: 1rem;

  height: 4rem;
  width: 4rem;
}

.cartItem_name {
  width: 30rem;
  overflow: hidden;
  padding-top: 1rem;
  text-overflow: ellipsis;
}

.cartItem_remove {
  grid-area: remove;
  text-align: right;
}

.cartItem_details {
  grid-area: details;
}

.cartItem_qty {
  width: 14rem;
}

.cartItem_qty_dec,
.cartItem_qty_inc,
.cartItem_qty_field {
  background-color: var(--nc-bg-1);
  border: 1px solid var(--nc-tx-2);
  border-radius: 0;
  display: inline-block;
}

.cartItem_qty_dec,
.cartItem_qty_inc {
  color: var(--nc-tx-1);
  cursor: pointer;
  padding: 0.7rem;
  text-align: center;
  vertical-align: top;
  outline: none;
  width: 3rem;

  &:active,
  &:hover {
    background-color: var(--nc-tx-1);
    color: var(--nc-bg-1);
  }
}

.cartItem_qty_field {
  border: 1px solid var(--nc-tx-2);
  border-left: none;
  border-right: none;
  height: 1.78rem;
  padding: 0.5rem 0;
  text-align: right;
  width: 4rem;
}

.cartItem_totalCost,
.cartItem_cost {
  padding-top: 1rem;
  text-align: right;
  width: 6rem;

  &:before {
    content: "£";
  }
}
</style>