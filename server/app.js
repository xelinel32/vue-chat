const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('IO Connected')

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
