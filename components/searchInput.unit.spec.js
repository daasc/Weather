import { mount } from '@vue/test-utils'
import searchInput from '@/components/searchInput'

describe('searchInput', () => {
  const mountSearch = () => {
    const wrapper = mount(searchInput)

    return { wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountSearch()
    expect(wrapper.vm).toBeDefined()
  })
  it('should contain a search input to perform the searches', async () => {
    const { wrapper } = await mountSearch()
    const search = wrapper.find('[data-testid="input-search"]')
    expect(search.exists()).toBe(true)
  })
  it('should emit an event when input type search is clicked', async () => {
    const { wrapper } = await mountSearch()
    const search = wrapper.find('[data-testid="input-search"]')
    await search.setValue('Picos')
    await search.trigger('keyup.enter')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: 'Picos' }])
  })
  it('should not emit an event when input type search is clicked and is empty', async () => {
    const { wrapper } = await mountSearch()
    const search = wrapper.find('[data-testid="input-search"]')
    await search.setValue('Picos')
    await search.setValue('')
    await search.trigger('keyup.enter')
    expect(wrapper.emitted().doSearch).toBeUndefined()
    await search.setValue('Picos')
    await search.trigger('keyup.enter')
    expect(wrapper.emitted().doSearch).toBeTruthy()
  })
})
