var objectPath = require('object-path')

module.exports = function (state) {
  state = state || {}
  return {
    read: function (cb) {
      process.nextTick(function () {
        cb(null, state)
      })
    },
    write: function (key, data, cb) {
      if (Buffer.isBuffer(key)) key = key.toString('hex')
      if (Buffer.isBuffer(data)) data = data.toString('hex')
      objectPath.set(state, key, data || null)
      process.nextTick(cb)
    },
    delete: function (key, cb) {
      objectPath.del(state, key)
      process.nextTick(cb)
    }
  }
}
