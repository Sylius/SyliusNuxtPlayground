<template>
  <div>
    <div class="mx-auto w-full justify-center leading-loose">
      <div class="uppercase text-sm text-green-600 text-3xl font-semibold leading-loose w-1/2 mx-auto text-center">cart summary</div>
    </div>

    <div class="h-12"></div>
    <div class="mx-auto w-full justify-center leading-loose">
      <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose">Order items</div>
    </div>
    <CartItems :cartItems="cartItems" :edit="false"/>

    <div class="mx-auto w-full justify-center leading-loose">
      <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose">Payments</div>
    </div>
    <div
      v-for="payment in payments"
      :key="payment['@id']"
    >
      <PaymentBlock :payment="payment"/>
      <br>
    </div>

    <div class="mx-auto w-full justify-center leading-loose">
      <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose">Shipments</div>
    </div>
    <div
      v-for="shipment in shipments"
      :key="shipment['@id']"
    >
      <Shipment :shipment="shipment"/>
      <br>
    </div>

    <div class="grid-rows-1 grid-cols-2 h-48">
      <div class="float-left w-1/2">
        <div class="mx-auto w-full justify-center leading-loose">
          <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose">Shipping Address</div>
        </div>
        <div>
          <Address :address="shippingAddress" />
        </div>
      </div>
      <div class="float-left w-1/2">
        <div class="mx-auto w-full justify-center leading-loose">
          <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose">Billing Address</div>
        </div>
        <div>
          <Address :address="shippingAddress" />
        </div>
      </div>
    </div>

    <div>
      <div class="mx-auto w-full justify-center leading-loose">
        <div class="h-12"></div>

        <div class="text-sm text-indigo-500 text-xl font-semibold leading-loose text-center">Summary</div>
      </div>
      <div class="mx-auto">
        <div class="bg-white shadow-md rounded my-6">
          <table class="text-left w-full border-collapse">
            <thead>
            <tr>
              <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Item Total</th>
              <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Shipping Total</th>
              <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="py-4 px-6 border-b border-grey-light text-center">{{itemsTotal | price}}</td>
              <td class="py-4 px-6 border-b border-grey-light text-center">{{shippingTotal | price}}</td>
              <td class="py-4 px-6 border-b border-grey-light text-center font-bold">{{total | price}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div >
      <textarea class="w-1/2 border-2 p-3"
        id="notes"
        v-model="notes"
        placeholder="notes"
      >
      </textarea>
    </div>
    <div class="text-right">
      <button @click="completeOrder">
        <span class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Finalize Order</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "complete",
  data() {
    return {
      order: null,
      payments: [],
      shipments: [],
      cartItems: [],
      shippingAddress: null,
      billingAddress: null,
      itemsTotal: 0,
      shippingTotal: 0,
      total: 0,
      notes: '',
    };
  },

  mounted() {
    const tokenValue = this.$store.getters.cartTokenValue;

    fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}`)
      .then(data=>data.json())
      .then(data => {
        console.log(data)
        this.order = data;
        this.payments = data.payments;
        this.shipments = data.shipments;
        this.cartItems = data.items;
        this.shippingAddress = data.shippingAddress;
        this.billingAddress = data.billingAddress;
        this.itemsTotal = data.itemsTotal;
        this.shippingTotal = data.shippingTotal;
        this.total = data.total;
      })
  },

  methods: {
    completeOrder() {
      const tokenValue = this.$store.getters.cartTokenValue;
      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/merge-patch+json'
        },
        body : JSON.stringify({
          'notes': this.notes,
        })
      })
        .then(data => {
          if (data.ok) {
            return data.json()
          }
          throw Error(data.statusText);
        })
        .then(data => {
          this.$store.dispatch('setNotification',
            {
              type: 'success',
              message: 'Order completed',
              time: 1000
            })
          this.$router.push(this.$router.app.localePath('/'));
        })
        .catch(() => {
          this.$store.dispatch('setNotification',
            {
              type: 'fail',
              message: 'Error when completing the order',
              time: 1000
            })
      })
    }
  }
}
</script>
