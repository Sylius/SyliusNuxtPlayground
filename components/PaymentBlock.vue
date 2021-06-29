<template>
  <div style="border: solid">
    <ul>
      <li>id: {{payment.id}}</li>
      <li>payment method: {{paymentMethodName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaymentBlock",

  props: ['payment'],

  data() {
    return {
      paymentMethodName: ''
    }
  },
  mounted() {
    fetch(`/syliusapi${this.payment.method}`)
      .then(
        data=>data.json()
      ).then(
        data => {
        console.log(data['name']);
        this.paymentMethodName = data['name'];
      })
  }
}
</script>

