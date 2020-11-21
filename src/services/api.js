const axios = require('axios');

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
});

export default {
  getProducts({ name }) {
    return api.get('/products', {
      params: {
        name,
      },
      headers: {
        authorization: 'bearer cashier',
      },
    });
  },
  getUser({ cpf }) {
    return api.get(`/user/${cpf}`, {
      params: {
        cpf,
      },
      headers: {
        authorization: 'bearer cashier',
      },
    });
  },
  async createCheckout({ cpf, items }) {
    return api.post(`/user/${cpf}/checkout`, items, {
      headers: {
        authorization: 'bearer cashier',
      },
    });
  },
  getCheckout({ id }) {
    return api.get(`/checkout/${id}`, {
      headers: {
        authorization: 'bearer cashier',
      },
    });
  },
  updateCheckoutPix({ id }) {
    return api.patch(`/checkout/${id}/pix/confirm`);
  },
};
