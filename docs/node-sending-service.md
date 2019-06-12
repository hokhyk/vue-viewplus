# node-sending-service.js

node-sending-service.js 是用于跟Electron通信的一个自定义桥接模块。

为什么使用node-sending-service.js这个自定的模块

+ 使用该自定义模块，为前端使用vue-viewplus通过Electron端代理请求提供桥接

使用方法：

基于vue-viewplus，实现的一个自定义模块 ，非标准模块，需要手动配置：
1.main.js入口文件：
```js
import Vue from 'vue'
import ViewPlus from 'vue-viewplus'
import viewPlusOptions from '@/plugin/vue-viewplus'
import nodeSendingService from '@/plugin/vue-viewplus/node-sending-service.js'

const {debug, errorHandler} = viewPlusOptions

Vue.use(ViewPlus, viewPlusOptions)

ViewPlus.mixin(Vue, nodeSendingService, {
  debug,
  errorHandler,
  moduleName: '自定义nodeSendingService'
})

```
2.node-sending-service.js

```js
import {ipcModSendingService} from '@/api/ipc-renderer-api'
export default {
  /**
   * 通知Electron端统一发送请求接口-sendingService
   * @param {String} [transcode=undefined] 交易码
   * @params {String} [method='POST'] 请求方法
   * @params {Number} timeout [timeout=6000]指定请求超时的毫秒数
   * @param {Object} [params={}] 请求参数
   * @returns {Promise}
   */
  sendingService(command = null) {
    return new Promise((resolve, reject) => {
      this::ipcModSendingService(command).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
```
其实该自定义模块就做了以下一件事:
+ 定义自定义方法sendingService做为连接和接收Electron端通信结果（本质上还是前端跟Electron端通过Electron的主进程跟渲染进程的通信来完成的）

3.ipc-renderer-api.js（前端与Electron端进行通信的模块）

```js

let ipc = null
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}

// 通知Electron端发交易
export function ipcModSendingService(command) {
  return new Promise((resolve, reject) => {
    if (window.require) {
      if (!_.isNull(ipc)) {
        const listenerName = `__listener__${new Date().getTime() + (Math.random() * 10).toFixed(5).toString().replace('.', '')}`
        command.listenerName = listenerName
        if (command.method === 'POST_UPLOAD') {
        // 这里是针对上传文件做的特殊处理
          command.params.filePath = command.params.UploadFile.path
        }
        ipc.send('sending-service', command)
        ipc.on(listenerName, (event, data) => {
          // electron 端返回请求结果
          if (data.resCode === '000000') {
            resolve(data.res)
          } else {
            reject(data.res)
          }
        })
      } else {
        reject(new Error('Electron-ipcRenderer依赖模块未引入'))
      }
    } else {
      reject(new Error('未运行于node环境下'))
    }
  })
}

```

4.使用该自定义模块 util-http.js mode必须配置为ELECTRON，详见[util-http.js]mode配置(http://jiiiiiin.cn/vue-viewplus/#/util-http)

5.Electron端主进程接收前端通讯进行代理转发请求

 + 可能你的Electron端是这样的，具体根据你自己实际而定

 ```js
 // Electron 主进程收到前端发起的通讯（渲染进程发起的通讯）进行发送交易处理并反馈回去
 ipcMain.on('sending-service', (event, command) => {
   sendingService(command).then((response) => {
     event.sender.send(command.listenerName, { resCode: '000000', res: response })
   }).catch((err) => {
     let errorMsg = checkErrpr(err)
     let errCode = err.code ? `${err.code}_` : ''
     event.sender.send(command.listenerName, { resCode: '444444', res: { message: `${errorMsg}`, code: `${errCode}ELECTRON端` } })
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

