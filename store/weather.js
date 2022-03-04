import axios from 'axios'
export const state = () => ({
  weatherObjs: null,
  search: '',
  errorRequest: '',
})

export const mutations = {
  SET_WEATHER: (state, payload) => {
    state.weatherObjs = payload
    state.errorRequest = ''
  },
  SET_SEARCH: (state, payload) => {
    state.search = payload
  },
  SET_ERROR: (state, payload) => {
    state.errorRequest = payload
    state.weatherObjs = null
  },
}

export const getters = {}

export const actions = {
  async getWeather({ commit, state }) {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: state.search,
            appid: '4d8fb5b93d4af21d66a2948710284366',
            units: 'metric',
          },
        }
      )
      commit('SET_WEATHER', response.data)
    } catch (error) {
      commit('SET_ERROR', `Error: City ${state.search} not found`)
    }
  },
}
