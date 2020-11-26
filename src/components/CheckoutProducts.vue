<template>
  <div>
    <div class="item" v-for="(item) in items" :key="item.id">
      <b class="pr-2">{{ item.name }}:</b> {{ itemLine(item) }}
    </div>
  </div>
</template>

<script>
import MoneyMixin from '../mixins/money';

export default {
  name: 'checkout-products',
  props: ['items'],
  mixins: [MoneyMixin],
  methods: {
    itemLine(item) {
      const { moneyFormatter } = this;
      let line = '';
      line += ` ${moneyFormatter(item.price)} x ${item.quantity}`;
      line += ` = ${moneyFormatter(item.totalPrice)}`;
      if (item.discount) {
        line += ` (-${moneyFormatter(item.discount)})`;
      }
      return line;
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
}
</style>
