import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartTokenValue: null,
      customerToken: null,
      loggedCustomerIri: null,
      notification: {
        type: null,
        message: null,
        time: null
      }
    },
    mutations: {
      setCartTokenValue(state, tokenValue) {
        state.cartTokenValue = tokenValue;
      },

      setCustomerToken(state, token) {
        state.customerToken = token;
      },

      setLoggedCustomerIri(state, iri) {
        state.loggedCustomerIri = iri;
      },

      setNotification(state, notification) {
        state.notification.type = notification.type;
        state.notification.message = notification.message;
        state.notification.time = Date.now() + notification.time;
      }
    },
    actions: {
      setCartTokenValue(context, cartTokenValue) {
        context.commit('setCartTokenValue', cartTokenValue);
      },

      setLoggedCustomerData(context, payload) {
        context.commit('setCustomerToken', payload.customerToken);
        context.commit('setLoggedCustomerIri', payload.iri);
      },

      setNotification(context, notification) {
        context.commit('setNotification', notification)
      }
    },
    getters: {
      // for we don't use nuxt auth
      // isAuthenticated(state) {
      //   return state.auth.loggedIn;
      // },
      //
      // loggedInUser(state) {
      //   return state.auth.user;
      // },

      // temporary solution, should be delete after use next auth
      isAuthenticated(state) {
        return  state.customerToken !== null;
      },

      cartTokenValue(state) {
        return state.cartTokenValue;
      },

      getCustomerToken(state) {
        return state.customerToken;
      },

      getLoggedCustomerIri(state) {
        return state.loggedCustomerIri;
      },

      getNotification(state) {
        return state.notification;
      }
    }
  })
}

export default createStore
