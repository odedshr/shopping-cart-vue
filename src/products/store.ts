import { Product } from './Product';
import { SearchQuery } from '../filters/SearchQuery';
import { getProducts } from './products.data-provider';

export default {
  namespaced: true,
  state: { items: [] as Product[] },
  mutations: {
    QUERY(state: { items: Product[] }, products: Product[]) {
      state.items = products;
    },
  },
  actions: {
    query(store: { commit: Function }, query: SearchQuery) {
      getProducts(query).then(products => store.commit('QUERY', products));
    },
  },
  modules: {
  }
};
