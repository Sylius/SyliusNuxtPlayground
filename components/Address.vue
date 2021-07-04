<template>
  <div>
    <div
      v-for="(value, key) in this.address"
      :key="key"
      v-if="key[0] != '@'"
    >
      <b>{{ key.replace( /([A-Z])/g, " $1" ).charAt(0).toUpperCase() + key.replace( /([A-Z])/g, " $1" ).slice(1) }}</b>: {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  props: ['address']
}
</script>
