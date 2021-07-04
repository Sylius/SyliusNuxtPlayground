<template>
  <div>
    <div v-if="message" class="border rounded bg-teal-700 text-white p-2 m-2">
      {{ message }}
    </div>
    <form method="post" @submit.prevent="update">
      <div class="border rounded p-2 m-2">
        <label class="inline-block mb-3">email</label>
        <input
          type="email"
          name="email"
          v-model="customerEmail"
          class="w-full border rounded p-3 mb-5"
        />
      </div>
      <div class="border rounded p-2 m-2">
        <label class="inline-block mb-3">first name</label>
        <input
          type="text"
          name="firstName"
          v-model="customerFirstName"
          class="w-full border rounded p-3 mb-5"
        />
      </div >
      <div class="border rounded p-2 m-2">
        <label class="inline-block mb-3">Last name</label>
        <input
          type="text"
          name="lastName"
          v-model="customerLastName"
          class="w-full border rounded p-3 mb-5"
        />
      </div>
      <div class="border rounded p-2 m-2">
        <label class="inline-block mb-3">News letter subscription</label>
        <input
          type="checkbox"
          name="subscribedToNewsLetter"
          v-model="customerSubscribedToNewsletter"
          class="w-full border rounded p-3 mb-5"
        />
      </div>
      <FormButton type="submit" :value="$t('update data')" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CustomerDataUpdate",
  props: ['firstName', 'lastName', 'email', 'subscribedToNewsletter'],

  // it should be rafactored but i am not sure how :D. we have problem with mutating props :(
  data() {
    return {
      customerEmail: this.email,
      customerFirstName: this.firstName,
      customerLastName: this.lastName,
      customerSubscribedToNewsletter: this.subscribedToNewsletter,
      message: null
    }
  },

  methods: {
    update() {
      this.message = null;
      const header = {
        'Content-Type': 'application/ld+json',
        'Authorization': 'Bearer ' + this.$store.getters.getCustomerToken
      }

      const customerIri = this.$store.getters.getLoggedCustomerIri
      fetch(`/syliusapi${customerIri}`, {
        method: 'PUT',
        headers: header,
        body : JSON.stringify({
          email: this.customerEmail,
          firstName: this.customerFirstName,
          lastName: this.customerLastName,
          subscribedToNewsletter: this.customerSubscribedToNewsletter
        })
      })
        .then(data => {
          if(data.ok) {
            this.message = 'customer updated - reload user to see changes'
          }
          return  data.json();
        })
        .then(response => {
          if (response['@type'] === "ConstraintViolationList") {
            this.message = response['hydra:description'];
          }
      })
    }
  },
}
</script>

