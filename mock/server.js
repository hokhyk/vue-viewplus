const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

// 支持加载多个db json文件
const objectAssign = require('object-assign')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach(function (file) {
  objectAssign(base, require(path.resolve(mockDir, file)))
})
console.log(`mock datas ${JSON.stringify(base)}`)
console.log('')
const router = jsonServer.router(base)

// 需要手写POST接口：https://github.com/typicode/json-server
server.post('/LOGIN', function (req, res) {
  let db = router.db
  let data = db.get('LOGIN').value() // 这里的login就是db中的key
  res.jsonp({
    data: data
  })
})

server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  // console.log('res.locals.data....>>>', res.locals.data)
  res.jsonp({
    // 对应http模块的[dataKey]
    data: res.locals.data
  })
}

server.listen(7000, () => {
  console.log('\\{^_^}/ hi!')
  console.log(`JSON Server is running\n`)
  console.log('> Listening at http://localhost:7000 \n')
})
