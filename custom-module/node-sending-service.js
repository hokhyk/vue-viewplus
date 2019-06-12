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
