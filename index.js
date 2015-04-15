var assert = require('assert')
var cp = require('child_process')
var exec = require('thenify')(cp.exec)

module.exports = execo

function execo(cmd, mute) {
  // execute commands serially
  if (cmd instanceof Array) {
    var promise = execo(cmd.unshift())

    while (cmd.length) {
      promise = promise.then(function () {
        return execo(cmd.unshift())
      })
    }

    return promise
  }

  // return a promise which will be resolved with stdout.
  return exec(cmd)
    .then(function (out) {
      mute || log(out[0])
      log(out[1])
      return out[0]
    })
}

function log(msg) {
  if (msg === '') return
  // log with 2 spaces indent.
  console.log(msg.replace(/^/gm, '  '))
}
