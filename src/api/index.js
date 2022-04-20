import axios from 'axios';

const PREV_URL = 'https://blockchain.info';
const SINGLE_BLOCK_GET_URL = `${PREV_URL}/rawblock`;

export const getSingleBlock = (hash) =>
  axios.get(`${SINGLE_BLOCK_GET_URL}/${hash}`);
