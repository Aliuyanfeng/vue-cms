<template>
  <div class="mui-numbox" data-numbox-min="1" >
    <button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1"  ref="nobox" @change="countchanged"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
  </div>
</template>
<script>
import mui from "../../../lib/mui/js/mui.js";
export default {
  data() {
    return {};
  },
  methods: {
    countchanged(){
      const val = this.$refs.nobox.value 
    }   
  },
  created() {},
  mounted() {
    // console.log(this.max);
    mui("mui-numbox").numbox();
  },
};
</script>
<style lang="scss" scoped>
</style>