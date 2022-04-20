<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue';
defineProps({
  txValue: Object,
});

const timestamp = (time) => {
  return new Date(time * 1000).toLocaleString();
};

const zeroPad = (num) => {
  let str = num.toString();
  return str.padStart(9, '0').substr(0, 1) + '.' + str.substr(1);
};
</script>
<!--  -->
<template>
  <div class="tx-item">
    <div class="tx-item-fee">
      <div class="fee-item fee-key">Fee</div>
      <div class="fee-fix"></div>
      <div class="fe-item fee-value">{{ zeroPad(txValue.fee) }} BTC</div>
    </div>
    <div class="tx-item-hash">
      <div class="tx-item-hash-head">
        <div class="prev">
          <div class="prev-key">Hash</div>
          <a
            :href="`https://www.blockchain.com/btc/tx/${txValue.hash}`"
            class="prev-value"
            >{{ txValue.hash }}</a
          >
        </div>
        <div class="next">
          <div class="fix"></div>
          <div class="time">{{ timestamp(txValue.time) }}</div>
        </div>
      </div>
      <div class="tx-item-hash-content">
        <div class="left">
          <div class="prev-placeholder"></div>
          <div class="puthash input">
            <div
              class="puthash-item"
              v-for="(item, index) of txValue.inputs"
              :key="index">
              <div class="puthash-hash">
                <a
                  v-if="item.prev_out?.addr"
                  :href="`https://www.blockchain.com/btc/address/${item.prev_out?.addr}`"
                  >{{ item.prev_out?.addr }}</a
                >
                <span v-else>COINBASE (Newly Generated Coins)</span>
              </div>
              <div class="puthash-btc" v-if="item.prev_out?.addr">
                {{ zeroPad(item.prev_out.value) }} BTC
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="prev-placeholder">
            <el-icon color="#339F7B"><ArrowRightBold /></el-icon>
          </div>
          <div class="puthash output">
            <div
              class="puthash-item"
              v-for="(item, index) of txValue.out"
              :key="index">
              <div class="puthash-hash">
                <a
                  v-if="item?.addr"
                  :href="`https://www.blockchain.com/btc/address/${item?.addr}`"
                  >{{ item.addr }}</a
                >
                <span v-else>OP_RETURN</span>
              </div>
              <div class="puthash-btc" v-if="item.addr">
                {{ zeroPad(item.value) }} BTC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.tx-item {
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 1rem 0px;

  &-fee {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    .fee-item {
      display: flex;
      flex-direction: row;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
      width: 50%;
    }

    .fee-key {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: 500;
      font-size: 14px;
      text-transform: none;
      font-style: normal;
      opacity: 1;
      color: rgb(103, 113, 133);
    }

    .fee-fix {
      display: flex;
      flex-direction: row;
      -webkit-box-pack: end;
      justify-content: flex-end;
      align-items: flex-start;
      width: 100px;
      padding: 0.8rem 0px;
    }

    .fee-value {
      display: block;
      padding: 0.25rem;
      color: rgb(0, 135, 90);
      background: rgb(209, 240, 219);
      border: 1px solid rgb(209, 240, 219);
      border-radius: 0.25rem;
      cursor: pointer;
      width: fit-content !important;
    }
  }

  &-hash {
    width: 100%;

    &-head {
      display: flex;
      flex-direction: row;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;

      .prev {
        display: flex;
        flex-direction: row;
        -webkit-box-pack: start;
        justify-content: flex-start;
        align-items: flex-start;
        width: 50%;

        &-key {
          display: flex;
          flex-direction: row;
          -webkit-box-pack: start;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100px;
          padding: 0.8rem 0px;
          font-weight: 500;
          font-size: 14px;
          text-transform: none;
          font-style: normal;
          color: rgb(103, 113, 133);
        }

        &-value {
          width: calc(100% - 100px);
          padding: 0.8rem 0px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          // width: 100%;
          font-size: 14px;
          text-transform: none;
          cursor: pointer;
          font-style: normal;
          color: rgb(12, 108, 242);
        }
      }

      .next {
        display: flex;
        flex-direction: row;
        -webkit-box-pack: start;
        justify-content: flex-start;
        align-items: flex-start;
        width: 50%;

        .fix {
          display: flex;
          flex-direction: row;
          -webkit-box-pack: start;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100px;
          padding: 0.8rem 0px;
        }

        .time {
          flex-direction: row;
          -webkit-box-pack: end;
          justify-content: flex-end;
          -webkit-box-align: center;
          align-items: center;
          width: calc(100% - 100px);
          padding: 0.8rem 0px;
          font-weight: 500;
          font-size: 14px;
          text-transform: none;
          font-style: normal;
          color: rgb(53, 63, 82);
        }
      }
    }

    &-content {
      display: flex;
      flex-direction: row;
      -webkit-box-pack: start;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;

      .prev-placeholder {
        display: flex;
        flex-direction: row;
        -webkit-box-pack: start;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100px;
      }

      .puthash {
        display: flex;
        flex-direction: column;
        -webkit-box-pack: start;
        justify-content: flex-start;
        align-items: flex-start;
        width: calc(100% - 100px);

        &-item {
          display: flex;
          flex-direction: row;
          -webkit-box-pack: justify;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 5px;
          width: 100%;

          &:last-child {
            margin-bottom: 0;
          }

          .puthash-hash {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 5px;
            max-width: 350px;
            flex: 1;
            font-weight: 500;
            font-size: 14px;
            text-transform: capitalize;
            font-style: normal;

            a {
              cursor: pointer;
              color: rgb(12, 108, 242);
            }

            span {
              color: rgb(0, 135, 90);
            }
          }

          .puthash-btc {
            display: flex;
            flex-direction: row;
            -webkit-box-pack: start;
            justify-content: flex-end;
            -webkit-box-align: center;
            align-items: center;
            font-weight: 500;
            font-size: 14px;
            text-transform: none;
            font-style: normal;
            color: rgb(53, 63, 82);
            flex: 1;
          }
        }
      }

      .left,
      .right {
        display: flex;
        flex-direction: row;
        -webkit-box-pack: start;
        justify-content: flex-start;
        align-items: flex-start;
        width: 50%;
      }

      .right {
        span {
          color: rgb(53, 63, 82) !important;
        }
      }
    }
  }
}
</style>
