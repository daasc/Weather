import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import { state, mutations, getters, actions } from '@/store/weather.js'

jest.mock('axios')

const storeConfig = {
  state,
  mutations,
  getters,
  actions,
  namespace: true,
}
describe('Weather', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data: { results: '' } }))
    const store = new Vuex.Store(storeConfig)

    return { store }
  }

  it('should ', () => {
    const { store } = createStore()
    expect(store.state.weather).toEqual({})
  })
})
