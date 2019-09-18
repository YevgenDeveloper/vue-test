import Vue from "vue";
import Vuex from "vuex";
import client from "api-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderData: {}
  },
  mutations: {
    setOrder(state, orderData) {
      state.orderData = orderData;
    }
  },

  actions: {
    fetchOrder({ commit }) {
      return client.fetchOrder().then(orderData => {
        return commit("setOrder", orderData);
      });
    }
  }
});
