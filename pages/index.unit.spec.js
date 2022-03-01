/* eslint-disable import/no-named-as-default-member */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import Vue from 'vue'
import index from '@/pages/index'
import { state, mutations, actions } from '@/store/weather.js'
import searchInput from '@/components/searchInput'
import cardWeather from '@/components/cardWeather'
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

const localVue = createLocalVue()
localVue.use(Vuex)

describe('index', () => {
  const mountStore = async () => {
    const commit = jest.fn()

    axios.get = jest
      .fn()
      .mockReturnValue(() => Promise.resolve({ data: response }))

    const store = new Vuex.Store({
      modules: {
        weather: {
          state,
          mutations,
          actions,
          namespaced: true,
        },
      },
    })
    await actions.getWeather({ commit, state: { search: 'Picos' } })

    const wrapper = mount(index, {
      mocks: {
        $store: store,
      },
      localVue,
    })

    await Vue.nextTick()

    return { store, wrapper, commit }
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
  it('should find the cardWeather component', async () => {
    const { wrapper } = await mountStore()
    const card = wrapper.findComponent(cardWeather)
    expect(card.exists()).toBe(false)
  })
  it('should emit an event when input type search is clicked', async () => {
    const { wrapper } = await mountStore()
    const search = wrapper.find('[data-testid="input-search"]')
    await search.setValue('Picos')
    await search.trigger('keyup.enter')
    await Vue.nextTick()

    const card = wrapper.findComponent(cardWeather)
    expect(card.exists()).toBe(true)
  })
})
