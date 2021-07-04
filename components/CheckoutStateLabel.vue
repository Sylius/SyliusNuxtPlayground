<template>
  <span>
    <span
      v-if="this.state === 'completed'"
      class="p-1 m-2 w-auto rounded bg-green-600"
    >
      Completed
    </span>
    <span
      v-else
      class="p-1 m-2 w-auto rounded lg:focus:bg-teal-200"
    >
      {{ this.state }}
    </span>
  </span>
</template>

<script>
export default {
  name: "CheckoutStateLabel",
  props: ['state']
}
</script>

