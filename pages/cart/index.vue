<template>
  <div>
    <div
      v-for="(item, key) in order"
      :key="key"
    >
      <h1>{{ `${key}: ${JSON.stringify(item)}` }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "index.vue",

  data() {
    return {
      tokenValue: null,
      order: null
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
        })
    }
  }
}
</script>

