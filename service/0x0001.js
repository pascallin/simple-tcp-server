let protocol = {
  encode(data) {
    return new Buffer(data)
  },
  decode(buf) {
    return buf.toString()
  }
}

module.exports = async (ctx) => {
  let req = protocol.decode(ctx.req)
  console.log(req)
  return protocol.encode('hello pascal!')
}