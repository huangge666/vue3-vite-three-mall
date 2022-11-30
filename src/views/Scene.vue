<script setup>
import Base3d from "@/utils/base3d.js";
import { onMounted } from "vue";

onMounted(() => {
  const data = new Base3d(".scene");
});

</script>

<template>
  <div class="scene"></div>
</template>

<style lang="scss" scoped>
</style>
