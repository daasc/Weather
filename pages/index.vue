<template>
  <div>
    <h1>Weather</h1>
    <search-input @doSearch="search"></search-input>
    <card-weather v-if="weather"></card-weather>
    <card-error-request
      v-if="$store.state.weather.errorRequest"
    ></card-error-request>
  </div>
</template>

<script>
import CardWeather from '@/components/cardWeather.vue'
import searchInput from '@/components/searchInput.vue'
import CardErrorRequest from '@/components/cardErrorRequest.vue'
export default {
  name: 'IndexPage',
  components: { searchInput, CardWeather, CardErrorRequest },
  computed: {
    weather() {
      return this.$store.state.weather.weatherObjs !== null
    },
  },
  methods: {
    async search({ term }) {
      this.$store.commit('weather/SET_SEARCH', term)
      await this.$store.dispatch('weather/getWeather')
    },
  },
}
</script>
<style lang="scss">
h1 {
  text-align: center;
  color: #fff;
}
</style>
