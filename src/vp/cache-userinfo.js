import cache from './util-cache'
import MixinPlugin from '../util/mixin-plugin'
import { info, warn } from '../util/warn'
import _ from 'lodash'
import { PLUGIN_VUEX_DEF_MODULE_NAME } from '../gloabl-dict'

const modelName = 'cache-userinfo'

// 登录用户存储到store中的key&id
const USER_INFO_KEY = '__USER__'

const SESSIONSTORAGE = 'sessionStorage'

let _installed, _store, _cache2, _defExp, _initUserInfo

/**
 * 缓存用户（登录用户）信息模块
 * 一般应用都需要在前端缓存登录用户的信息，以便在开发过程中使用，当前模块目前提供了一组将用户缓存到【localStorage|sessionStorage】的独立接口
 * <p>
 * 提供了缓存用户的一系列接口，可以在缓存用户时候设置缓存的超时时间，通过`CacheUserInfo#cacheSaveSignUserInfo.exp`
 * 在初始化插件的时候，如用户可能已经在原生客户端登录完毕，可以通过配置`CacheUserInfo#userInfo`来初始化用户状态相关信息；
 * <p>
 * 建议：
 * 因为某些应用对用户信息需要更安全的控制，故建议将缓存设置到sessionStorage，而某些应用对此有自己的一套加密或防御措施，有需要长期保持用户信息，就可以防止到localStorage，如需要做记住用户名这样的需求，放置到localStorage就是较好的选择
 */
let plugin = {
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
    this.restoreUserInfo()
  },
  /**
   * $vp.restoreUserInfo()
   * 恢复插件中对应`store#loginUserInfo`的登录相关状态，在当前模块重新安装的时候，一般对应就是插件初始化和页面刷新的时候
   */
  restoreUserInfo() {
    let user
    if (_.eq(_cache2, SESSIONSTORAGE)) {
      user = cache.cacheLoadFromSessionStore(USER_INFO_KEY)
    } else {
      user = cache.cacheLoadFromLocalStore(USER_INFO_KEY)
    }
    if (!_.isEmpty(user)) {
      _store.commit('setLoginUserInfo', user)
    }
  },
  /**
   * $vp.cacheSaveUserInfo(user, {exp = _defExp, force = true} = {})
   * 存储登录用户信息
   * <p>
   * 将会被插件的`login-state-check.js`模块使用，来进行登录权限控制
   * <p>
   * 存储到`CacheUserInfo#cache2`对应的缓存中，建议尽量不要将客户关键数据存储到本地，建议设置`exp`过期时间参数
   * @param {Object} [user=undefined]
   * @param {Number} [exp=20 * 60] 超时时间，默认使用`CacheUserInfo#exp`配置作为默认值
   * @param {Boolean} [force = true] true标识当超过最大容量导致无法继续插入数据操作时，先清空缓存中已超时的内容后再尝试插入数据操作。
   * @returns {*}
   */
  cacheSaveUserInfo(user, {exp = _defExp, force = true} = {}) {
    if (!_.isEmpty(user)) {
      info(`存储用户信息：${JSON.stringify(user)}`)
      // TODO 在进行*rbac*控制的时候，可以需要约束user的字段或者说添加
      if (this.isCachedUserInfoState()) {
        _store.commit('setLoginUserInfo', user)
        if (_.eq(_cache2, SESSIONSTORAGE)) {
          return cache.cacheReplaceFromSessionStore(USER_INFO_KEY, user, {
            exp,
            force
          })
        } else {
          return cache.cacheReplaceFromLocalStore(USER_INFO_KEY, user, {
            exp,
            force
          })
        }
      } else {
        _store.commit('setLoginUserInfo', user)
        if (_.eq(_cache2, SESSIONSTORAGE)) {
          return cache.cacheSaveToSessionStore(USER_INFO_KEY, user, {
            exp,
            force
          })
        } else {
          return cache.cacheSaveToLocalStore(USER_INFO_KEY, user, {
            exp,
            force
          })
        }
      }
    } else {
      warn('待存储的用户对象为空！')
    }
  },
  /**
   * $vp.cacheLoadUserInfo()
   * 获取存储登录用户信息
   * @returns {Object} 如果不存在存储登录用户信息
   */
  cacheLoadUserInfo() {
    return _store.state[PLUGIN_VUEX_DEF_MODULE_NAME].loginUserInfo
  },
  /**
   * $vp.cacheClearUserInfo()
   * 清除缓存的登录用户信息
   */
  cacheClearUserInfo() {
    _store.commit('setLoginUserInfo', {})
    if (_.eq(_cache2, SESSIONSTORAGE)) {
      cache.cacheDeleteToSessionStore(USER_INFO_KEY)
    } else {
      cache.cacheDeleteToLocalStore(USER_INFO_KEY)
    }
  },
  /**
   * $vp.isCachedUserInfoState()
   * 查询缓存用户信息状态
   * @returns {boolean} 返回true标识**登录用户信息**存储状态为正常，返回false标识存储信息已经过期或者被主动清理了
   */
  isCachedUserInfoState() {
    const user = this.cacheLoadUserInfo()
    console.log('isCachedUserInfoState', user)
    return !_.isEmpty(user)
  }
}

export default plugin

export const install = function (Vue, {
  store = null,
  cacheUserInfo: {
    installed = null,
    /**
     * 【可选】预制登录状态，如用户可能已经在原生客户端登录完毕，就可以通过此配置来初始化用户状态相关信息；
     */
    userInfo = {},
    /**
     * [*] {String} [cache2=sessionStorage|localStorage]
     * 设置登录用户信息将缓存到【localStorage|sessionStorage】其中一个存储中，默认`sessionStorage`
     * <p>
     * 因为某些应用对用户信息需要更安全的控制，故建议将缓存设置到sessionStorage，而某些应用对此有自己的一套加密或防御措施，有需要长期保持用户信息，就可以防止到localStorage，如需要做记住用户名这样的需求，就只能放置到localStorage
     * <p>
     * 此外建议手动设置`exp`来控制缓存有效期
     */
    cache2 = SESSIONSTORAGE,
    /**
     * [*] {Number} [exp=Infinity]
     * 默认缓存登录用户信息有效期
     * <p>
     * 类型Number，超时时间(秒)，公共超时事件设置。默认无限期
     */
    exp = Infinity
  } = {}
} = {}) {
  _installed = installed
  _store = store
  _cache2 = cache2
  _defExp = exp
  _initUserInfo = userInfo
  if (!_.isEmpty(_initUserInfo)) {
    plugin.cacheSaveUserInfo(_initUserInfo)
  }
  MixinPlugin.mixin(Vue, plugin, modelName)
}
