<script setup>
import { ref, reactive } from 'vue'
let user1 = ref({
  username: "PanHuang",
  age: 18,
});

const setUserAge = () => {
  // user1.age = 14;  // 因为代理不是在值本身上而是在 .value上
  user1.value.age = 14;
}

let user2 = reactive({
  username: "Pan",
  age: 18,
});

const setUsername = () => {
  user2.username = "Huang";
}

</script>

<template>
  <div>
    <div>姓名：{{user1.username}}</div>
    <div>年龄：{{user1.age}}</div>
    <button @click="setUserAge">年龄变化</button>
    <div>老师：{{user2.username}}</div>
    <button @click="setUsername">变化</button>
  </div>
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
