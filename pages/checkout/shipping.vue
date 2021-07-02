<template>
  <div>
    <table>
      <tr>
        <th>shipping name</th>
        <th>cost</th>
      </tr>

    </table>
    <div v-for="shippingMethod in shippingMethods">
      <input type="radio"
             :id="shippingMethod.id"
             name="shippingMethod"
             :value="shippingMethod['@id']"
             v-model="selectedShippingMethod"
             :checked="shippingMethod['@id'] == selectedShippingMethod"
      >

      <label :for="shippingMethod.id">{{shippingMethod.name}}</label>

    </div>

    <div>
      <button @click="ship" >Chose shipping</button>
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


