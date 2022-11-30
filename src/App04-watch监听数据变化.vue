<script setup>
import { ref, reactive, computed, watch } from 'vue'
let msg = ref("哈哈哈1");
let user = reactive({
  name: "PanHuang"
});

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

watch(msg, (nVal, oVal) => {
  console.log(nVal,"nVal")
  console.log(oVal,"oVal")
})
watch([msg, () => user.name], (nVal, oVal) => {
  console.log(nVal,"nVal")
  console.log(oVal,"oVal")
})
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
