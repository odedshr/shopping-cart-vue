<template>
  <tr class="cartItem">
    <td class="cartItem_imageTd">
      <img class="cartItem_image" :src="item.product.images[0].src" />
    </td>
    <td class="cartItem_name">{{ item.product.name }}</td>
    <td class="cartItem_cost">{{ item.product.price }}</td>
    <td class="cartItem_qty">
      <button class="cartItem_qty_dec" @click="decrease(item.product)">
        -
      </button>
      <input class="cartItem_qty_field"
        type="number"
        :value="item.quantity"
        @change="updateQuantity({ ...item, quantity: +$event.target.value })"
      />
      <button class="cartItem_qty_inc" @click="increase(item.product)">
        +
      </button>

      <button class="cartItem_remove_btn" @click="remove(item.product)">
        <span>{{ strings.remove }}</span>
      </button>
    </td>
    <td class="cartItem_totalCost">
      {{ item.quantity * item.product.price }}
    </td>
  </tr>
</template>

<script lang="ts">
import { Product } from "../products/Product";
import { CartItem} from './CartItem';
import store from "../store";
import i18n from "../i18n";

export default {
  name: 'CartRow',
  props: ["item"],
  data: () => ({ strings: i18n.strings}),
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
  cursor: pointer;
  display: inline-block;
  font-size: 1.2rem;
  text-transform: capitalize;
  text-decoration: underline;
}

.cartItem_remove_btn {
  &
  &:hover,
  &:focus {
    align-self: center;
    background-color: transparent;
    background-image: url(../assets/trash.svg);
    background-position: 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1rem;
    padding-left: 2rem;
    color: var(--nc-tx-1);
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
  padding: 0.7rem;
  text-align: center;
  vertical-align: top;
  width: 3rem;

  &:hover {
    background-color: var(--nc-tx-1);
    color: var(--nc-bg-1);
  }
}

.cartItem_qty_field {
  border: 1px solid var(--nc-tx-2);
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