import { Product } from '../products/Product';
import { CartItem } from './CartItem';

export default {
  namespaced: true,
  state: {},
  mutations: {
    SET_QUANTITY(state: { [key: string]: CartItem }, item: CartItem) {
      state[item.product.id].quantity = item.quantity;
    },

    ADD_ITEM(state: { [key: string]: CartItem }, product: Product) {
      if (state[product.id]) {
        state[product.id].quantity++
      } else {
        state[product.id] = { product, quantity: 1 };
      }
    },

    REMOVE_ITEM(state: { [key: string]: CartItem }, product: Product) {
      delete state[product.id];
    },

    DEC_ITEM(state: { [key: string]: CartItem }, product: Product) {
      if (state[product.id]) {
        if (state[product.id].quantity === 1) {
          delete state[product.id];
        } else {
          state[product.id].quantity--;
        }
      }
    }
  },
  actions: {
    setQuantity(store: { commit: Function }, cartItem: CartItem) {
      store.commit('SET_QUANTITY', cartItem);
    },
    addItem(store: { commit: Function }, product: Product) {
      store.commit('ADD_ITEM', product);
    },
    removeItem(store: { commit: Function }, product: Product) {
      store.commit('REMOVE_ITEM', product);
    },
    increaseItem(store: { commit: Function }, product: Product) {
      store.commit('ADD_ITEM', product);
    },
    decreaseItem(store: { commit: Function }, product: Product) {
      store.commit('DEC_ITEM', product);
    },
  },
  modules: {
  }
};