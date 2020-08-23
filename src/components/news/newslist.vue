<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link class="mui-navigate-right" :to="'/home/newsinfo/'+ item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dataformat('YYYY-MM-DD')}}</span>
              <span>浏览：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newslist: [],
    };
  },
  created() {
    this.getnewslist();
  },
  methods: {
    async getnewslist() {
      const { data } = await this.$http.get("/api/getnewslist");
      if (data.status === 0) return (this.newslist = data.message);
    },
  },
};
</script>
<style lang="scss" scoped>
.mui-media-body {
  h1 {
    font-size: 16px;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mui-ellipsis {
    color: #6c6c6c;
    display: flex;
    justify-content: space-between;
  }
}
</style>