const net = require('net')
const Socket = require('./Socket')

class TCPServer {
  constructor({ messageHandler }) {
    this._connections = {}
    this.messageHandler = messageHandler
  }
  _onConnection(socket) {
    if (!socket.remoteAddress) {
      return socket.end()
    }
    let key = socket.remoteAddress.split(':').pop() + ':' + socket.remotePort
    let sock = new Socket(socket, { key, receiveHandler: this.messageHandler })
    this._connections[key] = sock
  }
  _onError(err) {
    console.error(err.stack)
  }
  _onClose() {
    console.log('server close')
  }
  _onListen() {
    console.log(`server listening ${this._port}`)
  }
  listen(port) {
    this._port = port
    this._server = net.createServer()
    this._server.on('connection', this._onConnection.bind(this))
    this._server.once('error', this._onError.bind(this))
    this._server.once('close', this._onClose.bind(this))
    this._server.listen(port, this._onListen.bind(this))
  }
}

module.exports = TCPServer
