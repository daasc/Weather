/* eslint-disable import/no-named-as-default-member */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import index from '@/pages/index'
import { state, mutations, actions } from '@/store/weather.js'
import searchInput from '@/components/searchInput'
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

describe('index', () => {
  const mountStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(response))
    const store = new Vuex.Store(storeConfig)
    const wrapper = mount(index, { mocks: { $store: store, $axios: axios } })
    return { store, wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountStore()
    expect(wrapper.vm).toBeDefined()
  })
  it('should find the searchInput component', async () => {
    const { wrapper } = await mountStore()
    const search = wrapper.findComponent(searchInput)
    expect(search.vm).toBeDefined()
  })
})
