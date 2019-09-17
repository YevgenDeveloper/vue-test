<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal"
                 role="dialog"
                 aria-labelledby="modalTitle"
                 aria-describedby="modalDescription"
            >
                <header
                        class="modal-header"
                        id="modalTitle"
                >
                    <img v-bind:src="order.images.full_size"/>
                    <button
                            type="button"
                            class="btn-close"
                            @click="close"
                            aria-label="Close modal"
                    >
                        <Arrow/>
                    </button>
                </header>
                <section
                        class="modal-body"
                        id="modalDescription"
                >
                    <h2 class="order-title">
                        <slot name="order-title">
                            {{order.order.name}}
                        </slot>
                    </h2>
                    <div class="order-site-url">
                        <span class="badge">
                        <slot name="order-site-url">
                            {{order.order.publication}}
                        </slot>
                        </span>
                    </div>
                    <div class="order-body">
                        <div class="order-body-desc">
                            <slot name="order-body">
                                {{order.order.description}}
                            </slot>
                        </div>
                        <hr>
                        <div class="order-details">
                            <div v-for="order_detail in order.order_details" class="order-body-form-input" :key="order_detail.id">
                                <span class="input-label">{{order_detail.name}}</span>
                                <input v-if="order_detail.placeholder !== 'select'" v-model="source" v-bind:placeholder="order_detail.placeholder">
                                <select v-else v-model="writers">
                                    <option value="" disabled selected>{{order_detail.placeholder}}</option>
                                    <option v-for="n in 15" v-bind:value="n">
                                        {{ n }}
                                    </option>
                                </select>
                            </div>
                            <div class="order-body-form-input">
                                <span class="input-label">Instructions</span>
                                <textarea v-model="instructions" placeholder="enter your instructions"></textarea>
                            </div>
                            <div class="order-body-form-input-group">
                                <div class="order-body-form-input">
                                    <span class="input-label">Number of writers</span>
                                    <select v-model="writers">
                                        <option v-for="n in 15" v-bind:value="n">
                                            {{ n }}
                                        </option>
                                    </select>
                                </div>
                                <div class="order-body-form-input">
                                    <span class="input-label">Budget (USD)</span>
                                    <div class="budget-input-wrapper">
                                        <span class="currency">$</span>
                                        <input type="number" v-model="source" placeholder="enter a budget">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="additional-options">
                            <div class="additional-options-title">Please select options (optional)</div>
                            <div class="additional-options-block">
                                <div class="additional-option">
                                    <span class="additional-option-title">Bilingual</span>
                                    <span class="additional-option-increase">(add 20%)</span>
                                    <span class="additional-option-radio">
                                        <input id="bilingual" value="20%" type="checkbox" v-model="checkedOptions">
                                    </span>
                                </div>
                                <div class="additional-option">
                                    <span class="additional-option-title">Proof-reading</span>
                                    <span class="additional-option-increase">(add 10%)</span>
                                    <span class="additional-option-radio">
                                        <input id="proof-reading" value="10%" type="checkbox" v-model="checkedOptions">
                                    </span>
                                </div>
                                <div class="additional-option">
                                    <span class="additional-option-title">Copy-editing</span>
                                    <span class="additional-option-increase">(add $20)</span>
                                    <span class="additional-option-radio">
                                        <input id="copy-editing" value="20" type="checkbox" v-model="checkedOptions">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-footer">
                    <button
                            type="button"
                            class="btn-blue"
                            @click="close"
                            aria-label="Close modal"
                    >
                        <Cart/>
                        <span>Submit</span>
                        <span class="total-price">$ {{35}} </span>
                    </button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
  import Arrow from "./common/Arrow";
  import Cart from "./common/Cart";

  export default {
    name: 'Modal',
    components: {Cart, Arrow},
    data() {
      return {
        source: '',
        writers: '',
        instructions: '',
        checkedOptions: []
      }
    },
    props: {
      order: {
        type: Object,
        default: () => null
      }
    }
    ,
    methods: {
      close() {
        this.$emit('close');
      },
    },
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
        background: #FFFFFF;
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
        color: #4AAE9B;
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
        color: #4AAE9B;
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
            background: #2b44a4;

        }
    }

    .order-title {
        font-weight: 600;
        margin: 0px;
    }

    .badge {
        color: #4AAE9B;
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
            padding: 7px
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
            max-width: 100%;
            display: block;
            padding-left: 25px;
            padding-right: 0px;
        }
    }

    .additional-options {

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
</style>
