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
