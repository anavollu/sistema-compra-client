<template>
  <div>
    <Loader v-if="cartLoading" />
    <div class="header">
      <h1>Sistema de compras</h1>
    </div>
    <div class="content">
      <div class="products">
        <h2>Produtos</h2>
        <div class="search-products">
          <p>Buscar produto:</p>
          <div class="input-search">
            <b-input
              size="lg"
              type="text"
              placeholder="Digite o nome do produto"
              v-model="find"
              @keypress.enter="searchProduct"
            />
            <b-button
              variant="primary"
              size="lg  "
              class="ml-2"
              @click="searchProduct"
            >
              Buscar
            </b-button>
          </div>
        </div>
        <div class="product-list">
          <p>Produtos:</p>
          <div v-if="loading">Buscando...</div>
          <div v-else-if="products && products.length === 0">
            Nenhum produto foi encontrado
          </div>
          <ProductItems
            v-else
            :products="products"
            @update-item="handleUpdateItem"
            :showValue="false"
          />
        </div>
      </div>
      <CartBox
        :items="cartItems"
        @update-cart-item="handleUpdateItem"
      >
        <b-button
          :disabled="!cartItems || cartItems.length === 0"
          variant="primary"
          size="lg"
          @click="handleFinish"
        >
          Finalizar compra
        </b-button>
      </CartBox>
    </div>
  </div>
</template>

<script>
import CartBox from '../components/CartBox.vue';
import Loader from '../components/Loader.vue';
import ProductItems from '../components/ProductItems.vue';
import api from '../services/api';

export default {
  name: 'cart',
  components: { CartBox, ProductItems, Loader },
  data: () => ({
    cartItems: [],
    products: [],
    counter: 0,
    loading: false,
    cartLoading: false,
    find: '',
  }),
  methods: {
    handleUpdateItem({ inc, id }) {
      const item = this.cartItems.find((el) => el._id === id);
      const product = this.products.find((el) => el._id === id);
      if (item) {
        item.quantity += inc;
        if (item.quantity === 0) {
          this.cartItems.splice(this.cartItems.indexOf(item), 1);
        }
        if (product) {
          this.$set(this.products, this.products.indexOf(product), {
            ...product,
            quantity: product.quantity + inc,
          });
        }
      } else if (inc > 0) {
        this.$set(this.products, this.products.indexOf(product), {
          ...product,
          quantity: inc,
        });
        this.cartItems.push({
          ...product,
          quantity: inc,
        });
      }
    },
    async searchProduct() {
      this.loading = true;
      try {
        const { data } = await api.getProducts({ name: this.find });
        this.products = data.map((product) => {
          const item = this.cartItems.find((el) => el._id === product._id);
          if (item) {
            return {
              ...product,
              quantity: item.quantity,
            };
          }
          return {
            ...product,
            quantity: 0,
          };
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async handleFinish() {
      this.$swal
        .fire({
          title: 'Insira o cpf do ciente',
          text: 'Ex: 76651806008',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          reverseButtons: true,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          showClass: {
            popup: 'animate__animated animate__fadeIn',
          },
          preConfirm: (cpf) => {
            if (!cpf || cpf.length !== 11) {
              return this.$swal.showValidationMessage(
                'Erro: cpf não tem 11 dígitos',
              );
            }
            return api
              .createCheckout({
                cpf,
                items: this.cartItems.map((el) => ({
                  product_id: el._id,
                  quantity: el.quantity,
                })),
              })
              .then((response) => response.data)
              .catch((error) => {
                if (error.response) {
                  const errorMessage = error.response.data
                    && error.response.data.message;
                  if (errorMessage === 'user not found') {
                    return this.$swal.showValidationMessage(
                      'Erro: cpf não está cadastrado',
                    );
                  }
                  if (errorMessage.includes('not exists') && errorMessage.includes('item')) {
                    return this.$swal.showValidationMessage(
                      'Erro: item não cadastrado no sistema',
                    );
                  }
                }
                console.error(error);
                return this.$swal.showValidationMessage(
                  `Erro: ${error.message}`,
                );
              });
          },
          allowOutsideClick: () => !this.$swal.isLoading(),
        })
        .then(({ isConfirmed, value }) => {
          if (isConfirmed) {
            this.$router.push({
              name: 'checkout',
              params: {
                id: value._id,
                checkout: value,
              },
            });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
}

.products {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
  min-height: 70vh;
  text-align: start;
  width: 120vh;
}

.input-search {
  display: flex;
  width: 40vh;
  align-items: center;
}

.product-list {
  margin-top: 10px;
  max-width: 500px;
}
</style>
