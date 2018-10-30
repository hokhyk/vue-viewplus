import { ToastPlugin, AlertPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import _ from 'lodash'

let _Vue, /* 计时器 */_t

/**
 * 常用工具函数模块
 */
const plugin = {
  toast(msg = '默认消息！', {position = 'bottom', time = 3000, width = '7.6em', type = 'text'} = {}) {
    _Vue.$vux.toast.show({
      text: msg,
      time,
      position,
      width,
      type
    })
    return this
  },
  dialog(content = '未知消息!', {title = '操作结果', action, buttonText = '确认', hideOnBlur = false, showCode = false} = {}) {
    // 需要注意 onCancel 和 onConfirm 的 this 指向
    const _this = this
    if (showCode) {
      content = `<pre v-highlightjs class="alert-json"><code class="json">${JSON.stringify(content, null, 2)}</code></pre>`
    }
    _Vue.$vux.alert.show({
      title,
      content,
      buttonText,
      hideOnBlur,
      onShow() {
      },
      onHide() {
        if (_.isFunction(action)) {
          _this::action()
        }
      }
    })
    return this
  },
  hideDialog() {
    _Vue.$vux.alert.hide()
    return this
  },
  confirm(content = '确认消息!', {title = '提示', onConfirm, onCancel, confirmText = '确认', cancelText = '取消', theme = 'ios', hideOnBlur = false, canBeBack = false} = {}) {
    // 需要注意 onCancel 和 onConfirm 的 this 指向
    const _this = this
    _Vue.$vux.confirm.show({
      // 组件除show外的属性
      theme,
      title,
      content,
      confirmText,
      cancelText,
      hideOnBlur,
      onShow() {
        // _this::onModCanBeBack(canBeBack)
      },
      onCancel() {
        if (_this.utilIs('Function', onCancel)) {
          _this::onCancel()
        }
      },
      onConfirm() {
        if (_this.utilIs('Function', onConfirm)) {
          _this::onConfirm()
        }
      },
      onHide() {
        // _this::onModCanBeBack(!canBeBack)
      }
    })
    return this
  },
  hideConfirm() {
    _Vue.$vux.confirm.hide()
  },
  /**
   * Loading 加载
   * @param text
   * @param position
   * @param time
   * @returns {plugin}
   */
  uiLoading(text = '加载中...', {position = 'fixed', time} = {}) {
    _Vue.$vux.loading.show({
      text,
      position
    })
    if (time) {
      _t = setTimeout(() => {
        _Vue.$vux.loading.hide()
        if (_t) {
          clearTimeout(_t)
        }
      }, time)
    }
    return this
  },
  uiHideLoading() {
    if (_t) {
      clearTimeout(_t)
    }
    _Vue.$vux.loading.hide()
  },
  install(Vue) {
    _Vue = Vue
    _Vue.use(ToastPlugin)
    _Vue.use(AlertPlugin)
    _Vue.use(LoadingPlugin)
    _Vue.use(ConfirmPlugin)
  }
}

export default plugin
