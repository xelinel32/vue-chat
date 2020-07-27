class Users {
  constructor() {
    this.users = []
  }

  // ad user
  add(user) {
    this.users.push(user)
  }
  // get user by id
  get(id) {
    return this.users.find(user => user.id === id)
  }
  // tracked leaved user
  remove(id) {
    const user = this.get(id)

    if (user) {
      this.users = this.users.filter(user => user.id !== id)
    }

    return user
  }
  // get our room
  getByRoom(room) {
    return this.users.filter(user => user.room === room)
  }
}

module.exports = function() {
  return new Users()
}
