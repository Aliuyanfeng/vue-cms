<template>
  <div class="container">
    <h3 class="title">{{photoinfo.title}}</h3>
    <p class="info">
      <span>发表时间:{{photoinfo.add_time | dataformat}}</span>
      <span>点击次数：{{photoinfo.click}}</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <div class="thumb-img-list">
      <img
        class="preview-img"
        v-for="(item, index) in photolist"
        :src="item.src"
        height="100"
        @click="$preview.open(index, photolist)"
        :key="index"
      />
    </div>

    <div class="content" v-html="photoinfo.content"></div>

    <comment :newsid="id"></comment>
  </div>
</template>
<script>
//导入缩略图需要的脚本

import comment from "../sub-components/comment.vue";
export default {
  data() {
    return {
      photoinfo: {},
      photolist: {},
    };
  },

  methods: {
    async getphotoinfo() {
      //调用一个异步的方法 同时方法返回值是promise对象
      const { data } = await this.$http.get("/api/getimageInfo/" + this.id);
      if (data.status === 0) return (this.photoinfo = data.message[0]);
    },
    async getthumbimg() {
      const { data } = await this.$http.get("/api/getthumimages/" + this.id);
      if (data.status === 0) {
        data.message.forEach((item) => {
          item.w = 600;
          item.h = 400;
        });
        this.photolist = data.message;
      }
    },
  },
  created() {
    this.getphotoinfo();
    this.getthumbimg();
  },
  props: ["id"],
  components: {
    comment,
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
  color: #2a62f2;
}
.info {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
.content {
  text-indent: 2em;
  line-height: 1.5em;
}
.container {
  padding: 10px;
}
.thumb-img-list {
  img{
    box-shadow: 0 0 7px gray;
    margin-left: 15px;
  }
}
</style>