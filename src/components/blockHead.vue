<script setup>
import { InfoFilled } from '@element-plus/icons-vue';

defineProps({
  title: String,
  blockHeight: String || Number,
});
</script>
<!--  -->
<template>
  <div class="content-head">
    <span class="title">{{ title }}</span>
    <el-tooltip class="head-tooltip" effect="dark" placement="right">
      <template #content>
        Block at heigh <br />
        {{ blockHeight }} in the<br />
        Bitcoin blockchai
      </template>
      <el-icon color="#98A1B2"><InfoFilled /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang='less' scoped>
.content-head {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  padding: 1rem 0px;

  .title {
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: none;
    font-style: normal;
    opacity: 1;
    color: rgb(53, 63, 82);
    margin-right: 0.5rem;
  }
}
</style>
