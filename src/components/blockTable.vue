<script setup>
defineProps({
  value: String,
  pkey: String,
});
</script>
<!--  -->
<template>
  <div class="block-table">
    <span class="key">{{ pkey }}</span>
    <span class="value">{{ value }}</span>
  </div>
</template>

<style lang='less' scoped>
.block-table {
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid rgb(223, 227, 235);

  .key {
    padding: 0.8rem 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: auto;
    font-weight: 500;
    font-size: 14px;
    text-transform: none;
    font-style: normal;
    opacity: 1;
    color: rgb(103, 113, 133);

    &:first-child {
      width: 50%;
    }
  }

  .value {
    width: 100%;
    padding: 0.8rem 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 500;
    font-size: 14px;
    text-transform: none;
    font-style: normal;
    color: rgb(53, 63, 82);
    opacity: 1;
  }
}
</style>
