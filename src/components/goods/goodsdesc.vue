<template>
  <div class="goodsdesc-container">
    <h3 class="title">{{info.title}} {{id}}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {
    async getgoodsdesc() {
      const { data } = await this.$http.get("/api/goods/getdesc/" + this.id);
      if (data.status === 0) return (this.info = data.message[0]);
    },
  },
  created() {
    this.getgoodsdesc();
  },
  props: ["id"],
};
</script>
<style lang="scss" >
.goodsdesc-container {
  .title {
    font-size: 14px;
    color: blue;
    text-align: center;
    margin: 10px 0;
  }
  .content {
    img {
      width: 100%;
      
    }
  }
}
</style>