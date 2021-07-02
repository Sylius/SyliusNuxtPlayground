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

    <b>Shipping address</b>
    <div>
      <div
        v-for="(value, key) in shippingAddress"
        :key="key"
      >
        {{ key }} : {{ value }}
      </div>
    </div>
    <br/>
    <b>Billing address</b>
    <div>
      <div
        v-for="(value, key) in billingAddress"
        :key="key"
      >
        {{ key }} : {{ value }}
      </div>
    </div>
    <br/>
    <div>
      <p>item total: {{itemsTotal | price}}</p>
      <p>shipping total: {{shippingTotal | price}}</p>
      <p>total: {{total | price}}</p>
    </div>

    <br/>
    <div>
      <textarea
        id="notes"
        v-model="notes"
        placeholder="notes"
      >

      </textarea>
    </div>
    <div>
      <br/>
      <button @click="completeOrder">
        <span class="font-bold">Go to checkout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "complete",
  data() {
    return {
      order: null,
      payments: [],
      shipments: [],
      cartItems: [],
      shippingAddress: null,
      billingAddress: null,
      itemsTotal: 0,
      shippingTotal: 0,
      total: 0,
      notes: '',
    };
  },

  mounted() {
    const tokenValue = this.$store.getters.cartTokenValue;

    fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}`)
      .then(data=>data.json())
      .then(data => {
        console.log(data)
        this.order = data;
        this.payments = data.payments;
        this.shipments = data.shipments;
        this.cartItems = data.items;
        this.shippingAddress = data.shippingAddress;
        this.billingAddress = data.billingAddress;
        this.itemsTotal = data.itemsTotal;
        this.shippingTotal = data.shippingTotal;
        this.total = data.total;
      })
  },

  methods: {
    completeOrder() {
      const tokenValue = this.$store.getters.cartTokenValue;
      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/merge-patch+json'
        },
        body : JSON.stringify({
          'notes': this.notes,
        })
      })
        .then(data=>data.json())
        .then(data => {
          console.log(data)
        })
    }
  }
}
</script>
