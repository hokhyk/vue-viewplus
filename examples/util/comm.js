// import store from '@store/index'
//
// export function onHeaderBarTapBck ({ runNative = false } = {}) {
//   if (store.state.canBeBack) {
//     if (router.currentRoute.meta.subRoot) {
//       store.commit(mutationTypes.CLEAR_PARAMS_4STACK)
//       if (!runNative) {
//         alert('测试模式，将重载当前SPA APP')
//         window.location.reload(true)
//       }
//       if (runNative) {
//         window._VP.cnReq(dict.NATIVE_API_POPWEBVIEW)
//       }
//       return false
//     } else {
//       // store.commit(mutationTypes.DELETE_PARAMS_4STACK, this.$route.path)
//       store.commit(mutationTypes.DELETE_PARAMS_4STACK, router.currentRoute.path)
//       window._VP.pageTo(store.state.backPopPageNumbs)
//       store.commit(mutationTypes.SET_BACK_POP_PAGE_NUMBS, dict.DEFAULTBACKPAGE)
//       return true
//     }
//   }
// }
