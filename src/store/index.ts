import { createStore } from 'vuex'
import createProductStore from '../products/store';
import createCartStore from '../cart/store';

export default createStore({
  modules: {
    products: createProductStore,
    cart: createCartStore
  }
});
