<template>
  <div>
    <h1>CART SUMMARY</h1>

    <h2>order items</h2>
    <CartItems :cartItems="cartItems" />

    <h2>Payments</h2>
    <div
      v-for="payment in payments"
      :key="payment['@id']"
    >
      <PaymentBlock :payment="payment"/>
      <br>
    </div>

    <h2>Shipments</h2>
    <div
      v-for="shipment in shipments"
      :key="shipment['@id']"
    >
      <Shipment :shipment="shipment"/>
      <br>
    </div>

    <div>
      <NuxtLink :to="localePath('/checkout/address')">
        <span class="font-bold">Go to checkout</span>
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
    this.tokenValue = localStorage.getItem('cartTokenValue');

    this.order = null;
    this.getOrder(this.tokenValue);
  },

  methods: {
    getOrder(tokenValue) {
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

