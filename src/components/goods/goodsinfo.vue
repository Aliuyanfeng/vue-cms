 <template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>

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
          <p>
            购买数量：
            <numberbox :max="goodsinfo.stock_quantity" @func="getSelectedCount"></numberbox>
          </p>
          <div>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addcart">加入购物车</mt-button>
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
        <!-- <router-link :to="'/home/goodsdesc/'+id">
          <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        </router-link>-->
        <!-- 使用编程式导航 -->
        <mt-button type="primary" size="large" plain @click="godesc">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain style="margin-top:10px" @click="gocomment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swipe from "../sub-components/swipe.vue";
import numberbox from "../sub-components/numberbox.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      lunbotu: [],
      goodsinfo: {},
      flag: false,
      selectedCount: 1,
    };
  },
  methods: {
    ...mapMutations(["addtocart"]),
    async getlunbotu() {
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) return (this.lunbotu = data.message);
    },
    async getgoodsinfobyid() {
      const { data } = await this.$http.get("/api/goods/getinfo/" + this.id);

      if (data.status === 0) return (this.goodsinfo = data.message[0]);
    },
    godesc() {
      // 点击按钮跳转详述页面
      this.$router.push("/home/goodsdesc/" + this.goodsinfo.id);
    },
    gocomment() {
      this.$router.push("/home/goodscomment/" + this.goodsinfo.id);
    },
    addcart() {
      this.flag = !this.flag;
      //调用mutations
      // this.$store.commit("addtocart", {
      //   id: this.id,
      //   count: this.selectedCount,
      // });
      this.addtocart({
        id: this.id,
        count: this.selectedCount,
        selected: true,
        price:this.goodsinfo.sell_price
      });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //动态获取小球坐标
      const ballPos = el.getBoundingClientRect();
      const badgePos = document.getElementById("badge").getBoundingClientRect();
      const left = badgePos.left - ballPos.left;
      const top = badgePos.top - ballPos.top;
      el.style.transform = "translate(" + left + "px," + top + "px)";
      el.style.transition = "all 1s cubic-bezier(.46,-0.4,1,.49)";
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    getSelectedCount(c) {
      this.selectedCount = c;
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
.ball {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  left: 152px;
  top: 370px;
}
</style>