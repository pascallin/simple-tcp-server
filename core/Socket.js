class Socket {
  constructor(socket, { key, receiveHandler }) {
    this._socket = socket
    this._key = key
    this.receiveHandler = receiveHandler
    this._socket.on('data', this._onData.bind(this))
    this._socket.on('error', this._onError.bind(this))
    this._socket.once('end', this._onEnd.bind(this))
    this._socket.once('close', this._onClose.bind(this))
    this._socket.once('timeout', this._onTimeout.bind(this))
    this._socket.once('connect', this._onConnect.bind(this))
  }
  _onData(buf) {
    this.receiveHandler.recieve.call(this.receiveHandler, this._socket, buf)
  }
  _onClose(err) {
    if (err) console.log(`socket ${this._key} close with error: %o`, err)
    console.log(`socket ${this._key} close`)
  }
  _onEnd() {
    console.log(`socket ${this._key} end`)
  }
  _onTimeout() {
    console.log(`socket ${this._key} timeout`)
  }
  _onError(err) {
    console.log(`socket ${this._key} error: %o`, err)
  }
  _onConnect() {
    console.log(`socket ${this._key} connected`)
  }
}

module.exports = Socket