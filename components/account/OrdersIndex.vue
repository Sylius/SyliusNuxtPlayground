<template>
  <div>
    <h1>ORDERS</h1>
    <br/>
    <div class="grid grid-row-1 grid-flow-col gap-4 h-50">
      <div class="row-span-2">
        <table class="table-auto">
          <thead>
          <tr>
            <th>Number</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in this.orders">
            <td>{{ order.number }}</td>
            <td>{{ order.itemsTotal | price }}</td>
            <td @click="show(order.tokenValue)" class="link">show detail</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="row-span-5" v-if="chosenOrder !== null">
        <div>
          <div class="text-3xl">
            Order <span class="font-bold">#{{ chosenOrder.number }}</span> details
          </div>
          <span><CheckoutStateLabel :state="chosenOrder.checkoutState"/></span>
          <span>checkout date (missing in api)</span>
          <span>{{ chosenOrder.currencyCode }}</span>
          <span>{{ chosenOrder.localeCode }}</span>
        </div>
          <div class="grid-rows-1 grid-cols-2 h-48 border rounded-lg p-2 m-2">
            <div class="float-left w-1/2">
                <div class="text-sm text-teal-600 text-xl font-semibold leading-loose">Shipping Address</div>
              <div>
                <Address :address="chosenOrder.billingAddress" />
              </div>
            </div>
            <div class="float-left w-1/2">
                <div class="text-sm text-teal-600 text-xl font-semibold leading-loose">Billing Address</div>
              <div>
                <Address :address="chosenOrder.shippingAddress" />
              </div>
            </div>
          </div>
        <div class="border rounded-lg p-2 m-2 flex flex-col">
          <div>
            <CartItems :cart-items="chosenOrder.items" :edit="false" />
          </div>
          <div><b>items total:</b> {{ chosenOrder.itemsTotal | price }}</div>
          <div><b>promotion total:</b> {{ chosenOrder.orderPromotionTotal | price }}</div>
          <div><b>shipping total</b> {{ chosenOrder.shippingTotal | price }}</div>
          <div><b>tax total</b> {{ chosenOrder.taxTotal | price }}</div>
          <div> <b>total</b> {{ chosenOrder.total | price }}</div>
        </div>

        <div class="grid-rows-1 grid-cols-3">
          <div class="float-left w-1/2 border rounded p-2">
            <div>
              <div><b>payment (state <span class="p-1 m-2 w-auto rounded bg-gray-400">{{ chosenOrder.paymentState }}</span>) </b>
                <PaymentBlock v-for="payment in chosenOrder.payments" :payment="payment" />
              </div>
            </div>
          </div>
          <div class="float-right w-1/2 border rounded p-2">
            <div>
              <div>
                <b>shipments (state <span class="p-1 m-2 w-auto rounded bg-gray-400">{{ chosenOrder.shippingState }}</span>)</b>
                <Shipment v-for="shipment in chosenOrder.shipments" :shipment="shipment" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "OrdersIndex",
  props: ['orders'],

  data() {
    return {
      chosenOrder: null,
    }
  },

  methods: {
    show(tokenValue) {
      const header = {
        'Content-Type': 'application/ld+json',
        'Authorization': 'Bearer ' + this.$store.getters.getCustomerToken
      }

      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}`,
        {
          headers: header
        })
        .then(data=>data.json())
        .then(data => {
          this.chosenOrder = data;
          console.log(this.chosenOrder)
        })
    }

  }
}
</script>

<style scoped>
.link {
  background-color: #30ba9d;
}
.link:hover {
  background-color: #1a9f83;
}

li {
  padding: 5px;
}
</style>
