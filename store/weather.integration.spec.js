/* eslint-disable import/no-named-as-default-member */
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { state, mutations, actions } from '@/store/weather.js'

jest.mock('axios', () => ({
  get: jest.fn(),
}))
const storeConfig = {
  state,
  mutations,
  actions,
}
const response = {
  coord: {
    lon: -42.6942,
    lat: -3.8947,
  },
  weather: [
    {
      id: 502,
      main: 'Rain',
      description: 'heavy intensity rain',
      icon: '10n',
    },
  ],
  base: 'stations',
  main: {
    temp: 23.58,
    feels_like: 24.55,
    temp_min: 23.58,
    temp_max: 23.58,
    pressure: 1010,
    humidity: 98,
    sea_level: 1010,
    grnd_level: 1005,
  },
  visibility: 10000,
  wind: {
    speed: 1.26,
    deg: 5,
    gust: 3.63,
  },
  rain: {
    '1h': 8.18,
  },
  clouds: {
    all: 82,
  },
  dt: 1646006004,
  sys: {
    country: 'BR',
    sunrise: 1645952282,
    sunset: 1645996160,
  },
  timezone: -10800,
  id: 3410315,
  name: 'Brasília',
  cod: 200,
}
describe('Weather integration', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const createStore = async ({ error = false }) => {
    const commit = jest.fn()
    const localVue = createLocalVue()
    localVue.use(Vuex)
    if (error) {
      axios.get.mockReturnValue(Promise.reject(new Error('Error')))
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: response }))
    }
    const store = new Vuex.Store(storeConfig)
    await Vue.nextTick()

    return { store, commit }
  }
  it('should make a get request to return the city time', async () => {
    const { store } = await createStore({})
    await store.commit('SET_SEARCH', 'Picos')
    const commit = jest.fn()
    await actions.getWeather({ commit, state: { search: 'Picos' } })
    expect(commit).toHaveBeenCalledWith('SET_WEATHER', response)
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          appid: '4d8fb5b93d4af21d66a2948710284366',
          q: 'Picos',
          units: 'metric',
        },
      }
    )
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('should make a error get request to return the city time', async () => {
    const { store } = await createStore({ error: true })
    await store.commit('SET_SEARCH', 'ffafa')
    await store.dispatch('getWeather')
    const commit = jest.fn()
    await actions.getWeather({ commit, state: { search: 'ffafa' } })
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          appid: '4d8fb5b93d4af21d66a2948710284366',
          q: 'ffafa',
          units: 'metric',
        },
      }
    )
    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(store.state.errorRequest).toBe('Error: City ffafa not found')
  })
})
