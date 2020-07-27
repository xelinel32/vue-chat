const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

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
    callback({ userId: socket.id })
    socket.emit('NEW_MESSAGE', m('admin', `Добро пожаловать ${data.name}`))
    socket.broadcast
      .to(data.room)
      .emit('NEW_MESSAGE', m('admin', `User ${data.name} joined!`))
  })

  socket.on('CREATE_MESSAGE', data => {
    setTimeout(() => {
      socket.emit('NEW_MESSAGE', {
        text: data.text + ' SERVER',
      })
    }, 500)
  })
})

module.exports = {
  app,
  server,
}
