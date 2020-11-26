import axios from 'axios';

const { create } = axios;
axios.create = function myCreate(...args) {
  console.log('creating axios instance...');
  return create(...args);
};

export default axios;
