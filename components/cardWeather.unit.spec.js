import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cardWeather from '@/components/cardWeather'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CardWeather', () => {
  const createStore = ({ icon = '10n', id = 502 }) => {
    const store = new Vuex.Store({
      modules: {
        weather: {
          state: {
            weatherObjs: {
              coord: {
                lon: -42.6942,
                lat: -3.8947,
              },
              weather: [
                {
                  id,
                  main: 'Rain',
                  description: 'heavy intensity rain',
                  icon,
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
            },
          },
          namespaced: true,
        },
      },
    })
    const wrapper = mount(cardWeather, {
      mocks: {
        $store: store,
      },
      localVue,
    })

    return { store, wrapper }
  }
  it('should mount the component', () => {
    const { wrapper } = createStore({})
    expect(wrapper.vm).toBeDefined()
  })

  it('should show the time data returned by the request', async () => {
    const { wrapper } = await createStore({})
    const card = wrapper.find('[data-testid="card-weather"]')
    const number = wrapper.find('[data-testid="card-number"]')
    expect(number.text()).toContain('24')
    expect(card.exists()).toBe(true)
  })
  it('should contain the night-snow class', async () => {
    const { wrapper } = await createStore({ icon: '02n', id: 600 })
    const color = wrapper.find('[data-testid="color-weather"]')
    expect(color.classes()).toContain('night-snow')
  })

  it('should contain the night class', async () => {
    const { wrapper } = await createStore({ icon: '02n', id: 700 })
    const color = wrapper.find('[data-testid="color-weather"]')
    expect(color.classes()).toContain('night')
  })

  it('should contain the day-rain class', async () => {
    const { wrapper } = await createStore({ icon: '02d', id: 500 })
    const color = wrapper.find('[data-testid="color-weather"]')
    expect(color.classes()).toContain('day-rain')
  })

  it('should contain the day-snow class', async () => {
    const { wrapper } = await createStore({ icon: '02d', id: 600 })
    const color = wrapper.find('[data-testid="color-weather"]')
    expect(color.classes()).toContain('day-snow')
  })
})
