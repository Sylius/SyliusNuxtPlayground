<template>
  <div>
    <div class="text-4xl font-bold mb-10">{{ $t('latestProducts') }}</div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        v-for="product in products"
        :key="product.code"
        class="mb-4"
      >
        <ProductCard
          :title="product.translations[$i18n.locale].name"
          :image="`${product.images[0].path}`"
          :url="localePath(`/product/${product.code}`)"
          :defaultVariant="product.defaultVariant"
        />
      </div>
    </div>
    <div class="text-center">
      <FormButton value="More" type="link" :url="localePath('/products/1')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      products: []
    };
  },
  mounted() {
    const { cart, shopProduct } = require("sylius-js-sdk");

    const shopProductsApi = new shopProduct();
    shopProductsApi.getProducts()
      .then(data => {
        this.products = data.data['hydra:member'];
      })

    const cartApi = new cart();
      cartApi.getCart()
      .then(data => {
        this.$store.dispatch('setCartTokenValue', data.data.tokenValue)
      })
  }
};
</script>
