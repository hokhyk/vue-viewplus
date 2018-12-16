import { PLUGIN_VUEX_DEF_MODULE_NAME } from '../gloabl-dict'
import {
  warn,
  checkVp
} from '../util/warn'
import MixinPlugin from '../util/mixin-plugin'
import utilCache from './util-cache'
import _ from 'lodash'

export const modelName = 'login-state-check'
/**
 * 缓存登录状态的key
 * @type {string}
 */
const USER_SIGN_STATE_KEY = '__USER_SIGN_STATE__'

let _router,
  _store,
  _checkPaths,
  _onLoginStateCheckFail,
  _installed

/**
 *  login-state-check.js 身份认证权限控制模块。
 *
 *  使用该模块可以让应用使用一个包含正则表达式的数组`LoginStateCheck#checkPaths`，来定义需要进行身份认证（登录）才能访问的页面资源（路由的path），这样做的好处就在于，我们不用向很多应用那些去修改路由组件中的mate字段来确认哪一个路由组件需要进行身份认证权限控制。
 *
 *  一般的应用在权限控制这一块，一般有两种需求，一种是基于`RBAC`权限模型的管理端应用，而大多数应用只需要控制那些页面需要用户登录才能访问；当前模块默认认为所有页面都是`公共资源`，如果要进行身份认证权限控制，可以这样定义：
 *
 *  ```js
 *  loginStateCheckInstall: {
 *     checkPaths: [
 *       /User\/Manage/
 *     ],
 *     ...
 * ```
 * 这样所有用户管理资源就都需要登录才能进行访问了。
 *
 * 注：
 *
 * + 该模块维护了一个vuex state `vplus#loginState`，来持有用户登录状态，在页面刷新的时候也通过缓存数据来对其进行恢复；
 * + 这个状态建议配合`UtilHttp#accessRules.sessionTimeOut`和`UtilHttp#accessRules.onSessionTimeOut`，来使用，也就是一般应用都是后台来控制登录状态或者说会话的时长，你需要在`sessionTimeOut`中配置后台会话超时返回的错误码，这样插件就会自动将当期模块的`vplus#loginState`设置为false，这样就帮我们管理了这个**不可控**状态；
 * 如果没有配置在改列表里面的都被视为**公共交易**，即不需要身份认证就可以访问
 */
let plugin = {
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
    // 在这里恢复插件的需要进行缓存的vuex状态
    this.restoreLoginState()
  },
  /**
   * $vp.isLogin()
   * 获取用户登录状态
   * <p>
   * @return {boolean} 如果处于登录状态返回true，否则返回false，直接通过获取插件vuex state中对应`loginState`的值
   */
  isLogin() {
    return _store.state[PLUGIN_VUEX_DEF_MODULE_NAME].loginState
  },
  /**
   * $vp.modifyLoginState(isLogin = false)
   * 修改登录状态
   * <p>
   * 会修改插件vuex state中对应`loginState`的值
   * <p>
   * 注意用户的登录状态前端只是一个`临时维护`，即在服务端设置的session或者token有效期到了之后，服务端一般会返回**会话超时**这样的错误，故我们在`util-http`模块还对此作了预留处理，详见`utilHttpInstall#accessRules.onSessionTimeOut`配置
   * 所以在这里我们只用操作vuex中的状态即可
   * @param {Boolean} [isLogin=false]       插件使用vuex时候维护的登录状态
   */
  modifyLoginState(isLogin = false) {
    _store.commit('modifyLoginState', isLogin)
    utilCache.cacheSaveToSessionStore(USER_SIGN_STATE_KEY, isLogin)
  },
  /**
   * $vp.restoreLoginState()
   * 恢复插件中对应`store#loginState`的登录相关状态，在当前模块重新安装的时候，一般对应就是页面刷新的时候
   */
  restoreLoginState() {
    const state = utilCache.cacheLoadFromSessionStore(USER_SIGN_STATE_KEY)
    this.modifyLoginState(state)
  }
}

/**
 * 依赖路由的`router#beforeEach((to, from, next))`钩子来进行身份认证（用户登录）权限控制
 * <p>
 * 判断规则：如果在`LoginStateCheck#checkPaths`**需要身份认证规则集**中，那么就需要查看用户是否登录，如果没有登录就拒绝访问
 * @param to
 * @param from
 * @param next
 * @private
 */
const _check = function (to, from, next) {
  // 默认认为没有在`checkPaths`中的都是公共页面不需要校验是否需要登录
  let isAllow = true
  const path = to.path
  for (let i = _checkPaths.length; i--;) {
    const rule = _checkPaths[i]
    // 如果在**需要身份认证规则集**中，那么就需要查看用户是否登录，如果没有登录就拒绝访问
    if (rule.test(path) && !plugin.isLogin()) {
      isAllow = false
      break
    }
  }
  if (isAllow) {
    next()
  } else {
    if (_.isFunction(_onLoginStateCheckFail)) {
      warn(`身份认证模块到用户并未登录，访问${path}，回调onLoginStateCheckFail钩子`, this)
      checkVp()::_onLoginStateCheckFail(to, from, next)
    } else {
      next(new Error('authtication_check_login_state_fail'))
    }
  }
}

export default plugin

export const install = function (Vue, {
  router = null,
  store = null,
  loginStateCheck: {
    /**
     * 需要进行身份认证检查的路由path路径集合
     * {Array<Object>}
     * <p>
     * 数组中的item，必须要是一个**正则表达式字面量**，如`[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]`
     * <p>
     * 匹配规则：如果在`LoginStateCheck#checkPaths`**需要身份认证规则集**中，那么就需要查看用户是否登录，如果没有登录就拒绝访问
     */
    checkPaths = [],
    /**
     * [*] `$vp#onLoginStateCheckFail(to, from, next)`
     * <p>
     * 身份认证检查失败时被回调
     */
    onLoginStateCheckFail = null,
    /**
     * 【可选】在初始化插件的时候，预制登录状态，如用户可能已经在原生客户端登录完毕，故可以通过此配置来初始化用户状态相关信息；
     */
    isLogin = false,
    installed = null
  } = {}
} = {}) {
  _router = router
  _store = store
  _checkPaths = checkPaths
  _onLoginStateCheckFail = onLoginStateCheckFail
  if (_.isArray(_checkPaths) && !_.isEmpty(_checkPaths)) {
    _router.beforeEach((to, from, next) => {
      _check(to, from, next)
    })
    if (!_.isFunction(onLoginStateCheckFail)) {
      warn(`${modelName}模块 onLoginStateCheckFail 未配置，将导致监测到授权失败，插件将会使用默认处理next(error)`)
    }
  }
  plugin.modifyLoginState(isLogin)
  _installed = installed
  MixinPlugin.mixin(Vue, plugin, modelName)
}
