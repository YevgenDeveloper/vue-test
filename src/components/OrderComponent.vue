<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <form @submit="checkForm">
          <header class="modal-header" id="modalTitle">
            <img :src="images.full_size" />
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >
              <Arrow />
            </button>
          </header>
          <section class="modal-body" id="modalDescription">
            <h2 class="order-title">
              <slot name="order-title">
                {{ order.name }}
              </slot>
            </h2>
            <div class="order-site-url">
              <span class="badge">
                <slot name="order-site-url">
                  {{ order.publication }}
                </slot>
              </span>
            </div>
            <div class="order-body">
              <div class="order-body-desc">
                <slot name="order-body">
                  {{ order.description }}
                </slot>
              </div>
              <hr />
              <div class="order-details">
                <div
                  v-for="(orderDetail, key) in orderDetails"
                  class="order-body-form-input"
                  :key="orderDetail.id"
                  :class="lastTwoItemsClass(key, orderDetails.length)"
                >
                  <span class="input-label">{{ orderDetail.name }}</span>
                  <span v-if="errors[orderDetail.name]" class="error-message">{{
                    errors[orderDetail.name]
                  }}</span>
                  <input
                    v-if="orderDetail.name === 'source'"
                    v-model="source"
                    :placeholder="orderDetail.placeholder"
                  />
                  <select
                    v-else-if="orderDetail.name === 'number_writers'"
                    v-model="number_writers"
                  >
                    <option value="" disabled selected v-bind:key="0"
                      >{{ orderDetail.placeholder }}
                    </option>
                    <option v-for="n in 15" v-bind:value="n" v-bind:key="n">
                      {{ n }}
                    </option>
                  </select>
                  <textarea
                    v-else-if="orderDetail.name === 'instructions'"
                    v-model="instructions"
                    :placeholder="orderDetail.placeholder"
                  ></textarea>
                  <div
                    v-else-if="orderDetail.name === 'budget'"
                    class="budget-input-wrapper"
                  >
                    <span class="currency">$</span>
                    <input
                      type="number"
                      v-model="budget"
                      :placeholder="orderDetail.placeholder"
                      min="2"
                      max="500"
                    />
                  </div>
                </div>
              </div>
              <div class="additional-options">
                <div class="additional-options-title">
                  Please select options (optional)
                </div>
                <div class="additional-options-block">
                  <div
                    v-for="option in options"
                    :key="option.id"
                    class="additional-option"
                  >
                    <span class="additional-option-title">{{
                      option.name
                    }}</span>
                    <span class="additional-option-increase"
                      >(add {{ increaseData(option) }})</span
                    >
                    <span class="additional-option-radio">
                      <input
                        :id="option.name.toLowerCase()"
                        :value="increaseData(option)"
                        type="checkbox"
                        v-model="checkedOptions"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-footer">
            <button type="submit" class="btn-blue" aria-label="Close modal">
              <Cart />
              <span>Submit</span>
              <span class="total-price">$ {{ price }} </span>
            </button>
          </footer>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import Arrow from "./common/Arrow";
import Cart from "./common/Cart";

export default {
  name: "Modal",
  components: { Cart, Arrow },
  data() {
    return {
      source: null,
      number_writers: null,
      instructions: null,
      budget: null,
      checkedOptions: [],
      errors: []
    };
  },
  props: {
    order: Object,
    images: Object,
    orderDetails: Array,
    options: Array,
    onChange: Function
  },
  methods: {
    close() {
      this.$emit("close");
    },
    lastTwoItemsClass(currentIndex, length) {
      return currentIndex === length - 1 || currentIndex === length - 2
        ? "last-two-inputs"
        : "";
    },
    increaseData(option) {
      if (option.hasOwnProperty("price")) {
        return option.price + "$";
      }
      return option.increase + "%";
    },
    calculate(amount, options) {
      let price = amount;
      for (let i = 0, count = options.length; i < count; i++) {
        if (options[i].key === "$") {
          price += options[i].value;
        } else {
          price += (options[i].value * price) / 100;
        }
      }
      return price.toString().indexOf(".") === -1 ? price : price.toFixed(2);
    },
    convertOptions() {
      return this.checkedOptions.map(option => ({
        key: option[option.length - 1],
        value: parseInt(option)
      }));
    },
    validUrl(str) {
      let pattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return !!pattern.test(str);
    },
    checkForm(e) {
      this.errors = {};

      if (!this.validUrl(this.source)) this.errors.source = "URL not valid!";

      if (this.budget < 2 || this.budget > 500)
        this.errors.budget = "Budget should be a number between 5 and 500!";

      if (this.number_writers < 1 || this.number_writers > 15)
        this.errors.number_writers =
          "Writers should be a number between 1 and 15!";

      if (
        typeof this.instructions !== "string" ||
        this.instructions.split(" ").length > 30
      )
        this.errors.instructions =
          "Instructions should be text with no more than 30 words!";

      if (!Object.keys(this.errors).length) {
        return true;
      }

      e.preventDefault();
    }
  },
  computed: {
    price() {
      let price = this.number_writers * this.budget;
      let options = this.convertOptions();

      return this.calculate(price, options);
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 450px;
  max-height: 95vh;
}

.modal-header,
.modal-footer {
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
  width: 450px;
  position: relative;
  height: 200px;

  img {
    object-fit: cover;
    width: 100%;
  }
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 20px;
  text-align: left;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;

  &:focus {
    outline: none;
  }
}

.btn-blue {
  color: white;
  background: #3e61fe;
  border: none;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 24px;
  line-height: 1;
  transition: background-color 0.2s;
  &:focus {
    outline: none;
  }
  &:active {
    background: #2b44a4;
  }
}

.order-title {
  font-weight: 600;
  margin: 0px;
}

.badge {
  color: #4aae9b;
  display: inline-block;
  background-color: #f5f5f5;
  padding: 3px 7px;
  border-radius: 7px;
}

.order-body-desc {
  margin-top: 20px;
  font-weight: 700;
  color: #3e61fe;
}

hr {
  height: 3px;
  background-color: #f5f5f5;
  border: none;
}

.order-body-form-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input,
  textarea,
  select {
    border: none;
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }

  select {
    padding: 7px;
  }
}

.input-label {
  margin-bottom: 5px;
}

.order-body-form-input-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;

  & > .order-body-form-input {
    flex-basis: 50%;
    width: 50%;
  }

  & > .order-body-form-input:first-child {
    margin-right: 5px;
  }

  & > .order-body-form-input:last-child {
    margin-left: 5px;
  }
}

.budget-input-wrapper {
  position: relative;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 6px;
  align-items: center;
  max-width: 100%;

  .currency {
    position: absolute;
    left: 10px;
    top: 8px;
    font-style: inherit;
  }

  input {
    min-width: 100%;
    max-width: 100%;
    display: block;
    padding-left: 25px;
    padding-right: 0px;
  }
}

.additional-options {
  margin-top: 20px;
}

.additional-options-title {
  background-color: #d4d4d4;
  margin: 0 -10px;
  padding: 0 10px;
  font-weight: 700;
  line-height: 31px;
}

.additional-option {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #f5f5f5;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  span {
    display: flex;
    flex-basis: 33.3%;
    width: 33.3%;
    justify-content: center;

    &:first-child {
      justify-content: flex-start;
    }
  }
}

.additional-option-increase {
  color: #cacaca;
}

.last-two-inputs {
  display: inline-flex;
  flex-basis: 50%;
  width: 50%;
  box-sizing: border-box;
  padding-right: 5px;

  &:last-child {
    padding-right: 0px;
    padding-left: 5px;
  }
}
.error-message {
  font-size: 10px;
  color: #ff000b;
}
</style>
