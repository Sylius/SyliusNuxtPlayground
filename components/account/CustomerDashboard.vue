<template>
  <div class="flex-col bg-white shadow-md rounded my-6"  style="height: 500px">
    <span class="text-3xl">Basic Information</span>
    <br/>
    <div
      class="border rounded-lg flex-auto p-4 m-2"
    >
      <span class="font-bold">name: </span> {{ this.fullName }}
    </div>
    <div
      class="border rounded-lg flex-auto p-4 m-2"
    >
      <span class="font-bold">email: </span> {{ this.email }}
    </div>
    <div
      class="border rounded-lg flex-auto p-4 m-2"
    >
      <span v-if="subscribedToNewsletter"
        :class="['flex-initial', 'p-2', 'm-2', 'w-auto', 'rounded', 'bg-green-600']"
      >thanks for subscribing our newsletter :D</span>
      <span v-else
        :class="['flex-initial', 'p-2', 'm-2', 'w-auto', 'rounded', 'bg-red-600']"
      >you don't subscribe out newsletter :(</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerDashboard",
  props: ['fullName', 'email', 'subscribedToNewsletter']
}
</script>
