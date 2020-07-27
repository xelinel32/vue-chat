export const state = () => ({
  user: {},
  messages: [],
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  CLEAR_DATA(state) {
    state.user = {}
    state.messages = []
  },
  SOCKET_NEW_MESSAGE(state, message) {
    state.messages.push(message)
  },
}
