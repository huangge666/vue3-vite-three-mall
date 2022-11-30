<template>
  <div class="header theme" :class="data.theme, { hidden: store.state.isFullScreen }">
    <div class="change-theme">
      <span>切换主题:</span>
      <a-switch :checked="data.theme === 'dark'" checked-children="Dark" un-checked-children="Light"
        @change="changeTheme" class="switch-theme" />
    </div>
    <div class="logo" @click="router.push('/')">
      <img :src="getImageUrl('@/assets/logo.png')" alt="logo">
    </div>
    <a-input-search v-model:value="data.value" placeholder="搜索商品和商品号" class="input-search" @search="onSearch" />

    <a-menu v-model:selectedKeys="data.current" mode="horizontal" class="menu" :theme="data.theme">
      <a-menu-item key="help">
        <template #icon>
          <question-circle-outlined />
        </template>
        帮助
      </a-menu-item>
      <a-menu-item key="salesRoom">
        <template #icon>
          <shop-outlined />
        </template>
        门店
      </a-menu-item>
      <a-sub-menu key="account">
        <template #icon>
          <user-outlined />
        </template>
        <template #title>账户</template>
      </a-sub-menu>
      <a-sub-menu key="buyCart">
        <template #icon>
          <shopping-cart-outlined />
        </template>
        <template #title>购物车</template>
        <a-menu-item-group title="购物商品">
          <a-menu-item v-for="(item, index) in store.state.buyCarts" :key="index">
            <div class="prod-item">
              <div class="left">
                <img :src="item.imgsrc" :alt="item.title">
              </div>

              <div class="middle">
                <div class="title">{{ item.title }}</div>
                <div class="content">
                  <span>数量：{{ item.num }}</span>
                  <div class="control">
                    <span class="btn" @click.stop="store.commit('addBuyCartsNum', index)">+</span>
                    <span class="btn" @click.stop="store.commit('minusBuyCartsNum', index)">-</span>
                  </div>
                </div>
              </div>

              <div class="right">
                <div class="price">￥ {{ item.price * item.num }}</div>
              </div>
            </div>
          </a-menu-item>
          <a-menu-item key="totalPrice">
            <div class="total">
              <span>总价：</span>
              <span class="num">￥{{ store.getters.totalPrice }}</span>
            </div>
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'
import { defineComponent, ref, reactive } from 'vue';
import { QuestionCircleOutlined, ShopOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { getImageUrl } from "@/utils/resolveUrl"

const router = useRouter();
const store = useStore()
const data = reactive({
  theme: 'light',
  value: '',
  current: ["help"],
})

const changeTheme = checked => {
  data.theme = checked ? 'dark' : 'light';
};

const onSearch = () => {

}
</script>
<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  // position: stiky;
  z-index: 1000000;

  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
  font-size: 18px;

  padding: 0 20px;

  transition: all 0.5s; //加一个过度的效果

  .change-theme {
    .switch-theme {
      margin-left: 10px;
    }
  }

  .logo {
    margin: 0 20px;

    img {
      height: 60px;
    }
  }

  .input-search {
    display: flex;
    align-items: center;
    flex: 1;
    border-width: 10px;
  }

  .menu {
    display: flex;
    align-items: center;
    height: 80px;
    font-size: 16px;
  }
}

.header.hidden {
  transform: translate(0, -100%);
}
</style>
