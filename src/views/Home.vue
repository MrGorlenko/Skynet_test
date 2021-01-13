<template>
  <div class="home">
    <hr class='grey_line'>
    <StepsTemplate/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StepsTemplate from '@/components/StepsTemplate.vue';
export default Vue.extend({
  name: 'Home',
  components: {
    StepsTemplate
  },
});
</script>

<style lang="scss" scoped>
.grey_line{
  color: #ddd;
}

.home{
  h3{
    text-align: start;
  }
}
</style>