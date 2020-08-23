<template>
  <div>
    <h4>发表评论</h4>
    <hr />
    <textarea placeholder="请输入要吐槽的内容--120" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postmsg()">发表评论</mt-button>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in cmtlist" :key="i">
        <div
          class="cmt-item-title"
        >第{{i+1}}楼&nbsp;用户:{{item.user_name}}&nbsp;发表时间:{{item.add_time | dataformat}}</div>
        <div class="cmt-item-body">{{item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="loadmore()">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      page: 1,
      cmtlist: [],
      msg: "", //即将发表的
    };
  },
  created() {
    this.getcommentbypage();
  },
  methods: {
    async getcommentbypage() {
      const { data } = await this.$http.get(
        "/api/getcomments/" + this.newsid + "?pageindex=" + this.page
      );
      //   console.log(data)
      if (data.status === 0)
        return (this.cmtlist = this.cmtlist.concat(data.message));
    },
    async loadmore() {
      this.page += 1;
      this.getcommentbypage();
    },
    async postmsg() {
      if (this.msg.trim().length <= 0) return Toast("评论不能为空");
      const { data } = await this.$http.post(
        "/api/postcomment/" + this.newsid,
        {
          content: this.msg.trim(),
        }
      );
      if (data.status === 0) {
        this.cmtlist.unshift({
          username: "葫芦娃",
          add_time: new Date(),
          content: this.msg.trim(),
        });
        this.msg = "";
      }
    },
  },
  props: ["newsid"],
};
</script>
<style lang="scss" scoped>
textarea {
  font-size: 14px;
}
.cmt-list {
  margin-top: 4px;
  .cmt-item {
    line-height: 30px;
    .cmt-item-title {
      font-size: 14px;
      background-color: #ddd;
    }
    .cmt-item-body {
      font-size: 12px;
      text-indent: 2em;
    }
  }
}
</style>