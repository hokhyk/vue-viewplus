import { base64 } from 'vux'

export function getTimestamp() {
  return this.$vp.ajaxGet('Timestamp.do')
}
/**
 * 扫描证件号/银行卡
 * @param type 1:银行卡 2: 身份证
 * @returns {Promise}
 */
export function scanCertificateOrBankCard(type) {
  return new Promise((resolve, reject) => {
    let action = null
    if (type === 1) {
      action = 'ScanBankCard'
    } else if (type === 2) {
      action = 'ScanIDCard'
    } else {
      reject(new Error('参数传递错误，请重新核对！'))
    }
    const command = {
      event: 'PasswordKeyboard',
      action: action
    }
    this.$vp.fireEvent(command).then(res => {
      // 银行卡：{bankNumber: '卡号带有空格', bankName:''}
      // 身份证: {code:'身份证号',address: '地址'}
      resolve(res.dataMap)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 通过明文获取密文
 * @param obj {keys:'',texts:''}(获取多个密文:{keys:'acno+amount', texts:'123+10'})
 * @returns {Promise}
 */
export function getEncryptForPlain(obj) {
  return new Promise((resolve, reject) => {
    if (!this.$vp.utilIs('Object', obj)) {
      reject(new Error('===参数类型不匹配'))
    }
    // 获取时间戳
    this::getTimestamp().then((data) => {
      obj.timestamp = base64.decode(data['Content'])
      const command = {
        event: 'PasswordKeyboard',
        action: 'encryptWithPlainText',
        params: obj
      }
      this.$vp.fireEvent(command).then(res => {
        resolve(res.dataMap)
      }).catch(err => {
        reject(err)
      })
    })
  })
}

/**
 * 调取原生通讯录
 * @param plain
 * @returns {Promise}
 */
export function getTelBooks() {
  return new Promise((resolve, reject) => {
    const command = {
      event: 'PasswordKeyboard',
      action: 'wkgetphonenum'
    }
    this.$vp.fireEvent(command).then(res => {
      // {ConcatName: '', PhoneNum: ''}
      resolve(res.dataMap)
    }).catch(err => {
      reject(err)
    })
  })
}
