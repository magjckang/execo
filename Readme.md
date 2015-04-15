# execo

thenable/yieldable child_process.exec with proper(really) logging,
ideal for use in tools like gulp.

## Usage

```
npm install execo
```

### exec(cmd[, mute])

execute command(s) with stdout logging optional:

```js
// commands is executed serially
exec([
  'mkdir -p build',
  'cp client/foo build/bar'
])
.then(function () {
  return exec('ls build') // terminal => 'bar'
})
.then(function () {
  // mute stdout by passing truthy second argument
  return exec('cat build/bar', true) // terminal => nothing
})
.then(function (bar) {
  // promise resovled with stdout
  return exec('echo ' + bar) // terminal => content of bar
})
.then(function () {
  exec('rm -r build')
})
```

i hate execSync:

```js
// simple deploy
co(function *() {
  yield exec('gulp build')
  yield exec('rsync -rptv --delete server user@host:project')
  yield exec('ssh user@host "cd project; pm2 startOrRestart app.json"')
})
```

## License

MIT
