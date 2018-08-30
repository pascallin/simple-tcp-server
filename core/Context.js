class Context {
  constructor({ socket, req }) {
    this.socket = socket
    this.req = req
  }
  send(data, callback) {
    this.socket.write(data, callback)
  }
}

module.exports = Context