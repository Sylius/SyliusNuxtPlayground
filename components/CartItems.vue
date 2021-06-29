<template>
  <div style="border: solid">
    <table>
      <tr>
        <th>item name</th>
        <th>quantity</th>
        <th>unit price</th>
        <th>total</th>
      </tr>
      <tr v-for="cartItem in cartItems">
        <td>{{cartItem['productName']}}</td>
        <td>{{cartItem['quantity']}}</td>
        <td>{{cartItem['unitPrice'] | price}}</td>
        <td>{{cartItem['total'] | price}}</td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
  name: "CartItems",

  props: ['cartItems']
}
</script>

