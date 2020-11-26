import axios from 'axios';

export default {
  create() {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      timeout: 1000,
    });
    return {
      get(...args) {
        console.log('making a request...');
        return instance.get(...args);
      },
      post(...args) {
        console.log('making a request...');
        return instance.post(...args);
      },
    };
  },
};
