<template>
  <div>
    <div class="mb-4">
      <NuxtLink :to="url">
        <ProductImage :src="image" :alt="title" />
      </NuxtLink>
    </div>
    <NuxtLink :to="url">
      <span class="font-bold">{{ title }}</span>
    </NuxtLink>
    <div>{{ price | price }}</div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['title', 'image', 'url', 'defaultVariant'],
  data() {
    return {
      price: ''
    };
  },

  mounted() {
    this.price = 10;
    fetch(`/syliusapi/${this.defaultVariant}`)
    .then(data=>data.json())
    .then(
      data => {
        this.price = data.price;
      }
    )
  },
};
</script>
