<template>
  <h1 @click="emitRead()">
    <span>{{num}}</span>
    <br />
    <span>{{title}}</span>
  </h1>
</template>

<script setup>
// let num = 1;
// let title = "哈哈";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  num: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    default: "哈哈",
  },
});

const emit = defineEmits(["readArtice"]);
const emitRead = () => {
  emit("readArtice", props.title);
};
</script>

<style scoped>
</style>
