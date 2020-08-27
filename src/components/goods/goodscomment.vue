<template>
  
    <comment :newsid="id"></comment>
  
</template>
<script>
import comment from "../sub-components/comment.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    comment,
  },
  props:['id']
};
</script>
<style lang="scss" scoped>
</style>