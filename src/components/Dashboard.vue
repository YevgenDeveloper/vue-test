<template>
  <div class="wrapper">
    <button type="button" class="btn-blue" @click="showModal">
      Create Order
    </button>
    <div v-if="state.stateOrder.before_submit_price" class="order-price">
      Your price: {{ this.state.stateOrder.before_submit_price }} $
    </div>
    <div v-if="loading">Loading…</div>
    <order-component
      v-else-if="order"
      :order="order"
      :images="images"
      :orderDetails="orderDetails"
      :options="options"
      :onSubmit="changeOrderPrice"
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import OrderComponent from "./OrderComponent";

export default {
  name: "Dashboard",
  components: { OrderComponent },

  data() {
    return {
      loading: false,
      isModalVisible: false
    };
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    changeOrderPrice(price) {
      this.state.stateOrder.before_submit_price = price;
    }
  },
  computed: {
    order() {
      return Object.assign(
        this.state.stateOrder,
        this.$store.state.orderData.order
      );
    },
    orderDetails() {
      return this.$store.state.orderData.order_details;
    },
    options() {
      return this.$store.state.orderData.options;
    },
    images() {
      return this.$store.state.orderData.images;
    }
  },
  beforeCreate() {
    this.state = {
      stateOrder: {}
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchOrder", null).then(() => {
      this.loading = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
}

.btn-blue {
  color: white;
  background: #3e61fe;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    background: #2b44a4;
  }

  &:focus {
    outline: none;
  }
}
</style>
