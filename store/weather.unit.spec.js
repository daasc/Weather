import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import { state, mutations, actions } from '@/store/weather.js'

jest.mock('axios')
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
const storeConfig = {
  state,
  mutations,
  actions,
}
describe('Weather', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    axios.get = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { results: response } })
      )
    const store = new Vuex.Store(storeConfig)

    return { store }
  }

  it('should return the value of the weather', async () => {
    const { store } = await createStore()
    expect(store.state.weatherObjs).toEqual(null)
  })
  it('should save new weather value when SET_WEATHER is calling', async () => {
    const { store } = await createStore()
    await store.commit('SET_WEATHER', response)
    expect(store.state.weatherObjs).toEqual(response)
  })
})
