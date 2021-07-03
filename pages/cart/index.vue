<template>
  <div>
    <div class="mx-auto w-full justify-center leading-loose">
      <div class="uppercase text-sm text-green-600 text-3xl font-semibold leading-loose w-1/2 mx-auto text-center">cart summary</div>
    </div>
    <div class="h-12"></div>
    <div class="mx-auto w-full justify-center leading-loose">
      <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose">Order items</div>
    </div>
    <CartItems :cartItems="cartItems" />

    <div class="mx-auto w-full justify-center">
      <div class="text-sm text-indigo-500 text-xl font-semibold">Payments</div>
    </div>
    <div
      v-for="payment in payments"
      :key="payment['@id']"
    >
      <PaymentBlock :payment="payment"/>
      <br>
    </div>

    <div class="mx-auto w-full justify-center">
      <div class="text-sm text-indigo-500 text-xl font-semibold">Shipments</div>
    </div>
    <div
      v-for="shipment in shipments"
      :key="shipment['@id']"
    >
      <Shipment :shipment="shipment"/>
      <br>
    </div>

    <div class="text-right">
      <NuxtLink :to="localePath('/checkout/address')">
        <span class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go to checkout</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "index.vue",
  data() {
    return {
      tokenValue: null,
      order: null,
      payments: [],
      shipments: [],
      cartItems: [],
    };
  },

  mounted() {
    this.getOrder();
  },

  methods: {
    getOrder() {
      const tokenValue = this.$store.getters.cartTokenValue;

      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}`)
        .then(data=>data.json())
        .then(data => {
          this.order = data;
          this.payments = data.payments;
          this.shipments = data.shipments;
          this.cartItems = data.items;
        })
    }
  }
}
</script>

