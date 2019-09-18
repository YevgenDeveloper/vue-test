import order from "./data/order";

const fetch = (mockData, time = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });
};

export default {
  fetchOrder() {
    return fetch(order, 1000);
  }
};
