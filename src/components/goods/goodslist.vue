<template >
  <div>
    <div class="goods-list">
      <router-link
        tag="div"
        :to="'/home/goodsinfo/'+item.id"
        class="goods-item"
        v-for="item in goodslist"
        :key="item.id"
      >
        <img :src="item.img_url" />
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="new">${{item.sell_price}}</span>
            <span class="old">${{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余{{item.stock_quantity}}件</span>
          </p>
        </div>
      </router-link>
      <mt-button type="danger" size="large" style="margin-top:10px" plain @click="getmore()">加载更多</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1, //莫惹你第一页
      goodslist: [],
      isloaded: false,
    };
  },
  methods: {
    async getgoodslistbypage() {
      const { data } = await this.$http.get(
        "/api/getgoods?pageindex=" + this.page
      );
      if (data.status === 0) {
        if (data.message.length <= 0) {
          this.isloaded = true;
        }
        this.goodslist = this.goodslist.concat(data.message);
      }
    },
    async getmore() {
      if (this.isloaded) return;
      this.page++;
      this.getgoodslistbypage();
    },
  },
  created() {
    this.getgoodslistbypage();
  },
};
</script>
<style lang="scss" scoped>
.goods-list {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 0;
  .goods-item {
    width: 49%;
    border: 1px solid #333;
    margin-top: 5px;
    padding: 2px;
    box-shadow: 0 0 7px gray;
    img {
      width: 100%;
      height: 170px;
    }
    .title {
      font-size: 14px;
      height: 40px;
    }
    .info {
      background-color: #cccccc;
      overflow: hidden;
      .price {
        .new {
          color: red;
          font-size: 18px;
          font-weight: bolder;
        }
        .old {
          color: #6c6c6c;
          font-size: 16px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>