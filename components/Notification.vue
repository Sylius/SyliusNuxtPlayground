<template>
  <div v-bind:class="notification.type" v-if="notification.message" class="p-3 text-center w-1/2 mx-auto rounded-b-2xl">
    <div class="font-bold text-xl text-white">{{notification.message}}</div>
    <button @click="removeNotification" class="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mt-3">OK</button>
  </div>
</template>

<style>
.success {
  background: rgb(70, 161, 74);
}
.fail {
  background: rgb(194, 23, 10);
}
</style>
<script>
export default {
  name: "Notification",
  computed: {
    notification() {
      return this.$store.getters.getNotification
    }
  },
  data() {
    return {
      message: 'test',
    }
  },
  created() {
  },
  methods: {
    removeNotification(){
      this.$store.dispatch('setNotification', false)
      this.message = '';
    }
  }
}
</script>

<style scoped>

</style>
