import Vue from 'vue';
import Vuex from 'vuex';
import client from 'api-client';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    order: {}
  },
  mutations: {
    setOrder(state, order) {
      state.order = order
    }
  },

  actions: {
    fetchOrder({commit}) {
      return client
        .fetchOrder()
        .then(order => commit('setOrder', order))
    }
  }
})
