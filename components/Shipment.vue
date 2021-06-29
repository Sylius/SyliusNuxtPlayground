<template>
  <div style="border: solid">
    <ul>
      <li>id: {{shipment.id}}</li>
      <li>shipment method: {{shipmentMethodName}}</li>
    </ul>
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

