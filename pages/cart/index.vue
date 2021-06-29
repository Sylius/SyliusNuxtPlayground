<template>
  <div>
    <div
      v-for="(item, key) in order"
      :key="key"
    >
      <h1>{{ `${key}: ${JSON.stringify(item)}` }}</h1>
    </div>
    =========================================

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
      shipments: []
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
        })
    }
  }
}
</script>

