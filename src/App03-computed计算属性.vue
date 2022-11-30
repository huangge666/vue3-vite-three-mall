<script setup>
import { ref, reactive, computed } from 'vue'
let msg = ref("哈哈哈1");

const getMsg = computed(() => {
  return msg.value.split(",").reverse().join();
})

const getMsg2 = computed({
  get: () => msg.value.split(",").reverse().join() + "getMsg2",
  set: (val) => {
    msg.value = val;
  }
})
const setMsg = (name) => {
  getMsg2.value = name;
  console.log(msg,"msg");
}
</script>

<template>
  <div>
  {{getMsg}}
  <div>{{getMsg2}}</div>
  <button @click="setMsg('测试')">改变</button>
  </div>
</template>

<style scoped>
</style>
