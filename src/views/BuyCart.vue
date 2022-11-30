<script setup>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const totalPrice = computed(() => store.getters.totalPrice);
</script>

<template>
  <h3>购物车</h3>
  <div>当前有{{store.getters.getCount}}件商品</div>
  <div>总价为：{{totalPrice}}</div>
</template>

<style scoped>
</style>
