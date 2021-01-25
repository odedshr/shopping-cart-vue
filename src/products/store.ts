import { Product } from './Product';
import { SearchQuery } from '../filters/SearchQuery';
import { getProducts } from './products.data-provider';

export default {
  namespaced: true,
  state: { items: [] as Product[] },
  mutations: {
    QUERY(state: { items: Product[] }, products: Product[]) {
      console.log(`loaded ${products.length}`);
      state.items = products;
    },
  },
  actions: {
    query(store: { commit: Function }, query: SearchQuery) {
      console.log('getProducts');
      getProducts(query).then(products => store.commit('QUERY', products));
    },
  },
  modules: {
  }
};
