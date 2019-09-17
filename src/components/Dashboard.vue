<template>
    <div class="wrapper">
        <button
                type="button"
                class="btn-blue"
                @click="showModal"
        >
            Create Order
        </button>
        <div v-if="loading">Loading…</div>
        <order-component v-else
                         v-bind:order="order"
                         v-show="isModalVisible"
                         @close="closeModal"
        />
    </div>
</template>

<script>
  import OrderComponent from "./OrderComponent";

  export default {
    name: "Dashboard",
    components: {OrderComponent},

    data() {
      return {
        loading: false,
        isModalVisible: false,
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
    computed: {
      order() {
        return this.$store.state.order
      }
    },

    created() {
      this.loading = true;
      this.$store.dispatch('fetchOrder')
        .then(order => {
          this.loading = false
        })
    }
  }
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


        &:focus {
            background: #2b44a4;
        }

    }
</style>
