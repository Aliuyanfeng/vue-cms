<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../../lib/mui/js/mui.js";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {
    // console.log(this.max);
    mui("mui-numbox").numbox();
  },
  props: ["max"],
  watch: {
    max: function (newval) {
      mui(".mui-numbox").numbox().setOption("max", newval);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>