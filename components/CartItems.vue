<template>
  <div style="border: solid">
    <table>
      <tr>
        <th>item name</th>
        <th>quantity</th>
        <th>unit price</th>
        <th>total</th>
        <th></th>
      </tr>
      <tr v-for="cartItem in cartItems">
        <td>{{cartItem['productName']}}</td>
        <td>{{cartItem['quantity']}}</td>
        <td>{{cartItem['unitPrice'] | price}}</td>
        <td>{{cartItem['total'] | price}}</td>
        <td>
          <button @click="removeItemFromCart(row['id'])">remove item</button>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
  name: "CartItems",

  props: ['cartItems'],

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

