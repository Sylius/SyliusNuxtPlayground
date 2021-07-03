<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse">
        <thead>
          <tr>
            <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="paymentMethod in paymentMethods">
            <td class="py-4 px-6 border-b border-grey-light">
                <input type="radio"
                       :id="paymentMethod.id"
                       name="paymentMethod"
                       :value="paymentMethod['@id']"
                       v-model="selectedPaymentMethod"
                       :checked="paymentMethod['@id'] == selectedPaymentMethod"
                >

              <label :for="paymentMethod.id" class="cursor-pointer">{{paymentMethod.name}}</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-right">
      <button @click="selectPayment" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Chose payment</button>
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


