const MessageHandler = require('./core/MessageHandler')
const TcpServer = require('./core/Server')

const messageHandler = new MessageHandler({
	servicePath: __dirname + '/service'
})
const server = new TcpServer({ messageHandler })
server.listen(8051)
