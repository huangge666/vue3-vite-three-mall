<script setup>
import { ref, reactive } from "vue";
let msg = ref("常见指令与样式");
let className = ref("box2")
let html = ref("<span>这是html</span>")

const clickEvent = (msg) => {
  console.warn(msg);
}
</script>

<template>
  <div>
    <!-- :title 相等于 v-bing:title -->
    <h3 class="box" :title="msg" v-bind:class="className">{{msg}}</h3>
    <div class="box" :class="className"></div>
    <div class="box" :class="{className: true}"></div>
    <div class="box" :class="[{className: true}, 'hhh']"></div>
    <div v-html="html"></div>

    <!-- @click 相等于 v-on:click -->
    <button v-on:click="clickEvent('全写监听事件')">监听点击事件</button>
    <button @click="clickEvent('简写监听事件')">监听点击事件</button>
  </div>
</template>

<style scoped>
.box{
  width: 100px;
  height: 100px;
  background-color: red;
  color: #ffffff;
}
.box + .box{
  margin-top: 10px;
}
.box2 {
  background-color: blue;
}
</style>
