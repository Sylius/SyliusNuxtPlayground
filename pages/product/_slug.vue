<template>
  <div>
    <div class="md:grid grid-cols-3 gap-10 mb-10">
      <div class="mb-6">
        <ProductImage
          :src="`${product.images[0].path}`"
          :alt="translations.name"
        />
      </div>
      <div class="col-span-2">
        <div class="text-4xl font-bold mb-1">
          {{ translations.name }}
        </div>
        <div class="text-xs mb-6">
          {{ product.code }}
        </div>
        <div class="mb-6">
          {{ translations.shortDescription }}
        </div>
        <div class="border rounded p-5 mb-5">
          <div v-if="product.variants.length > 1" class="mb-3">
            <select
              v-model="selectedVariant"
              class="block w-full border rounded p-3"
            >
              <option
                v-for="(variant, i) in product.variants"
                :key="variant.code"
                :value="i"
              >
                {{ variantsDetails[i].translations[$i18n.locale].name }}
              </option>
            </select>
          </div>
          <div>
            <input
              v-model.number="quantity"
              class="border rounded p-3"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div class="flex items-center">
          <button v-on:click="addToCart" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" > {{$t('addToCart')}}</button>
          <span class="text-xl font-bold pl-5">
            {{
              variantsDetails[selectedVariant].price | price
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="mb-10">
      <div class="text-2xl font-bold mb-4">{{ $t('details') }}</div>
      <div>{{ translations.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      product: {},
      translations: {},
      variantsDetails: [],
      selectedVariant: 0,
      quantity: 1
    };
  },

  async asyncData({ $axios, app, params }) {
    const product = await $axios.$get(
      `/syliusapi/api/v2/shop/products/${params.slug}`
    );

    const translations = await $axios.$get(
      `/syliusapi/${product.translations[app.i18n.locale]['@id']}`
    );

    const variantsDetails = await Promise.all(
      product.variants.map(item => {
        return $axios.$get(`/syliusapi/${item}`);
      })
    );
    return { product, translations, variantsDetails};
  },
  methods: {
    addToCart() {
      const { shopClient } = require("sylius-js-sdk");
      const tokenValue = this.$store.getters.cartTokenValue;

      const shopClientAPI = new shopClient();

      shopClientAPI.cart.addToCart(tokenValue, this.variantsDetails[this.selectedVariant]['@id'], this.quantity)
        .then(data => {
          if (data.status === 200) {
            return data
          }
          throw Error(data.statusText);
        })
        .then(data => {
          this.$store.dispatch('setNotification',
            {
              type: 'success',
              message: 'Product added to cart',
              time: 1000
            })
        })
        .catch(() => {
          this.$store.dispatch('setNotification',
            {
              type: 'fail',
              message: 'Product not added to cart',
              time: 1000
            })
        })
    }
  }
};
</script>
