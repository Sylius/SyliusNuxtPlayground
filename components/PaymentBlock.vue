<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse">
        <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Id</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Payment Method</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-4 px-6 border-b border-grey-light">{{ payment.id }}</td>
            <td class="py-4 px-6 border-b border-grey-light text-center">{{ paymentMethodName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      .then(data=>data.json())
      .then(data => {
        this.paymentMethodName = data['name'];
      })
  }
}
</script>

