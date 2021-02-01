import { Product } from './Product';
import { SearchQuery } from '../filters/SearchQuery';
import { getProducts } from './products.data-provider';

export default {
  namespaced: true,
  state: { items: [] as Product[], query: {} as SearchQuery },
  mutations: {
    QUERY(state: { query: SearchQuery }, newQuery: SearchQuery) {
      state.query = { ...state.query, ...newQuery };
    },

    FETCH(state: { items: Product[] }, products: Product[]) {
      state.items = products;
    },
  },

  actions: {
    query(store: { commit: Function; state: { query: SearchQuery } }, query: SearchQuery) {
      store.commit('QUERY', query); // first merge the query with the existing one
      getProducts(store.state.query)
        .then(products => store.commit('FETCH', products));
    },
  },
  modules: {
  }
};
