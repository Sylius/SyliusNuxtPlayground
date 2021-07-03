<template>
  <div>
    <div class="text-4xl font-bold mb-10">{{ $t('myAccount') }}</div>
    <div class="flex">
      <div class="flex-initial flex-col">
          <div
            class="flex-initial p-2 m-2 w-auto bg-teal-400 rounded hover:bg-teal-700"
            @click="setActiveView('customer-dashboard')"
          >
            Dashboard
          </div>
          <div
            class="flex-initial p-2 m-2 w-auto bg-teal-400 rounded hover:bg-teal-700"
            @click="setActiveView('orders-index')"
          >
            orders
          </div>
          <div
            class="flex-initial p-2 m-2 w-auto bg-teal-400 rounded hover:bg-teal-700"
            @click="setActiveView('customer-addresses')"
          >
            addresses
          </div>
      </div>
      <div class="flex-grow flex-initial">
        <CustomerDashboard
          v-if="activeView === 'customer-dashboard'"
          :fullName="fullName"
          :email="email"
          :subscribedToNewsletter="subscribedToNewsletter"
        />
        <OrdersIndex
          v-if="activeView === 'orders-index'"
          :orders="orders"
        />
        <CustomerAddresses
          v-if="activeView === 'customer-addresses'"
        >
        </CustomerAddresses>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerAddresses from "../../components/account/CustomerAddresses";
export default {
  components: {CustomerAddresses},
  data() {
    return {
      firstName: 'test',
      lastName: 'testowy',
      email: 'test@test.com',
      subscribedToNewsletter: false,
      orders: [],
      activeView: 'customer-dashboard',
    }
  },
  computed: {
      fullName() {
        return this.firstName + " " + this.lastName;
    }
  },

  created() {
    const header = {
      'Content-Type': 'application/ld+json',
      'Authorization': 'Bearer ' + this.$store.getters.getCustomerToken
    }

    const customerIri = this.$store.getters.getLoggedCustomerIri
    fetch(`/syliusapi${customerIri}`, {
      headers: header
    })
    .then(data => data.json())
    .then(data => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.subscribedToNewsletter = data.subscribedToNewsletter;
    })

    fetch(`/syliusapi/api/v2/shop/orders`, {
      headers: header
    })
      .then(data => data.json())
      .then(data => {
        this.orders = data['hydra:member']
        console.log(data['hydra:member'])
      })
  },
  methods: {
    setActiveView(component) {
      this.activeView = component;
    }
  }
};
</script>
