<template>
  <div class="home-swiper">
    <!-- <div class="swiper-bg" :style="{ backgroundColor: data.bgColor }"></div> -->
    <!-- vue3.2中引入了 style v-bind 新特性 -->
    <div class="swiper-bg"></div>
    <a-carousel arrows autoplay :beforeChange="changeFn">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div class="swiper-item" v-for="(item, index) in props.banner" :key="index">
        <div class="swiper-box">
          <div class="banner-left">
            <h3 :style="{ color: item.text_color }">{{ item.desktop_sub_title || item.sub_title }}</h3>
            <h1 :style="{ color: item.text_color }">{{ item.desktop_title || item.title }}</h1>
          </div>
          <div class="banner-right">
            <img :src="`https://pixl.decathlon.com.cn/${item.picture_desktop}/banner.jpg`"
              :alt="item.desktop_title || item.title">
          </div>
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { reactive, defineProps } from 'vue'

/**
 * defineProps 可导入也可不导入
 * Vue3新版本中有了这个（编译宏）不需要进行导入
 *
 * [@vue/compiler-sfc] `defineProps` is a compiler macro and no longer needs to be imported.
 */
const props = defineProps({
  banner: Array,
})

let data = reactive({
  bgColor: props.banner[0].bg_color,
})
console.log(props);

function changeFn(from, to) {
  data.bgColor = props.banner[to].bg_color
}
</script>
<style lang='scss' scoped>
.swiper-bg {
  position: absolute;
  display: block;
  width: 100%;
  height: 575px;
  // background-color: orangered;
  background-color: v-bind("data.bgColor");
  transform-origin: 0 0; //左上角
  transform: skew(0, -8deg);
  transition: all 0.5s;
}

.swiper-item {
  height: 575px;

  .swiper-box {
    display: flex;
    min-width: 1200px;
    justify-content: center;

    .banner-left {
      width: 340px;
      padding-right: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 100px;
      text-align: right;
    }

    h3 {
      font-size: 30px;
      font-weight: 900;
      margin: 0;
      line-height: 40px;
    }

    h1 {
      font-size: 60px;
      font-weight: 900;
      margin: 0;
      line-height: 70px;
    }

    .banner-right {
      margin-top: 45px;
      transform-origin: 0 100%; //左下角
      transform: skew(0, -8deg);
      overflow: hidden;
      border-radius: 20px;
      border-bottom-right-radius: 80px;

      img {
        transform-origin: 0 100%;
        transform: skew(0, 8deg); //负负得正
        border-radius: 20px;
      }
    }
  }
}

/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 575px;
  line-height: 575px;
  // background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>
