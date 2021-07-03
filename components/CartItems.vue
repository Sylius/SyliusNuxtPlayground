<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse">
        <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Item Name</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Quantity</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Unit Price</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Total</th>
          <th v-if="edit != false" class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cartItem in cartItems">
          <td class="py-4 px-6 border-b border-grey-light">{{cartItem['productName']}}</td>
          <td class="py-4 px-6 border-b border-grey-light text-center">{{cartItem['quantity']}}</td>
          <td class="py-4 px-6 border-b border-grey-light text-center">{{cartItem['unitPrice'] | price}}</td>
          <td class="py-4 px-6 border-b border-grey-light text-center">{{cartItem['total'] | price}}</td>
          <td v-if="edit != false" class="py-4 px-6 border-b border-grey-light text-center">
            <button @click="removeItemFromCart(row['id'])" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 text-xs rounded">remove item</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItems",

  props: ['cartItems', 'edit'],

  methods: {
    removeItemFromCart(itemId) {
      const tokenValue = localStorage.getItem('cartTokenValue');

      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/items/${itemId}`, {method: 'DELETE'})
        .then(data=>data.json())
        .then(data => {
          window.location.reload();
        })
    }
  }
}
</script>

