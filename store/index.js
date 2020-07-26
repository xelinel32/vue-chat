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
}

export const actions = {
  SOCKET_NEW_MESSAGE(ctx, data) {
    console.log('Messege received', data)
  },
}
