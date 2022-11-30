<script setup>
import ListItem from "./components/ListItem.vue";
import { ref, reactive } from "vue";
let artice = reactive({
  id: "11",
  num: 10,
  title: "父组件传参",
});
let articeList = reactive([
  {
    id: "12",
    num: 10,
    title: "父组件传参1",
  },
  {
    id: "13",
    num: 10,
    title: "父组件传参2",
  },
  {
    id: "14",
    num: 10,
    title: "父组件传参3",
  },
]);
</script>

<template>
  <ListItem :num="artice.num"
            :title="artice.title"></ListItem>
  <!-- 列表循环 -->
  <ListItem v-for="item in articeList"
            :key="item.id"
            :num="item.num"
            :title="item.title"></ListItem>
</template>

<style scoped>
</style>
