<template>
  <div id="address-form">
    <div>
      <label class="inline-block mb-3">{{ $t('email') }}</label>
      <div>
        <input
          type="email"
          name="email"
          class="w-full border rounded p-3 mb-5"
          v-model="email"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('firstName') }}</label>
      <div>
        <input
          type="text"
          name="firstName"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.firstName"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('lastName') }}</label>
      <div>
        <input
          type="text"
          name="lastName"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.lastName"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('countryCode') }}</label>
      <div>
        <input
          type="text"
          name="countryCode"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.countryCode"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('provinceName') }}</label>
      <div>
        <input
          type="text"
          name="provinceName"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.provinceName"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('street') }}</label>
      <div>
        <input
          type="text"
          name="street"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.street"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('city') }}</label>
      <div>
        <input
          type="text"
          name="city"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.city"
        />
      </div>
    </div>
    <div>
      <label class="inline-block mb-3">{{ $t('postcode') }}</label>
      <div>
        <input
          type="text"
          name="postcode"
          class="w-full border rounded p-3 mb-5"
          v-model="billingAddress.postcode"
        />
      </div>
    </div>
    <div>
      <button @click="addressOrder" >Chose shipping</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "address",
  data() {
    return {
      email: "lucifer@morningstar.com",
      billingAddress: {
        firstName: "Lucifer",
        lastName: "Morningstar",
        countryCode: "PL",
        provinceName: "Seaside Fwy",
        street: "string",
        city: "string",
        postcode: "90802"
      },
    };
  },

  methods: {
    addressOrder() {
      let tokenValue = localStorage.getItem('cartTokenValue');

      fetch(`/syliusapi/api/v2/shop/orders/${tokenValue}/address`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/merge-patch+json'
        },
        body : JSON.stringify({
          'email': this.email,
          'billingAddress': this.billingAddress,
          'shippingAddress': this.billingAddress
        })
      })
        .then(data=>data.json())
        .then(data => {
          this.$router.push('shipping');
        })
    }
  }
}
</script>
