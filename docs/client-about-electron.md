# client-about-electron.js

client-about-electron.js 是用于跟Electron通信的一个自定义桥接模块。

为什么使用node-sending-service.js这个自定的模块

+ 使用该自定义模块，为前端使用vue-viewplus与Electron端通讯提供桥接

使用方法：

基于vue-viewplus，实现的一个自定义模块 ，非标准模块，需要手动配置：

1.main.js入口文件：

```js
import Vue from 'vue'
import ViewPlus from 'vue-viewplus'
import viewPlusOptions from '@/plugin/vue-viewplus'
import clientAboutElectron from '@/plugin/vue-viewplus/client-about-electron.js'

const {debug, errorHandler} = viewPlusOptions

Vue.use(ViewPlus, viewPlusOptions)

ViewPlus.mixin(Vue, clientAboutElectron, {
  debug,
  errorHandler,
  moduleName: '自定义clientAboutElectron'
})
```
2.client-about-electron.js

其实该自定义模块就做了以下一件事:
+ 定义自定义方法clientAboutElectron做为通讯和接收Electron端反馈结果（本质上就是前端跟Electron端通过Electron的主进程跟渲染进程的通信来完成的）

```js
import _ from 'lodash'

let ipc = null
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}

/**
 * 与Electron端进行通讯的统一接口clientAboutElectron
 *  @param  {Object} [command=null] Electron端所需的调用消息
 * command的格式：
 *  const command = {
   *  [*] mainProcessName用来标识请求Electron端的那个主进程方法
   *  mainProcessName: 'sending-service'
   *  // 【可选】params用来传递对应主进程方法需要的参数）
   *  params: {
   *      // 自定义需要传入到Electron端参数
   *      msg: 'hello world'
   *    }
   * }
 * @returns {Promise}
 */
export default {
  clientAboutElectron(command = null) {
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
          let err = {message: `Electron-ipcRenderer依赖模块未引入`, code: `NOT_FIND_ELECTRON_IPCRENDERER[前端]`}
          reject(err)
        }
      } else {
        let err = {message: `未运行于node环境下`, code: `NOT_RUN_NODE[前端]`}
        reject(err)
      }
    })
  }
}

```

3.使用该自定义模块 util-http.js mode必须配置为ELECTRON，详见[util-http.js]mode配置(http://jiiiiiin.cn/vue-viewplus/#/util-http)

4.前端请求-Electron端主进程接收前端通讯进行代理转发请求

 + 可能你的Electron端是这样的，具体根据你自己实际而定

 ```js

 // Electron 主进程收到前端发起的通讯（渲染进程发起的通讯）进行发送交易处理并反馈回去
ipcMain.on('sending-service', (event, command) => {
  sendingService(command.params).then((response) => {
    event.sender.send(command.listenerName, response)
  }).catch((err) => {
    let errorMsg = Base64.encode(checkErrpr(err) + '[ELECTRON]')
    let errCode = err.code ? `${err.code}_` : ''
    event.sender.send(command.listenerName, { ReturnMessage: `${errorMsg}`, ReturnCode: `${errCode}ELECTRON`, data: { ReturnMessage: `${errorMsg}`, ReturnCode: `${errCode}ELECTRON` } })
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

 5.mode='ELECTRON'模式下通过$vp.fireEvent调用方式与Electron端进行通信-案例

  ```js

  // $vp.fireEvent(command = null)方式获取Electrondaunt通讯—获取mac地址
  export function ipcGetMACVP() {
    let command = {
      mode: 'ELECTRON',
      mainProcessName: 'network-inteffaces'
    }
    this.$vp.fireEvent(command).then(res => {
      console.log('res_mac===', res)
    }).catch(err => {
      console.log('err_mac===', err)
    })
  }

   ```

