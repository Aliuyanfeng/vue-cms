<template>
  <div class="newsinfo-container">
    <h3>{{newsinfo.title}}</h3>
    <p class="info">
        <span>{{newsinfo.add_time | dataformat}}</span>
        <span>点击{{newsinfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论子组件 -->
    <comment :newsid="id"></comment>
  </div>
</template>
<script>
import comment from '../sub-components/comment.vue'
export default {
  data() {
    return {
        newsinfo:{}
    };
  },
  methods: {
    async getnewsinfo() {
      const { data } = await this.$http.get("/api/getnew/" + this.id);
      if(data.status === 0) return this.newsinfo = data.message[0]
    },
  },
  created(){
      this.getnewsinfo()
  },
  props: ["id"],
  components:{
      //私有子组件
      comment:comment
  }
};
</script>
<style lang="scss" scoped>
    .newsinfo-container{
        padding: 5px;
        h3{
            font-size: 16px;
            text-align: center;
            color: black;
            margin: 15px 0px;
        }
        .info{
            color: cadetblue;
            display: flex;
            justify-content: space-between;
        }
    }
</style>