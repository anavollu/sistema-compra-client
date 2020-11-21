<template>
  <div class="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',
};
</script>

<style scoped>
.loading {
  position: fixed;
  background-color: black;
  opacity: 0.7;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
