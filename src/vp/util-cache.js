import MixinPlugin from '../util/mixin-plugin'
import { warn } from '../util/warn'
import _ from 'lodash'
import WebStorageCache from 'web-storage-cache'

let _installed, _lsWSCache, _ssWSCache

export const modelName = 'util-cache'

/**
 * 缓存模块，为插件的其他模块提供缓存支持
 * <p>
 * 如防止页面在刷新之后vuex数据状态不能保持，有了缓存模块：
 * + 插件就可以从缓存中恢复自身维护的vuex state中的需要的值。
 * + 开发人员就可以使用同一的`$vp#cacheXXX`系列接口完成缓存操作，统一的大家的使用习惯和编码风格
 * 使用[web-storage-cache](https://github.com/WQTeam/web-storage-cache)做底层支持，从而支持在缓存的时候设置被缓存对象的超时时间
 * <p>
 * 注意，你可能去控制台查看数据的时候发现，设置了exp的数据在超时的时候还存在，那是因为`web-storage-cache`底层是将判断放在程序中控制的，也就是说如果你load出来的是一个程序判断依据超时的数据，那么`web-storage-cache`才会将其delete
 */
let plugin = {
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
  },
  /**
   * $vp.cacheSaveToLocalStore(key, value[, {exp = Infinity, force = true}])
   * 将数据存储到localStorage中
   * @param key [必填] 必须要为String类型。
   * @param value [必填] 支持所以可以JSON.parse 的类型。注：当为undefined的时候会执行 delete(key)操作。
   * @param exp 类型Number。超时时间，秒。默认无限大。
   * @param force 类型Boolean。为true时：当超过最大容量导致无法继续插入数据操作时，先清空缓存中已超时的内容后再尝试插入数据操作。默认为true。
   * @returns {boolean} 返回true标识存储成功，否则存储失败，失败原因一般都是因为参数类型不匹配，或者超出存储大小限制
   */
  cacheSaveToLocalStore(key, value, {exp = Infinity, force = true} = {}) {
    try {
      _lsWSCache.set(key, value, {
        exp,
        force
      })
      return true
    } catch (e) {
      warn(`存储${key}-${value}到local storage失败：${e.message}!`)
      return false
    }
  },
  /**
   * $vp.cacheModifyExpFromLocalStore(key, exp = Infinity)
   * 更新对应缓存的`exp`超时时间
   * <p>
   * 根据key为已存在的（未超时存储到localStorage中的）缓存值以当前时间为基准设置新的超时时间。
   * @param key [必填] String类型
   * @param exp [必填] number 单位：秒 js对象包含exp属性（以当前时间为起点的新的超时时间）
   * @returns {boolean}
   */
  cacheModifyExpFromLocalStore(key, exp = Infinity) {
    _lsWSCache.touch(key, exp)
  },
  /**
   * $vp.cacheReplaceFromLocalStore(key, value[, {exp = Infinity, force = true}])
   * 根据key做插入操作，如果key对应的值存在localStorage中并且未超时则替换该值，反之什么都不做
   * 注：超时时间以当前时间为基准重新设置。
   * <p>
   * 和`UtilCache#cacheSaveToLocalStore`的区别在于，cacheSaveToLocalStore不管数据是否存在都会重新插入或“更新超时时间”
   * @param key [必填] String类型
   * @param exp [必填] number 单位：秒 js对象包含exp属性（以当前时间为起点的新的超时时间）
   * @returns {boolean}
   */
  cacheReplaceFromLocalStore(key, value, {exp = Infinity, force = true} = {}) {
    try {
      _lsWSCache.replace(key, value, {
        exp,
        force
      })
      return true
    } catch (e) {
      warn(`替换${key}-${value}到local storage失败：${e.message}!`)
      return false
    }
  },
  /**
   * $vp.cacheLoadFromLocalStore(key[, def])
   * 根据key获取localStorage缓存中未超时数据。
   * <p>
   * 注意，你可能去控制台查看数据的时候发现，设置了exp的数据在超时的时候还存在，那是因为`web-storage-cache`底层是将判断放在程序中控制的，也就是说如果你load出来的是一个程序判断依据超时的数据，那么`web-storage-cache`才会将其delete
   * @param  {string} id  一个范围id或者说一个key对应一个对象
   * @param  {string} key 存储的键
   * @param  {string} def 默认值
   * @return {string}     返回相应类型String、Boolean、PlainObject、Array的值，如果获取到的值为`_.isUndefined(temp) || _.isEmpty(temp)`则返回默认值，并delete该key
   */
  cacheLoadFromLocalStore(key, def) {
    try {
      const temp = _lsWSCache.get(key)
      if (_.isUndefined(temp) || _.isEmpty(temp)) {
        _lsWSCache.delete(key)
        return def
      } else {
        return temp
      }
    } catch (e) {
      warn(`获取${key}对应的本地存储失败：${e.message}!`)
      return def
    }
  },
  /**
   * $vp.cacheDeleteToLocalStore(key)
   * 根据key删除localStorage缓存中的值。
   * @param key
   */
  cacheDeleteToLocalStore(key) {
    _lsWSCache.delete(key)
  },
  /**
   * $vp.cacheDeleteAllExpiresToLocalStore()
   * 删除缓存中所有存储到localStorage中的的超时值。
   */
  cacheDeleteAllExpiresToLocalStore() {
    _lsWSCache.deleteAllExpires()
  },
  /**
   * $vp.cacheClearToLocalStore()
   * 清空缓存中全部的值。注意：这个方法会清除不是使用`utilCacheInstall#cacheSaveToLocalStore`插入的值。推荐使用:`utilCacheInstall#cacheDeleteAllExpiresToLocalStore`
   */
  cacheClearToLocalStore() {
    _lsWSCache.clear()
  },
  /**
   * $vp.cacheSaveToSessionStore(key, value[, {exp = Infinity, force = true}])
   * 将数据存储到sessionStorage中
   * @param key [必填] 必须要为String类型。
   * @param value [必填] 支持所以可以JSON.parse 的类型。注：当为undefined的时候会执行 delete(key)操作。
   * @param exp 类型Number。超时时间，秒。默认无限大。
   * @param force 类型Boolean。为true时：当超过最大容量导致无法继续插入数据操作时，先清空缓存中已超时的内容后再尝试插入数据操作。默认为true。
   * @returns {boolean} 返回true标识存储成功，否则存储失败，失败原因一般都是因为参数类型不匹配，或者超出存储大小限制
   */
  cacheSaveToSessionStore(key, value, {exp = Infinity, force = true} = {}) {
    try {
      _ssWSCache.set(key, value, {
        exp,
        force
      })
      return true
    } catch (e) {
      warn(`存储${key}-${value}到session storage失败：${e.message}!`)
      return false
    }
  },
  /**
   * $vp.cacheModifyExpFromSessionStore(key, exp = Infinity)
   * 根据key为已存在的（未超时存储到sessionStorage中的）缓存值以当前时间为基准设置新的超时时间。
   * @param key [必填] String类型
   * @param exp [必填] number 单位：秒 js对象包含exp属性（以当前时间为起点的新的超时时间）
   * @returns {boolean}
   */
  cacheModifyExpFromSessionStore(key, exp = Infinity) {
    _ssWSCache.touch(key, exp)
  },
  /**
   * $vp.cacheSaveToSessionStore(key, value[, {exp = Infinity, force = true}])
   * 根据key做插入操作，如果key对应的值存在sessionStorage中并且未超时则替换该值，反之什么都不做
   * 注：超时时间以当前时间为基准重新设置。
   * @param key [必填] String类型
   * @param exp [必填] number 单位：秒 js对象包含exp属性（以当前时间为起点的新的超时时间）
   * @param force 类型Boolean。为true时：当超过最大容量导致无法继续插入数据操作时，先清空缓存中已超时的内容后再尝试插入数据操作。默认为true。
   * @returns {boolean}
   */
  cacheReplaceFromSessionStore(key, value, {exp = Infinity, force = true} = {}) {
    try {
      _ssWSCache.replace(key, value, {
        exp,
        force
      })
      return true
    } catch (e) {
      warn(`替换${key}-${value}到sessionStorage失败：${e.message}!`)
      return false
    }
  },
  /**
   * $vp.cacheLoadFromSessionStore(key[, def])
   * 根据key获取sessionStorage缓存中未超时数据。
   * @param  {string} id  一个范围id或者说一个key对应一个对象
   * @param  {string} key 存储的键
   * @param  {string} def 默认值
   * @return {string}     返回相应类型String、Boolean、PlainObject、Array的值，如果获取到的值为`_.isUndefined(temp) || _.isEmpty(temp)`则返回默认值，并delete该key
   */
  cacheLoadFromSessionStore(key, def) {
    try {
      const temp = _ssWSCache.get(key)
      if (_.isUndefined(temp) || _.isEmpty(temp)) {
        _ssWSCache.delete(key)
        return def
      } else {
        return temp
      }
    } catch (e) {
      warn(`获取${key}对应的本地存储失败：${e.message}!`)
      return def
    }
  },
  /**
   * $vp.cacheDeleteToSessionStore(key)
   * 根据key删除localStorage缓存中的值。
   * @param key
   */
  cacheDeleteToSessionStore(key) {
    _ssWSCache.delete(key)
  },
  /**
   * $vp.cacheDeleteAllExpiresToLocalStore()
   * 删除缓存中所有存储到localStorage中的的超时值。
   */
  cacheDeleteAllExpiresToSessionStore() {
    _ssWSCache.deleteAllExpires()
  },
  /**
   * $vp.cacheClearToSessionStore()
   * 清空缓存中全部的值。注意：这个方法会清除不是使用`utilCacheInstall#cacheSaveToSessionStore`插入的值。推荐使用:`utilCacheInstall#cacheDeleteAllExpiresToSessionStore`
   */
  cacheClearToSessionStore() {
    _ssWSCache.clear()
  }
}

export default plugin

export const install = function (Vue, {
  utilCache: {
    installed = null
  } = {}
} = {}) {
  // https://github.com/WQTeam/web-storage-cache
  _lsWSCache = new WebStorageCache({
    // [可选] 'localStorage', 'sessionStorage', window.localStorage, window.sessionStorage
    //        或者其他实现了 [Storage API] 的storage实例.
    //        默认 'localStorage'.
    storage: 'localStorage',
    // [可选]  类型Number，超时时间，秒，公共超时事件设置。默认无限大
    exp: Infinity
  })
  _ssWSCache = new WebStorageCache({
    storage: 'sessionStorage',
    exp: Infinity
  })
  _installed = installed
  MixinPlugin.mixin(Vue, plugin, modelName)
}
