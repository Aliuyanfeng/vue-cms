<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id===0?'mui-active':'']"
            v-for="item in photocategory"
            :key="item.id"
            @tap="getphotobycategory(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <ul class="lazyul">
      <router-link
        tag="li"
        v-for="item in photolist"
        :key="item.id"
        :to="'/home/photoinfo/' + item.id"
      >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}--{{item.id }}</h1>
          <div class="info-content">{{item.content}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      photocategory: [],
      photolist: [],
    };
  },
  created() {
    this.getphotocategory();
    this.getphotobycategory(0);
  },
  methods: {
    async getphotocategory() {
      const { data } = await this.$http("/api/getimgcategory");
      if (data.status === 0) {
        data.message.unshift({
          title: "全部",
          id: 0,
        });
        return (this.photocategory = data.message);
      }
    },
    async getphotobycategory(id) {
      const { data } = await this.$http.get("/api/getimages/" + id);
      if (data.status === 0) return (this.photolist = data.message);
    },
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
};
</script>
<style lang="scss" scoped>
//设置全局css
* {
  touch-action: pan-y;
}
.lazyul {
  margin: 0;
  padding: 10px;
  li {
    position: relative;
    background-color: #6c6c66;
    text-align: center;
    box-shadow: 0 0 7px gray;
    &:not(:nth-of-type(1)) {
      margin-top: 10px;
    }
    img {
      vertical-align: middle;
      width: 100%;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      position: absolute;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      max-height: 100px;
      overflow: hidden;
      .info-title {
        font-size: 14px;
        font-weight: bolder;
        color: #ffffff;
      }
      .info-content {
        font-size: 12px;
        color: #ffffff;
        text-align: left;
        text-indent: 2em;
      }
    }
  }
}
</style>