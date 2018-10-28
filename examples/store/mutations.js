const _setAppTitlebarConfig = function (state, meta) {
  if (typeof (meta) === 'undefined') {
    meta.title = '首页'
    meta.visible = 'true'
  }
  state.appTitle = meta.title
  const _visible = typeof meta.visible === 'undefined' ? true : meta.visible
  state.appTitleBarVisible = _visible
}

export default {
  updateRunNativeStatus(state, isRunNative) {
    state.isRunNative = isRunNative
  },
  updateLoadingStatus(state, isLoading) {
    state.isLoading = isLoading
  },
  'navigation/FORWARD': (state, {to: {route: {meta}}}) => {
    this::_setAppTitlebarConfig(state, meta)
  },
  'navigation/REPLACE': (state, {to: {route: {meta}}}) => {
    this::_setAppTitlebarConfig(state, meta)
  },
  'navigation/BACK': (state, {to: {route: {meta}}, from}) => {
    this::_setAppTitlebarConfig(state, meta)
    // if (window._VP) {
    //   // 隐藏页面上的弹框组件
    //   window._VP.hideDialog()
    //   window._VP.hideConfirm()
    //   window._VP.hideLoading()
    // }
  },
  'navigation/REFRESH': (state, {to: {route: {meta}}}) => {
    this::_setAppTitlebarConfig(state, meta)
  }
}
