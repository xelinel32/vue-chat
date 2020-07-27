const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({
  name,
  text,
  id,
})

io.on('connection', socket => {
  socket.on('USER_JOIN', (data, callback) => {
    if (!data.name || !data.room) {
      return callback('Data not corrected')
    }

    socket.join(data.room)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room,
    })

    callback({ userId: socket.id })
    io.to(data.room).emit('UPDATE_USERS', users.getByRoom(data.room))
    socket.emit('NEW_MESSAGE', m('admin', `Добро пожаловать ${data.name}`))
    socket.broadcast
      .to(data.room)
      .emit('NEW_MESSAGE', m('admin', `User ${data.name} joined!`))
  })

  socket.on('CREATE_MESSAGE', (data, callback) => {
    if (!data.text) {
      return callback('Текст не может быть пустым')
    }
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('NEW_MESSAGE', m(user.name, data.text, data.id))
    }
    callback()
  })

  socket.on('USER_LEFT', (id, callback) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit(
        'NEW_MESSAGE',
        m('admin', `User ${user.name} left.`)
      )
    }
    callback()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('UPDATE_USERS', users.getByRoom(user.room))
      io.to(user.room).emit(
        'NEW_MESSAGE',
        m('admin', `User ${user.name} left.`)
      )
    }
  })
})

module.exports = {
  app,
  server,
}
