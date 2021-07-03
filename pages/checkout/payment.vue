<template>
  <div>
    <table>
      <tr>
        <th>shipping name</th>
        <th>cost</th>
      </tr>

    </table>
    <div v-for="paymentMethod in paymentMethods">
      <input type="radio"
             :id="paymentMethod.id"
             name="paymentMethod"
             :value="paymentMethod['@id']"
             v-model="selectedPaymentMethod"
             :checked="paymentMethod['@id'] == selectedPaymentMethod"
      >

      <label :for="paymentMethod.id">{{paymentMethod.name}}</label>

    </div>

    <div>
      <button @click="selectPayment" >Chose payment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
      paymentMethods: [],
      selectedPaymentMethod: null,
      paymentId: null
    }
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
          this.getPaymentMethods(data.payments[0]['id']);
        })
    },

    getPaymentMethods(shippingId) {
      const tokenValue = this.$store.getters.cartTokenValue;
      this.paymentId = shippingId;

      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/payments/${shippingId}/methods`)
        .then(data=>data.json())
        .then(data => {
          if(!this.selectedPaymentMethod) {
            this.selectedPaymentMethod = data['hydra:member'][0]['@id'];
          }
          this.paymentMethods = data['hydra:member'];
        })
    },

    selectPayment() {
      const tokenValue = this.$store.getters.cartTokenValue;
      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/payments/${this.paymentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json'
          },
          body : JSON.stringify({
            'paymentMethod': this.selectedPaymentMethod,
          })
        })
        .then(data=>data.json())
        .then(data => {
          this.$router.push('complete')
        })
    }
  }
}
</script>


