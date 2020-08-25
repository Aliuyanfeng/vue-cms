 <template>
  <div class="goodsinfo-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :lunbotu="lunbotu" :imgname="'src'"></swipe>
        </div>
      </div>
    </div>
    <!-- 购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <span>
              <del>￥{{goodsinfo.market_price}}</del>
            </span>
            销售价：
            <span
              style="font-size:16px;font-weight:bolder;color:red"
            >￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>购买数量：<numberbox :max="goodsinfo.stock_quantity"></numberbox></p>
          <div>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}</p>
          <p>上架时间:{{goodsinfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer btnarea">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain style="margin-top:10px">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swipe from "../sub-components/swipe.vue";
import numberbox from "../sub-components/numberbox.vue";
export default {
  data() {
    return {
      lunbotu: [],
      goodsinfo: {},
    };
  },
  methods: {
    async getlunbotu() {
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) return (this.lunbotu = data.message);
    },
    async getgoodsinfobyid() {
      const { data } = await this.$http.get("/api/goods/getinfo/" + this.id);

      if (data.status === 0) return (this.goodsinfo = data.message[0]);
    },
  },
  created() {
    this.getlunbotu();
    this.getgoodsinfobyid();
  },
  props: ["id"],
  components: {
    swipe,
    numberbox,
  },
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eeeeee;
}
.btnarea {
  flex-direction: column;
}
</style>