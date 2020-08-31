<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      ref="nobox"
      @change="countchanged"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../../lib/mui/js/mui.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.max);
    mui(".mui-numbox").numbox();
  },
  methods: {
    countchanged() {
      const val = parseInt(this.$refs.nobox.value);
      this.updategoodscount({ id: this.id, count: val });
    },
    ...mapMutations(["updategoodscount"]),
  },
  created() {},

  props: ["initcount", "id"],
};
</script>
<style lang="scss" scoped>
</style>