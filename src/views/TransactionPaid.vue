<template>
  <div>
    <h1>Olá, {{$route.query.nome}}, sua compra foi finalizada com sucesso!</h1>
    <div>pontos gastos: {{ $route.query.pontosGastos }}</div>
    <div>pontos acumulados: {{ $route.query.pontosAcumulados }}</div>
    <div>pontos totais: {{ $route.query.pontosTotais }}</div>
  </div>
</template>

<script>
export default {
  name: 'transaction-paid',
  mounted() {
    this.$swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
