import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/checkout/:id',
    name: 'checkout',
    props: true,
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/compra-finalizada',
    name: 'transaction-paid',
    component: () => import('../views/TransactionPaid.vue'),
  },
  {
    path: '/compra-finalizada-erro',
    name: 'transaction-paid-error',
    component: () => import('../views/TransactionPaidError.vue'),
  },
  {
    path: '/',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
