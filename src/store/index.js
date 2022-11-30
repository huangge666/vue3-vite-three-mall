import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isFullScreen: false,
      buyCarts: [],
    }
  },
  getters: {
    totalPrice (state) {
      return state.buyCarts.reduce((pre, now, list) => {
        return pre + now.price * now.num;
      }, 0)
    },
  },
  mutations: {
    setFullScreen (state, payload) {
      state.isFullScreen = payload
    },
    addBuyCarts (state, payload) {
      state.buyCarts.push(payload);
    },
    addBuyCartsNum (state, payload) {
      state.buyCarts[payload].num++;
    },
    minusBuyCartsNum (state, payload) {
      state.buyCarts[payload].num--;
      if (state.buyCarts[payload].num == 0) {
        state.buyCarts.splice(payload, 1);
      }
    },
  },
  actions: {

  },
})

// 3.导出store
export default store;
