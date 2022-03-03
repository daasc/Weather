import axios from 'axios'
export const state = () => ({
  weatherObjs: null,
  search: '',
})

export const mutations = {
  SET_WEATHER: (state, payload) => {
    state.weatherObjs = payload
  },
  SET_SEARCH: (state, payload) => {
    state.search = payload
  },
}

export const getters = {}

export const actions = {
  async getWeather({ commit, state }) {
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
  },
  //
}
