<template>
  <div>
    <Loader v-if="loading" />
    <div v-if="loadedCheckout">
      <h1>Checkout</h1>
      <div class="checkout-wrapper">
        <div class="checkout-info">
          <div>Produtos</div>
          <CheckoutProducts :items="loadedCheckout.checkoutItems" />
          <br />
          <div>Resumo</div>
          <div>Preço total: {{ loadedCheckout.totalPrice | moneyFormatter}}</div>
          <div>Desconto: {{ loadedCheckout.discount | moneyFormatter}}</div>
          <div class="h4">Valor final:{{ loadedCheckout.totalValue | moneyFormatter}}</div>
        </div>
        <div class="checkout-payment">
          <div>Pagamento ({{ loadedCheckout.status | statusFilter }})</div>
          <b-tabs content-class="border-continue py-4">
            <b-tab title="pix" active>
              <qrcode-vue :value="qrvalue" :size="300" level="H"></qrcode-vue>
              <div v-if="pollingInterval">
                Confirmando compra ({{pollingCount}})...
              </div>
            </b-tab>
            <b-tab title="cash" disabled></b-tab>
            <b-tab title="creditCard" disabled></b-tab>
          </b-tabs>
        </div>
      </div>
      <div class="text-center mt-3">
        <b-button variant="lg" class="btn-danger">Cancelar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import CheckoutProducts from '../components/CheckoutProducts.vue';
import Loader from '../components/Loader.vue';
import api from '../services/api';

export default {
  name: 'checkout',
  props: {
    checkout: {
      type: Object,
    },
  },
  components: { CheckoutProducts, Loader, QrcodeVue },
  data: () => ({
    loadedCheckout: null,
    loading: true,
    polling: false,
    pollingCount: 0,
    pollingInterval: null,
  }),
  filters: {
    statusFilter(raw) {
      if (!raw) return raw;
      const dict = {
        pending: 'PENDENTE',
        paid: 'PAGO',
        canceled: 'CANCELADO',
        refunded: 'ESTORNADO',
      };
      return dict[raw];
    },
    moneyFormatter(raw) {
      if (!raw) return '-';
      return raw.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    },
  },
  computed: {
    qrvalue() {
      if (!this.loadedCheckout) return '';
      return `${process.env.VUE_APP_API_URL}${this.loadedCheckout.pixUrl}`;
    },
    status() {
      if (!this.loadedCheckout) return null;
      return this.loadedCheckout.status;
    },
  },
  methods: {
    async loadCheckout() {
      try {
        if (this.checkout) {
          this.loadedCheckout = this.checkout;
        } else {
          const { data } = await api.getCheckout({
            id: this.$route.params.id,
          });
          this.loadedCheckout = data;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    pollingStatus() {
      this.pollingInterval = setInterval(() => {
        this.pollingCount += 1;
        if (this.polling === false) {
          this.polling = true;
          api
            .getCheckout({
              id: this.$route.params.id,
            })
            .then(({ data }) => {
              this.loadedCheckout = data;
            })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error.message);
              clearInterval(this.pollingInterval);
            })
            .finally(() => {
              if (this.loadedCheckout.status !== 'pending') {
                clearInterval(this.pollingInterval);
                this.$swal
                  .fire({
                    icon: 'success',
                    title: 'Tudo certo!',
                    text: 'Pagamento confirmado.',
                    showConfirmButton: false,
                    timer: 5000,
                  })
                  .then(() => {
                    this.$router.replace({
                      name: 'cart',
                    });
                  });
              }
              setTimeout(() => {
                this.polling = false;
              }, 200);
            });
        }
      }, 500);
    },
  },
  mounted() {
    this.loadCheckout();
    this.pollingStatus();
  },
};
</script>

<style lang="scss" scoped>
.checkout-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;
}

.checkout-info {
  margin: 15px;
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: left;
}

.checkout-payment {
  margin: 15px;
  flex: 1;
}

/deep/ .border-continue {
  border-radius: 4px;
  border-bottom: 1px solid #dee2e6;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
}
</style>
