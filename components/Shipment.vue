<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded my-6">
      <table class="text-left w-full border-collapse">
        <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light">Id</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold text-sm text-grey-dark border-b border-grey-light text-center">Shipment Method</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="py-4 px-6 border-b border-grey-light">{{ shipment.id }}</td>
          <td class="py-4 px-6 border-b border-grey-light text-center">{{ shipmentMethodName }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shipment",

  props: ['shipment'],

  data() {
    return {
      shipmentMethodName: ''
    }
  },
  mounted() {
    fetch(`/syliusapi${this.shipment.method}`)
      .then(
        data=>data.json()
      ).then(
      data => {
        console.log(data['name']);
        this.shipmentMethodName = data['name'];
      })
  }
}
</script>

