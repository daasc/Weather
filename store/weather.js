export const state = () => ({
  weatherObjs: null,
})

export const mutations = {
  SET_WEATHER: (state, payload) => {
    state.weatherObjs = payload
  },
}

export const getters = {}

export const actions = {}
