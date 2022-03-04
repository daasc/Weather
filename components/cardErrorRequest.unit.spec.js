/* eslint-disable import/no-named-as-default-member */
import { mount, createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'
import cardErrorRequest from '@/components/cardErrorRequest'

describe('CardErrorRequest', () => {
  const mountCardErrorRequest = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        weather: {
          state: {
            errorRequest: 'Error: City Picos not found',
          },
        },
        namespaced: true,
      },
    })
    const wrapper = mount(cardErrorRequest, { mocks: { $store: store } })
    return { store, wrapper }
  }
  it('should mount the component ', () => {
    const { wrapper } = mountCardErrorRequest()
    expect(wrapper.vm).toBeDefined()
  })
  it('should show message of the error request when not found weather', async () => {
    const { wrapper } = await mountCardErrorRequest()
    const message = wrapper.find('[data-testid="message-error"]')
    expect(message.text()).toContain('Error: City Picos not found')
  })
})
