<template>
  <div>
    <div class="text-4xl font-bold mb-10 text-center">{{ $t('login') }}</div>
    <div class="max-w-xl mx-auto border rounded p-8">
      <div
        v-if="error"
        class="border rounded border-red-500 text-red-800 bg-red-200 p-3 mb-8"
      >
        {{ error }}
      </div>
      <form method="post" @submit.prevent="loginV2">
        <div>
          <label class="inline-block mb-3">{{ $t('email') }}</label>
          <div>
            <input
              type="email"
              name="email"
              v-model="email"
              class="w-full border rounded p-3 mb-5"
            />
          </div>
        </div>
        <div>
          <label class="inline-block mb-3">{{ $t('password') }}</label>
          <div>
            <input
              type="password"
              name="password"
              v-model="password"
              class="w-full border rounded p-3 mb-5"
            />
          </div>
        </div>
        <div>
          <FormButton type="submit" :value="$t('login')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'shop@example.com',
      password: 'sylius',
      error: null
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        });
      } catch (e) {
        this.error = e.response.data.message;
      }
    },

    loginV2() {
      const { shopLogin } = require("sylius-js-sdk");

      const shopLoginApi = new shopLogin();
      shopLoginApi.login(this.email, this.password)
        .then(data => {
          this.$store.dispatch(
            'setLoggedCustomerData',
            {
              customerToken: data.data.token,
              iri: data.data.customer
            }
          )
          this.$router.push('/en_US')
        })
    }
  }
};
</script>
