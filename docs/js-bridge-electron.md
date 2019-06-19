# js-bridge-electron.js 【自定义模块】

js-bridge-electron.js 是用于跟Electron通信的一个自定义桥接模块。

为什么使用js-bridge-electron.js这个自定的模块

+ 使用该自定义模块，为前端使用vue-viewplus与Electron端通讯提供桥接

## 示例：

基于vue-viewplus，实现的一个自定义模块 ，非标准模块，需要手动配置：

1.安装自定义模块，配置插件，main.js入口文件示例：

```js
import Vue from 'vue'
import ViewPlus from 'vue-viewplus'
import viewPlusOptions from '@/plugin/vue-viewplus'
import fireEventElectron from '@/plugin/vue-viewplus/js-bridge-electron.js'

const {debug, errorHandler} = viewPlusOptions

Vue.use(ViewPlus, viewPlusOptions)

ViewPlus.mixin(Vue, fireEventElectron, {
  debug,
  errorHandler,
  moduleName: '自定义fireEventElectron'
})
```

2.js-bridge-electron.js如何和electron进行桥接

其实该自定义模块就做了以下一件事:
+ 定义自定义方法fireEventElectron做为通讯和接收Electron端反馈结果（本质上就是前端跟Electron端通过Electron的主进程跟渲染进程的通信来完成的）

```js
import _ from 'lodash'

let ipc = null
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}

export default {
  /**
   * 桥接函数
   * @param command
   * const command = {
   *  [*] mainProcessName用来标识请求Electron端的那个主进程方法
   *  mainProcessName: 'sending-service'
   *  // 【可选】params用来传递对应主进程方法需要的参数）
   *  params: {
   *      // 自定义需要传入到Electron端参数
   *      msg: 'hello world'
   *    }
   * }
   * @returns {Promise<any>}
   */
  fireEventElectron(command = null) {
    return new Promise((resolve, reject) => {
      if (window.require) {
        if (!_.isNull(ipc)) {
          const listenerName = `__listener__${new Date().getTime() + (Math.random() * 10).toFixed(5).toString().replace('.', '')}`
          command.listenerName = listenerName
          ipc.send(command.mainProcessName, command)
          ipc.on(listenerName, (event, data) => {
            // electron 端返回结果
            resolve(data)
          })
        } else {
          let err = {message: `Electron#ipcRenderer依赖模块未定义，请检查是否运行在electron客户端`, code: `NOT_FIND_ELECTRON_IPCRENDERER[前端]`}
          reject(err)
        }
      } else {
        let err = {message: `未运行于node环境下,请检查是否运行在electron客户端`, code: `NOT_RUN_NODE[前端]`}
        reject(err)
      }
    })
  }
}

```

3.Electron端主如何来接收桥接请求：

 + 可能你的Electron端是这样的，具体根据你自己实际而定，注意`'sending-service'`这个函数在electron端只有一个，通过一个函数完成监听和请求分发
 + 若使用该自定义模块通过Electron端代理转发请求，那么util-http.js mode必须配置为ELECTRON，详见[util-http.js]mode配置(http://jiiiiiin.cn/vue-viewplus/#/util-http)

 ```js

 // Electron 主进程收到前端发起的通讯（渲染进程发起的通讯）进行发送交易处理并反馈回去
ipcMain.on('sending-service', (event, command) => {
  sendingService(command.params).then((response) => {
    event.sender.send(command.listenerName, response)
  }).catch((err) => {
    let errorMsg = ...
    let errCode = ...
    event.sender.send(command.listenerName, { data: { ReturnMessage: `${errorMsg}`, ReturnCode: `${errCode}ELECTRON` } })
  })
})

  /**
   * 发送交易
   * @param transcode
   * @params method
   * @params timeout
   * @param params
   */
  function sendingService ({ transcode = '', method = 'POST', timeout = 60000, params = {} } = {}) {
    return new Promise((resolve, reject) => {
    ...
    // 这里是真正发送交易的一些业务代码，此处省略
    ...
    })
  }

  ```

 4.前端应用通过$vp.fireEvent调用方式与Electron端进行通信-案例

```js

  // $vp.fireEvent(command = null)方式获取Electron端通讯—获取mac地址
  let command = {
   // 这里的mode必须配置为'ELECTRON'
    mode: 'ELECTRON',
    mainProcessName: 'network-inteffaces'
  }
  this.$vp.fireEvent(command).then(res => {
    console.log('res_mac===', res)
  }).catch(err => {
    console.log('err_mac===', err)
  })

//Electron端主进程-获取设备Mac地址
ipcMain.on('network-inteffaces', (event, command) => {
  event.sender.send(command.listenerName, { ReturnCode: returnCode, ReturnMessage: returnMessage, data: { MacAddress: macAddress } })
})
```

