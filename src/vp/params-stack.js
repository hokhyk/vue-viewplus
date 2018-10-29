import { mapMutations } from 'vuex'
import { warn, emitErr } from '../util/warn'
import MixinPlugin from '../util/mixin-plugin'
import _utilHttp from '../vp/util-http'
import _ from 'lodash'

export const modelName = 'params-stack'

let _store, _moduleName, _backPopPageNumbs, _installed

const _utilObjHasVal = function (tempParams) {
  return _.isObject(tempParams) && !_.isEmpty(tempParams)
}
/**
 * 参数栈模块
 * 1. 如果是栈底需要设置对应的路由，meta.subRoot为true
 * @type {Object}
 */
export const paramsStackMixin = {
  data() {
    return {
      bckNumbs: -1,
      stackBootom: false
    }
  },
  computed: {
    tempParams() {
      return this.$store.state[_moduleName].tempParams
    },
    params() {
      return this.$store.state[_moduleName].params
    },
    backParams() {
      return this.$store.state[_moduleName].backParams
    },
    backPopPageNumbs() {
      return this.$store.state[_moduleName].backPopPageNumbs
    },
    backState() {
      return this.$store.state[_moduleName].backState
    }
  },
  watch: {
    bckNumbs(newNumbs) {
      this.setBackPopPageNumbs(newNumbs)
    },
    '$route'(to, from) {
      this.update({bckState: this.backState, clearPath: from.path, rollbackPath: to.path})
    }
  },
  methods: {
    ...mapMutations([
      'setParams',
      'setParams2Stack',
      'rollbackParamsOnBack',
      'setBackPopPageNumbs',
      'clearParamsStack',
      'setBackState',
      'deleteParamByName'
    ]),
    update({bckState = false, rollbackPath = '', clearPath = ''} = {}) {
      if (bckState) {
        this.$store.commit('setParams', {})
        if (!_.isEmpty(clearPath)) {
          this.deleteParamByName(clearPath)
        }
        if (!_.isEmpty(rollbackPath)) {
          this.rollbackParamsOnBack(rollbackPath)
        }
        if (_utilObjHasVal(this.tempParams)) {
          this.$store.commit('setBackParams', this.tempParams)
          this.$store.commit('setTempParams', {})
        }
      } else {
        let data = null
        if (_.isObject(this.params) && !_.isEmpty(this.params)) {
          data = this.params
        }
        const tempParams = this.$store.state[_moduleName].tempParams
        if (_utilObjHasVal(tempParams)) {
          // 推荐使用 this.$vp.psPageNext('/Demo/PageStack/Page2', {params: this.dataParams}) 方式向下传递参数
          data = {...data, ...tempParams}
          this.$store.commit('setTempParams', {})
        }
        if (_utilObjHasVal(data)) {
          this.setParams(data)
          this.setParams2Stack({name: this.$route.path, params: data})
        }
      }
    }
  },
  created() {
    this.$navigation.once('back', (to, from) => {
      this.update({bckState: true, clearPath: from.route.path, rollbackPath: to.route.path})
    })
    if (!this.backState) {
      this.update({bckState: this.backState})
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('setToPath', to.path)
      vm.$store.commit('setFromPath', from.path)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.update({bckState: this.backState})
    next()
  },
  beforeRouteLeave(to, from, next) {
    if (this.backState && this.stackBootom) {
      this.clearParamsStack()
    }
    next()
  }
}

/**
 * 和参数栈相关的工具方法
 */
const plugin = {
  installed() {
    if (_.isFunction(_installed)) {
      this::_installed()
    }
  },
  psModifyBackState(bckState) {
    _store.commit('setBackState', bckState)
  },
  psModifyParams(params) {
    _store.commit('setParams', params)
  },
  psModifyBackPopPageNumbs(numbs) {
    _store.commit('setBackPopPageNumbs', numbs)
  },
  psClearParamsStack() {
    _store.commit('clearParamsStack')
  },
  psPageNext(location, {params = null, backPopPageNumbs = _backPopPageNumbs} = {}) {
    if (_utilObjHasVal(params)) {
      _store.commit('setTempParams', params)
    }
    this.psModifyBackPopPageNumbs(_backPopPageNumbs)
    this.psModifyBackState(false)
    _store.commit('setBackParams', {})
    _utilHttp.pageNext(location)
  },
  psPageReplace(location, {params = null, backPopPageNumbs = _backPopPageNumbs} = {}) {
    if (_utilObjHasVal(params)) {
      _store.commit('setTempParams', params)
    }
    this.psModifyBackPopPageNumbs(_backPopPageNumbs)
    this.psModifyBackState(false)
    _store.commit('setBackParams', {})
    _utilHttp.pageReplace(location)
    _store.commit('deleteParamByName', _store.state[_moduleName].toPath)
  },
  psGoBack({backParams = {}, backPopPageNumbs = NaN} = {}) {
    if (_utilObjHasVal(backParams)) {
      _store.commit('setTempParams', backParams)
    }
    this.psModifyBackState(true)
    if (!isNaN(backPopPageNumbs)) {
      this.psModifyBackPopPageNumbs(backPopPageNumbs)
    }
    _utilHttp.pageTo(_store.state[_moduleName].backPopPageNumbs)
    this.psModifyBackPopPageNumbs(_backPopPageNumbs)
    if (this.bckNumbs) {
      this.psClearParamsStack()
    }
  }
}

export default plugin

export const install = function (Vue, {
  store = null,
  paramsStack: {
    moduleName = 'pageStack',
    backPopPageNumbs = -1,
    installed = null
  } = {}
} = {}) {
  let pluginCanUse = true
  if (!store) {
    emitErr(new Error(`store配置参数未传递，无法添加${modelName}模块！`), null, true)
    pluginCanUse = false
  }
  if (!Vue.prototype.hasOwnProperty('$navigation')) {
    emitErr(new Error(`需要依赖vue-navigation，请看插件info->peerDependencies描述，无法添加${modelName}模块！`), null, true)
    pluginCanUse = false
  }
  if (pluginCanUse) {
    _store = store
    _moduleName = moduleName
    _backPopPageNumbs = backPopPageNumbs
    _store.registerModule(moduleName, {
      state: {
        toPath: '',
        fromPath: '',
        params: {},
        tempParams: {},
        paramsStack: {},
        backParams: {},
        // 返回按钮返回的页面数
        backPopPageNumbs: _backPopPageNumbs,
        backState: false
      },
      mutations: {
        'setToPath': (state, toPath) => {
          state.toPath = toPath
        },
        'setFromPath': (state, fromPath) => {
          state.fromPath = fromPath
        },
        'setTempParams': (state, params) => {
          state.tempParams = params
        },
        'setParams': (state, params) => {
          state.params = params
        },
        'setBackParams': (state, params) => {
          state.backParams = params
        },
        'setBackPopPageNumbs': (state, numb) => {
          state.backPopPageNumbs = numb
        },
        /**
         * 通过页面id（路由path），将页面和页面所需参数缓存到参数栈
         * @type {[type]}
         */
        'setParams2Stack': (state, { name, params }) => {
          if (name && name.trim().length > 0 && _utilObjHasVal(params)) {
            state.paramsStack[name] = params
          } else {
            warn(`setParams2Stack设置的参数不是一个对象或者没有值 ${params}`)
          }
        },
        /**
         * 如果返回状态为真，则从paramsStack存储容器中读取页面之前设置到其中的参数到params状态
         */
        'rollbackParamsOnBack': (state, name) => {
          const temp = state.paramsStack[name]
          if (temp) {
            state.params = temp
          }
        },
        'deleteParamByName': (state, name) => {
          delete state.paramsStack[name]
        },
        'clearParamsStack': (state) => {
          state.paramsStack = {}
          state.backParams = {}
          state.params = {}
        },
        'setBackState': (state, bckState) => {
          state.backState = bckState
        },
        'navigation/FORWARD': (state, { to }) => {
          state.backState = false
        },
        'navigation/REPLACE': (state, { to }) => {
          state.backState = false
        },
        'navigation/BACK': (state, { to, from }) => {
          state.backState = true
        },
        'navigation/REFRESH': (state, { to }) => {
          state.backState = false
        }
      }
    })

    _installed = installed
    MixinPlugin.mixin(Vue, plugin, modelName)
  }
}
