<template>
  <div class="loading"
       v-show="data.isLoading">
    <Loading :progressNum="data.progressNum"></Loading>
  </div>

  <div class="product"
       v-show="!data.isLoading">
    <div class="prod-list"
         :class="{ hidden: store.state.isFullScreen }">
      <h1>
        <SketchOutlined></SketchOutlined>产品推荐
      </h1>
      <div class="products">
        <div class="prod-item"
             v-for="(prod, pDex) in data.products"
             :key="pDex"
             @click="changeModel(prod, pDex)"
             :class="{ active: pDex == data.prodDex }">
          <div class="prod-title">{{ prod.title }} </div>
          <div class="img">
            <img :src="prod.imgsrc"
                 :alt="prod.title">
          </div>
          <!-- .stop 阻止向上传递 -->
          <a-button type="primary"
                    block
                    @click.stop="addBuyCart(prod)">
            <template #icon>
              <ShoppingCartOutlined></ShoppingCartOutlined>
            </template>
            加入购物车
          </a-button>
        </div>
      </div>
    </div>
  </div>

  <div class="scene-list"
       :class="{ hidden: store.state.isFullScreen }"
       v-show="!data.isLoading">
    <h1>
      <RadarChartOutlined></RadarChartOutlined>切换使用场景
    </h1>
    <div class="scenes">
      <div class="scene-item"
           v-for="(scene, sDex) in data.scenes"
           :key="sDex"
           @click="changeHdr(scene, sDex)">
        <img :src="`./files/hdr/${scene}.jpg`"
             :alt="scene"
             :class="{ active: sDex == data.sceneDex }">
      </div>
    </div>
  </div>

  <div id="product"
       v-show="!data.isLoading">
    <template v-if="data.products[data.prodDex]">
      <div class="desc-list"
           v-for="(desc, i) in data.products[data.prodDex].desc"
           :key="i"
           :class="{active: data.descIndex == i}">
        <h1 class="title">{{desc.title}}</h1>
        <p class="content">{{desc.content}}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { getProducts } from "../api/index";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, reactive, onBeforeUnmount } from "vue";
import Loading from "@/components/Loading.vue";
import {
  SketchOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
import Base3d from "@/utils/base3d.js";

const route = useRoute();
const store = useStore();
const data = reactive({
  products: [],
  scenes: [],
  isLoading: true,
  prodDex: 0,
  sceneDex: 0,
  base3d: null,
  descIndex: 0,
  progressNum: 0,
});

function changeModel(prod, pDex) {
  console.log(prod, pDex, "changeModel");
  data.prodDex = pDex;
  data.base3d.setModel(prod.modelName);
}
function addBuyCart(prod) {
  let product = { ...prod, num: 1 };
  // 判断商品是否存在存在就累加，可以用es6 some
  let index = 0;
  let isExist = store.state.buyCarts.some((item, i) => {
    if (item.id == product.id) {
      index = i;
      return true;
    } else {
      return false;
    }
  });
  if (isExist) {
    store.commit("addBuyCartsNum", index);
  } else {
    store.commit("addBuyCarts", product);
  }
}

function changeHdr(scene, sDex) {
  console.log(scene, sDex, "changeHdr");
  data.sceneDex = sDex;
  data.base3d.setEnvMap(scene);
}

const loadingFinish = () => {
  data.isLoading = false;
};

onMounted(async () => {
  let result = await getProducts();
  // data.isLoading = false;
  data.products = result.list;
  data.scenes = result.hdr;

  data.base3d = new Base3d("#product", loadingFinish);
  data.base3d.onProgress((e) => {
    let num = e.loaded / e.total;
    num = num.toFixed(2) * 100;
    data.progressNum = num;
  });
});

window.addEventListener("mousewheel", (event) => {
  if (event.deltaY > 0) {
    // 向上滚动
    store.commit("setFullScreen", true);
  }
  if (event.deltaY < 0) {
    // 向下滚动
    store.commit("setFullScreen", false);
  }

  let duration = data.base3d.animateAction._clip.duration;
  let time = data.base3d.animateAction.time;
  let index = Math.floor((time / duration) * 4);
  data.descIndex = index;
});

onBeforeUnmount(() => {
  window.removeEventListener("mousewheel");
});
</script>

<style lang="scss" scoped>
.desc-list {
  position: fixed;
  background-color: rgba($color: #ffffff, $alpha: 0.6);
  padding: 15px;
  left: 50%;
  transform: translateX(-100vw);
  top: 100px;
  transition: all 0.5s;

  &.active {
    transform: translateX(-50%);
  }
}
.prod-list,
.scene-list {
  width: 300px;
  height: 100vh;
  padding: 90px 0 0;
  position: fixed;
  z-index: 1000;

  transition: all 0.5s;
  background-color: rgba(255, 255, 255, 0.8);
  top: 0;

  h1 {
    font-size: 20px;
    font-weight: 900;
    // padding: 10px 25px 0;
  }

  .products,
  .scenes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.prod-list {
  left: 0;

  h1 {
    padding: 10px 25px 0;
  }

  .products {
    .prod-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 250px;
      background-color: #fff;
      border-radius: 20px;
      overflow: hidden;
      margin: 20px 0;
      box-shadow: 5px 5px 10px #666;
      transition: all 0.3s;

      &.active {
        box-shadow: 5px 5px 10px #666, 0 0 20px red;
      }

      &:hover {
        transform: translate(0px, -5px);
        // background-color: orange;
        box-shadow: 5px 5px 10px #666, 0 0 20px orangered;
      }

      img {
        width: 190px;
      }

      .prod-title {
        padding: 0 20px;
      }
    }
  }
}

.prod-list.hidden {
  transform: translate(-100%, 0);
}

.scene-list {
  right: 0;

  h1 {
    padding: 0 30px;
  }

  .scene-item {
    padding: 12px 0;

    img {
      width: 250px;
      border-radius: 10px;
      box-shadow: 5px 5px 10px #666;
      transition: all 0.3s;

      &.active {
        box-shadow: 5px 5px 10px #666, 0 0 20px red;
      }

      &:hover {
        transform: translate(0px, -5px);
        box-shadow: 5px 5px 10px #666, 0 0 20px orangered;
      }
    }
  }
}

.scene-list.hidden {
  transform: translate(100%, 0);
}
</style>
