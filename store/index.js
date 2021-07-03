import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartTokenValue: null
    },
    mutations: {
      setCartTokenValue(state, tokenValue) {
        state.cartTokenValue = tokenValue;
      }
    },
    actions: {
      setCartTokenValue(context, cartTokenValue) {
        context.commit('setCartTokenValue', cartTokenValue);
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.auth.loggedIn;
      },

      loggedInUser(state) {
        return state.auth.user;
      },

      cartTokenValue(state) {
        return state.cartTokenValue;
      }
    }
  })
}

export default createStore
