<template>
<div class="product-items">
  <div class="product-item" v-for="(product, i) in products" :key="product._id + '_' + i">
    <div class="product-name">
      <p>{{ product.name }}</p>
    </div>
    <div class="product-quantity">
      <b-button
        variant="info" size="sm"
        @click="() => $emit('update-item', { inc: -1, id: product._id })">
        -
      </b-button>
      <p>{{ quantityParser(product.quantity || 0) }}</p>
      <b-button
        variant="info" size="sm"
        @click="() => $emit('update-item', { inc: +1, id: product._id })">
        +
      </b-button>
    </div>
    <div class="product-price" v-if="showValue">
      <p>{{ moneyFormatter(product.price * (product.quantity || 0)) }}</p>
    </div>
  </div>
</div>
</template>

<script>
import MoneyMixin from '../mixins/money';

export default {
  props: {
    products: {},
    showValue: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [MoneyMixin],
  methods: {
    quantityParser(raw) {
      return raw < 10 ? `0${raw}` : `${raw}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  * {
    margin-right: 10px;
  }
}

.product-quantity {
  width: 100px;
  display: flex;
  align-items: baseline;
}

.product-price {
  width: 150px;
  text-align: left;
}

.product-name {
  width: 240px;
}
</style>
