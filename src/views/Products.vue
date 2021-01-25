<template>
  <div class="products">
    <h2 class="section_title">{{ strings.sectionTitle }}</h2>
    <div class="item_count">
      ({{ count }} {{ count === 1 ? strings.unit : strings.units }})
    </div>

    <ul class="product_items">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import i18n from "../i18n";
import { Product, GetProduct } from "../models/Product";
import ProductItem from "./ProductItem.vue";
import cart from "../store";

@Options({
  components: { ProductItem },
  props: ["get"],
  data: () => ({
    count: 0,
    products: [],
  }),
  methods: {
    addToCart(product: Product) {
      cart.dispatch("addItem", product);
    },
  },
})
export default class Products extends Vue {
  strings = i18n.strings;
  get!: GetProduct;
  count!: number;
  products!: Product[];

  async mounted() {
    const result = await this.get(0, 6);

    this.count = result.total;
    this.products = result.items;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.section_title {
  font-size: 4.6rem;
  margin: 5rem 0 0;
  text-align: center;
}

.item_count {
  font-size: 2rem;
  text-align: center;
}

.product_items {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 23rem);
  grid-template-rows: repeat(auto-fit, 30rem);
  grid-gap: 15px;
  list-style: none;
  margin: 5rem 0 0;
  padding: 0;
}
</style>
