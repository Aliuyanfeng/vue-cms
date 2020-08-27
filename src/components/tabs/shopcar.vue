<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-item">
            <mt-switch></mt-switch>
            <img src alt />
            <div class="info">
              <h1>aaaaa</h1>
              <div class="goods-info">
                <span class="price">2199</span>
                <nobox></nobox>
                <a href>del</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="danger">0</span>件，总价
                <span class="danger">￥0</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nobox from "../sub-components/shopcar_numbox.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    nobox,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-item {
    display: flex;
    img {
      border: 1px solid #333;
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 16px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-info {
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}
.danger {
  color: red;
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>