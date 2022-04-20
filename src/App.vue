<script setup>
import { ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getSingleBlock } from './api';
import blockHead from './components/blockHead.vue';
import blockTable from './components/blockTable.vue';
import blockTx from './components/blockTx.vue';

const hashValue = ref('');
const blockTableValue = ref({});
const blockTxValue = ref([]);
const current = ref(1);
const loading = ref(false);

const showKey = computed(() => {
  return (key) => {
    let ret = key[0].toUpperCase() + key.substr(1);
    if (key === 'fee') {
      ret += ' Reward';
    }

    return ret;
  };
});

const showValue = computed(() => {
  // processing numbers
  const numberType = new Map([
    ['bits', ''],
    ['weight', ' WU'],
    ['size', ' bytes'],
    ['Nonce', ''],
    ['fee', ' BTC'],
  ]);

  return (item, key) => {
    if (key === 'timestamp') {
      return new Date(item * 1000).toLocaleString();
    }

    if (numberType.has(key)) {
      if (key === 'fee') {
        item = String(item);
        const needLenth = 9;

        return (
          // zero padding
          item.padStart(needLenth, '0').substr(0, 1) +
          '.' +
          item.substr(1) +
          numberType.get(key)
        );
      }

      let ret = item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      return `${ret}${numberType.get(key)}`;
    }

    return item;
  };
});

const showTx = computed(() => {
  return (current, tx) => {
    current -= 1;
    return tx.slice(current, current + 5);
  };
});

const searchHandler = () => {
  loading.value = true;
  getSingleBlock(hashValue.value).then((res) => {
    if (res.status === 200) {
      let ignore = [
        'next_block',
        'n_tx',
        'main_chain',
        'mrkl_root',
        'prev_block',
        'block_index',
      ];

      const { tx, ...tablesValue } = res?.data;
      ignore.forEach((item) => {
        if (tablesValue[item]) {
          delete tablesValue[item];
        }
      });
      blockTableValue.value = tablesValue;
      blockTxValue.value = tx;
      loading.value = false;
    }
  });
};
</script>

<template>
  <div
    class="wrap"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载中...">
    <el-input
      v-model="hashValue"
      class="w-50 m-2"
      size="large"
      placeholder="Search your transaction, an address or a block"
      @change="searchHandler"
      :prefix-icon="Search" />
    <h2 v-if="!blockTxValue.length">请在输入框中进行搜索</h2>
    <div class="content" v-if="blockTxValue.length">
      <div class="content-block-table">
        <blockHead
          :blockHeight="blockTableValue.heigh"
          :title="`Block ${blockTableValue.height ?? ''}`" />
        <div class="content-block-table-body">
          <blockTable
            v-for="(item, key) of blockTableValue"
            :key="key"
            :value="showValue(item, key)"
            :pkey="showKey(key)" />
        </div>
      </div>
      <div class="content-block-tx">
        <blockHead :tooltipText="`hello`" title="Block Transactions" />
        <blockTx
          class="txShow"
          v-for="(item, index) of showTx(current, blockTxValue)"
          :txValue="item"
          :key="index" />
        <el-pagination
          v-model:currentPage="current"
          :page-size="5"
          layout="prev, pager, next"
          :total="blockTxValue.length" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.wrap {
  padding: 0 120px;

  @media (max-width: 850px) {
    padding: 0;
  }
}

.content {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  &-block-table {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    &-body {
      display: flex;
      flex-direction: column;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  &-block-tx {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
