const Context = require('./Context')
const fs = require('fs')

class MessageHandler {
  constructor(config) {
    this._servicePath = config.servicePath
    this._loadServices()
  }
  _loadServices() {
    this.services = {}
    const SERVICE_PATH = this._servicePath
    let files = fs.readdirSync(SERVICE_PATH)
    for(let file of files) {
      let [ filename, suffix ] = file.split('.')
      if (suffix == 'js') {
        this.services[parseInt(filename)] = require(`${SERVICE_PATH}/${filename}`)
      }
    }
  }
  _generateContext(socket, buf) {
    return new Context({socket, req: buf})
  }
  // execute by socket
  recieve(socket, buf) {
    const ctx = this._generateContext(socket, buf)
    this._dispatch(ctx)
  }
  _dispatch(ctx) {
    // choose handler
    let message = ctx.req.toString().split(',')
    let handler = this.services[message[0]]
    if (!handler) return console.log('no funcNo: %s', ctx.req.funcNo)
    
    handler(ctx).then((data) => {
      ctx.send(data)
    }).catch((e) => {e.stack})
  }
}

module.exports = MessageHandler