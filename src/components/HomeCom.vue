<template>
  <div class="home-page">
    <HomeSwiper :banner="data.banner"></HomeSwiper>
    <div class="live">
      <h1>乐享生活100+</h1>
      <div class="live-list"
           v-if="data.sports.length !== 0">
        <div class="live-item"
             v-for="(item, index) in 10"
             :key="index">
          <div class=" live-bth">
            <img :src="data.sports[index].menuThumbnail"
                 :alt="data.sports[index].displayName">
            <h3>{{ data.sports[index].displayName }}</h3>
          </div>
        </div>
      </div>
      <a-button type="primary"
                size="large"
                @click="router.push('/product')">立即享受生活</a-button>
    </div>
  </div>
</template>

<script setup>
import { getHomePage } from "@/api/index";
import HomeSwiper from "./Home/HomeSwiper.vue";

import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

let result = await getHomePage();
console.log(result);
const data = reactive({
  banner: result.banner,
  sports: result.sports,
});
</script>

<style lang='scss' scoped>
.home-page {
  /**
   * 如果 postion 为 fixed 需要设置 padding-top
   * 否则为 stiky 不需要设置
   */
  // padding-top: 80px;

  position: relative;
  height: 575px;

  .live {
    width: 1200px;
    margin: 40px auto; //上下为40 左右居中
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // padding-bottom: 40px;

    h1 {
      font-size: 30px;
    }

    .live-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .live-item {
        width: 240px;

        .live-bth {
          display: flex;
          align-items: center;
          height: 73px;
          width: 200px;
          background-color: #fff;
          border-radius: 8px 8px 25px 8px;
          margin-bottom: 30px;
          box-shadow: 5px 5px 5px #ccc;

          position: relative;

          img {
            position: absolute;
            width: 80px;
            height: 80px;
            left: -15px;
            top: -15px;
          }

          h3 {
            font-weight: 900;
            font-size: 20px;
            padding-left: 80px;
          }
        }
      }
    }
  }
}
</style>
