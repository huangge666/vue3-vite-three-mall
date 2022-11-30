<script setup>
import Loading from "@/components/Loading.vue";
import { defineAsyncComponent } from "vue";
import { getHomePage } from "../api/index";

const HomeAsync = defineAsyncComponent(() =>
  import("../components/HomeCom.vue")
);
</script>

<template>
  <Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <HomeAsync></HomeAsync>

    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback>
      <Loading></Loading>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.home {
  color: red;
}
</style>
