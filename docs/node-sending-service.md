# node-sending-service.js

node-sending-service.js 是用于跟Electron通信的一个自定义桥接模块。

为什么使用node-sending-service.js这个自定的模块

+ 做为vue-viewplus与Electron进行通信的桥梁
+ 在Electron端使用的node axios https发送交易

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
   * 发送交易接口-这里是通过Electron的通信模块实现
   * @param transcode
   * @params method
   * @params timeout
   * @param params
   * @params axiosOptions
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
+ 定义自定义方法sendingService做为连接和接收Electron通信结果（本质上还是前端跟Electron端通过Electron的主进程跟渲染进程的通信来完成的）

3.ipc-renderer-api.js（前端与Electron端进行通信的模块）

```js

let ipc = null
if (window.require) {
  ipc = window.require('electron').ipcRenderer
}

// 通知Electron 客戶端 发交易
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
4.vue-viewplus中util-http.js关于Electron模块，详见[util-http.js](http://jiiiiiin.cn/vue-viewplus/#/util-http)

 + 注：使用该模块 mode必须配置为ELECTRON

```js
else if (mode === 'ELECTRON') {
      return new Promise((resolve, reject) => {
        if (_.isFunction(_onSendAjaxParamsHandle)) {
          params = this::_onSendAjaxParamsHandle(url, params, mode)
        }
        let command = {
          transcode: url,
          mode: mode,
          method: method,
          timeout: _.has(axiosOptions, 'timeout') ? axiosOptions.timeout : _timeout,
          params: params,
          axiosOptions: axiosOptions
        }
        this.fireEvent(command).then((respdata) => {
          try {
            if (_.isFunction(_onSendAjaxRespHandle)) {
              respdata = _onSendAjaxRespHandle(respdata)
            }
            let errflag = _parseServerResp(respdata)
            if (errflag) {
              this::_handlerErr(needHandlerErr, respdata.data)
              reject(respdata)
            } else {
              resolve(_getResData(respdata))
            }
          } catch (e) {
            reject(e)
          }
        }).catch((err) => {
          this::_hLoading(showLoading)
          this::_handlerErr(needHandlerErr, err)
          reject(err)
        }).finally(() => {
          this::_hLoading(showLoading)
        })
      })
    }
```

5.vue-viewplus中js-bridge-context.js关于Electron模块，详见[js-bridge-context.js](http://jiiiiiin.cn/vue-viewplus/#/js-bridge-context)

```js
else if (command.mode === 'ELECTRON') {
            // For node todo something  node-sending-service.js
            if (!_.isNil(that.sendingService)) {
              that.sendingService(command).then((res) => {
                resolve(res)
              }).catch(error => {
                if (_.isNil(error) || JSON.stringify(error) === '{}') {
                  emitErr(new JsBridgeError('ELECTRON客户端发送交易错误', 'ELECTRON_SERVICE_ERROR'), reject, true)
                } else {
                  emitErr(new JsBridgeError(error.message, error.code), reject, true)
                }
              })
            } else {
              emitErr(new JsBridgeError('没有找到ELECTRON环境下对应sendingService方法', 'ELECTRON_ERROR_SERVICE_UNDEFINED'), reject, true)
            }
          }
```
