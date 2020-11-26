<template>
  <div class="cart">
    <div class="cart-header">
      <h2>Carrinho</h2>
      <b-icon class="cart-icon" icon="cart-4" scale=2></b-icon>
    </div>
    <div class="cart-list">
      <div class="cart-items">
        <ProductItems class="product-items" :products="items || []"
          @update-item="({ inc, id }) => $emit('update-cart-item', { inc, id })"/>
        <div class="exchange">
          <p class="mr-3">Vale-troca:</p>
          <b-input type="text" placeholder="Digite o código"/>
        </div>
      </div>
      <div class="total-price">
        <p class="mr-3">Valor total:</p>
        <p>{{ moneyFormatter(items
            ? items.reduce((acc, curr) => acc + ((curr.quantity || 0) * curr.price), 0)
            : 0) }}</p>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
import ProductItems from './ProductItems.vue';
import MoneyMixin from '../mixins/money';

export default {
  name: 'cart-box',
  components: { ProductItems },
  props: ['items'],
  mixins: [MoneyMixin],
};
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
  min-height: 70vh;
  width: 90vh;
}

.cart-items {
  margin-top: 30px;
}

.cart-header {
  display: flex;
  align-items: center;
}

.cart-icon {
  margin-left: 15px;
  padding-bottom: 5px;
}

.exchange {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 59vh;
  margin-top: 20px;
  white-space: nowrap;
}

.total-price {
  display: flex;
  margin-top: 20px;
}

.product-items {
 height: 200px;
 overflow-y: scroll;
}
</style>
