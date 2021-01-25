<template>
  <aside class="cart">
    <label class="cartSummary" @click="toggle()">
      <div class="cartSummary_count" v-if="count">{{ count }}</div>
      <span class="cartSummary_action">{{ strings.viewMyCart }}</span>
    </label>
    <div class="cartWrapper" v-if="count > 0 && isVisible">
      <div class="cartContent">
        <div class="cart_header">
          <h2 class="cart_title">Review your basket</h2>
          <label class="cart_close" @click="toggle()"><span>close</span></label>
        </div>
        <table class="cart_table">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Price</th>
              <th>Qty.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <CartRow
              v-for="item in store.state.cart"
              :key="item.product.id"
              :item="item"
            />
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4"></td>
              <td class="cart_total">{{ totalCost }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="cart_actions">
          <button class="cart_removeAll" data-task="removeAll">
            Remove all items
          </button>
          <button class="cart_checkout" data-task="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Product } from "../products/Product";
import CartRow from "./CartRow.vue";
import i18n from "../i18n";

export default {
  setup() {
    const isVisible = ref(false);
    const strings = i18n.strings;
    const store = useStore();
    const count = computed(() =>
      Object.keys(store.state.cart)
        .map((id) => store.state.cart[id].quantity)
        .reduce((sum, value) => sum + value, 0)
    );
    const totalCost = computed(() =>
      Object.keys(store.state.cart)
        .map((id) => store.state.cart[id])
        .reduce((sum, item) =>  sum + item.quantity * item.product.price, 0)
    );
    const toggle = () => (isVisible.value = !isVisible.value);

    function increase(product: Product) {
      store.state.dispatch("cart/increaseItem", product);
    }

    function decrease(product: Product) {
      store.state.dispatch("cart/decreaseItem", product);
    }

    function remove(product: Product) {
      store.state.dispatch("cart/removeItem", product);
    }

    return {
      CartRow,
      isVisible,
      toggle,
      strings,
      store,
      count,
      totalCost,
      increase,
      decrease,
      remove,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/controls/common";

.cart {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
}

.cartSummary {
  background-image: url(../assets/basket.svg);
  background-position: 1rem 0.5rem;
  background-repeat: no-repeat;
  background-size: 2rem;
  border-radius: 2rem;
  cursor: pointer;
  display: inline-block;
  font-size: 1.2rem;
  line-height: 3rem;
  min-height: 3rem;
  padding: 0.5rem 1rem 0 4rem;
  position: relative;
}

.cartSummary:focus {
  outline: none;
  border: 1px solid var(--nc-lk-1);
}

.cartSummary_count {
  align-items: center;
  background-color: var(--nc-lk-1);
  bottom: 0;
  border-radius: 50%;
  color: var(--nc-bg-1);
  display: flex;
  height: 1.5rem;
  left: 1.75rem;
  place-content: center;
  padding-top: 0.3rem;
  position: absolute;
  width: 1.8rem;
}
.cartSummary_action {
  text-decoration: underline;

  &:first-child {
    display: none;
  }
}

.showCart_checkbox:not(:checked) + .cartWrapper {
  display: none;
}

.cartWrapper {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.16);
  display: flex;
  height: 100%;
  justify-content: center;
  right: 0;
  overflow: hidden;
  padding-top: 2.5rem;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 1;
}

.cartContent {
  @extend .animated;
  @extend .flipInX;
  background-color: var(--nc-bg-1);
  border: 1px solid var(--nc-tx-1);
  border-radius: 1rem;
  box-shadow: 0 0.3rem 0.3rem $clr-shadow;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 33vh;
  min-width: 40vw;
  padding: 1rem;
  z-index: 1;
}

.cart_header {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
}

.cart_title {
  flex: 1 1 auto;
}

.cart_table {
  flex: 1 1 auto;

  th {
    background: none;
    border: none;
    color: var(--nc-tx-1);
    font-size: 1rem;
  }

  td {
    border: none;
    color: var(--nc-tx-1);
    font-size: 1.6rem;
    vertical-align: top;
  }
}

.cart_close {
  cursor: pointer;
  display: inline-block;
  font-size: 1.2rem;
  text-transform: capitalize;
  text-decoration: underline;
}

.cart_close {
  align-self: flex-start;
  background-image: url(../assets/close.svg);
  background-position: left center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 2rem;
  padding-left: 1.5rem;
  width: 1rem;

  span {
    display: none;
  }
}

.cart_items {
  border: 1px solid var(--nc-lk-tx);
  flex: 1 1 auto;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

.cart_actions {
  flex: 0 0 2rem;
  gap: 1rem;
  margin: 1rem 0;
  text-align: right;
}

.cart_removeAll {
  background-color: var(--nc-bg-1);
  border: 1px solid var(--nc-tx-2);
  color: var(--nc-tx-2);
  margin: 0 1rem;

  &:hover {
    background-color: var(--nc-bg-1);
    border-width: 2px;
    margin: 0;
  }
}

td.cart_total {
  border-top: 1px solid var(--nc-tx-2);
  text-align: right;

  &:before {
    content: "£";
  }
}
</style>