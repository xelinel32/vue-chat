export const state = () => ({
  user: {},
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  SOCKET_NEW_MESSAGE(ctx, data) {
    console.log('Messege received', data)
  },
}
