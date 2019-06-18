import _ from 'lodash'

let ipc = null
if (window.require) {
  ipc = window.require('electron').ipcRenderer
} else {
  throw new Error('Electron#ipcRenderer依赖模块未定义，请检查是否运行在electron客户端')
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
        let err = {message: `未运行于node环境下`, code: `NOT_RUN_NODE[前端]`}
        reject(err)
      }
    })
  }
}
