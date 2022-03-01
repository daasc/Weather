<template>
  <div>
    <search-input @doSearch="search"></search-input>
    <card-weather v-if="weather"></card-weather>
  </div>
</template>

<script>
import CardWeather from '@/components/cardWeather.vue'
import searchInput from '@/components/searchInput.vue'
export default {
  name: 'IndexPage',
  components: { searchInput, CardWeather },
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
