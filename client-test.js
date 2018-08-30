const net = require('net')

const result = []

const client = net.createConnection({ port: 8051 }, () => {
  console.log('connected to server!')
  client.write(0x0001 + ',who is it?')
})
client.on('data', (data) => {
  console.log(data.toString())
  client.end()
})
client.on('end', () => {
  console.log('disconnected from server')
})
