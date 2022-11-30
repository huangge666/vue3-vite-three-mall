<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
let msg = ref("哈哈哈1");

const resoveMsg = () => {
  msg.value = msg.value.split("").reverse().join("");
}
</script>

<template>
  <div>
    <span>{{msg}}</span>
    <button @click="resoveMsg">反转</button>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
