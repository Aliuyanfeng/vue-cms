<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goods-item">
            <mt-switch
              v-model="selectedobj[item.id]"
              @change="changeselect(item.id,selectedobj[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{item.title}}</h1>
              <div class="goods-info">
                <span class="price">${{item.sell_price}}</span>
                <nobox :initcount="countobj[item.id]" :id="item.id"></nobox>
                <a href="#" @click.prevent="del(item.id)">删除</a>
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
                <span class="danger">{{selectedcount}}</span>件，总价
                <span class="danger">￥{{amount}}</span>
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
import { mapGetters, mapMutations } from "vuex";
import nobox from "../sub-components/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [],
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    ...mapMutations(["delfromcart", "changeselectstate"]),
    async getgoodslist() {
      if (this.idstr.length <= 0) return;
      const { data } = await this.$http.get(
        "/api/goods/getshopcarlist/" + this.idstr
      );
      if (data.status === 0) return (this.goodslist = data.message);
    },
    del(id) {
      console.log(id);
      this.goodslist.some((item, i) => {
        if (item.id == id) {
          this.goodslist.splice(i, 1);
          return true;
        }
      });
      this.delfromcart(id);
    },
    changeselect(id, select) {
      this.changeselectstate({ id, selected: select });
    },
  },
  components: {
    nobox,
  },
  computed: {
    ...mapGetters(["idstr", "countobj", "selectedobj",'selectedcount','amount']),
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