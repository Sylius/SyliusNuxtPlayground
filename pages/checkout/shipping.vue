<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse">
        <thead>
          <tr>
            <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Shipping</th>
            <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shippingMethod in shippingMethods">
            <td class="py-4 px-6 border-b border-grey-light">
              <input type="radio"
                     :id="shippingMethod.id"
                     name="shippingMethod"
                     :value="shippingMethod['@id']"
                     v-model="selectedShippingMethod"
                     :checked="shippingMethod['@id'] == selectedShippingMethod"
              >

              <label :for="shippingMethod.id"  class="cursor-pointer">{{shippingMethod.name}}</label>
            </td>
            <td class="py-4 px-6 border-b border-grey-light text-center">{{shippingMethod.price | price}}</td>

          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-right">
      <button @click="ship" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Chose shipping</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "shipping",
  data() {
    return {
      shippingMethods: [],
      selectedShippingMethod: null,
      shippingId: null
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
          this.getShippingMethods(tokenValue, data.shipments[0]['id']);
        })
    },

    getShippingMethods(tokenValue, shippingId) {
      this.shippingId = shippingId;
      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/shipments/${shippingId}/methods`)
        .then(data=>data.json())
        .then(data => {
          if(!this.selectedShippingMethod) {
            this.selectedShippingMethod = data['hydra:member'][0]['@id'];
          }
          this.shippingMethods = data['hydra:member'];
        })
    },

    ship() {
      const tokenValue = this.$store.getters.cartTokenValue;

      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/shipments/${this.shippingId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json'
          },
          body : JSON.stringify({
            'shippingMethod': this.selectedShippingMethod,
          })
        })
        .then(data=>data.json())
        .then(data => {
          this.$router.push('payment')
        })
    },
  }
}
</script>


