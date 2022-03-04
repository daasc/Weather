<template>
  <div class="card-error">
    <p data-testid="message-error">{{ errorRequest }}</p>
  </div>
</template>
<script>
export default {
  name: 'CardError',
  computed: {
    errorRequest() {
      return this.$store.state.weather.errorRequest
    },
  },
}
</script>
<style lang="scss">
@media (min-width: 0px) {
  .card-error {
    padding: 10px;
    max-width: 400px;
    margin-top: 100px;
    background-color: #e74c3c;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    text-align: center;
    font-size: 20px;
  }
}
@media (min-width: 850px) {
  .card-error {
    margin: 0 auto;
  }
}
</style>
