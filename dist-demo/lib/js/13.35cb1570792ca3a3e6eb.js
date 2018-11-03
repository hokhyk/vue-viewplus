webpackJsonp([13],{

/***/ "C2vv":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"CacheUserInfo.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "I4K7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/CacheUserInfo.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var CacheUserInfo = ({
  mixins: [demo_mixin["a" /* default */]],
  methods: {
    doCacheSaveUserInfo: function doCacheSaveUserInfo() {
      this.$vp.cacheSaveUserInfo({ name: 'admin' });
      var user = this.$vp.cacheLoadUserInfo();
      this.$vp.dialog(user, { title: '查询缓存用户信息', showCode: true });
    },
    doCacheClearUserInfo: function doCacheClearUserInfo() {
      this.$vp.cacheLoadUserInfo();
      var user = this.$vp.cacheLoadUserInfo();
      this.$vp.dialog(user, { title: '查询缓存用户信息', showCode: true });
    },
    doIsCachedUserInfoState: function doIsCachedUserInfoState() {
      var state = this.$vp.isCachedUserInfoState();
      this.$vp.dialog(state);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/CacheUserInfo.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Demo_CacheUserInfo = ({
  mixins: [demo_mixin["a" /* default */]],
  methods: {
    doCacheSaveUserInfo: function doCacheSaveUserInfo() {
      this.$vp.cacheSaveUserInfo({ name: 'admin' });
      var user = this.$vp.cacheLoadUserInfo();
      this.$vp.dialog(user, { title: '查询缓存用户信息', showCode: true });
    },
    doCacheClearUserInfo: function doCacheClearUserInfo() {
      this.$vp.cacheLoadUserInfo();
      var user = this.$vp.cacheLoadUserInfo();
      this.$vp.dialog(user, { title: '查询缓存用户信息', showCode: true });
    },
    doIsCachedUserInfoState: function doIsCachedUserInfoState() {
      var state = this.$vp.isCachedUserInfoState();
      this.$vp.dialog(state);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3a7ac46d","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/CacheUserInfo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"CacheUserInfo"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/cache-userinfo"}},[_vm._v("cache-userinfo.js 缓存用户（登录用户）信息模块。")])]),_vm._v(" "),_c('span',{staticClass:"hint-title"},[_vm._v("注意：")]),_vm._v(" "),_c('ul',{staticClass:"hint-msg"},[_c('li',[_vm._v("1. 提供了缓存用户的一系列接口，可以在缓存用户时候设置缓存的超时时间，通过`CacheUserInfo#cacheSaveSignUserInfo.exp`")]),_vm._v(" "),_c('li',[_vm._v("2. 在初始化插件的时候，如用户可能已经在原生客户端登录完毕，可以通过配置`CacheUserInfo#userInfo`来初始化用户状态相关信息；")])])])],1),_vm._v(" "),_c('group',{attrs:{"title":"使用$vp#cacheSaveUserInfo将用户信息存储到中：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheSaveUserInfo() {\n  this.$vp.cacheSaveUserInfo(\n    { name: 'admin' }\n  )\n  const user = this.$vp.cacheLoadUserInfo()\n  this.$vp.dialog(user, { title: '查询缓存用户信息', showCode: true })\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheSaveUserInfo($event)}}},[_vm._v("运行")])],1)],1),_vm._v(" "),_c('group',{attrs:{"title":"使用$vp#doCacheClearUserInfo 清除缓存用户信息：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheClearUserInfo() {\n  this.$vp.cacheLoadUserInfo()\n  const user = this.$vp.cacheLoadUserInfo()\n  this.$vp.dialog(user, { title: '查询缓存用户信息', showCode: true })\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheClearUserInfo($event)}}},[_vm._v("运行")])],1)],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"使用$vp#doIsCachedUserInfoState 查询缓存用户信息状态：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoIsCachedUserInfoState() {\n  const state = this.$vp.isCachedUserInfoState()\n  this.$vp.dialog(state)\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheClearUserInfo($event)}}},[_vm._v("运行")])],1)],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/CacheUserInfo.vue
function injectStyle (context) {
  __webpack_require__("yHsK")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3a7ac46d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_CacheUserInfo,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_CacheUserInfo = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "yHsK":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("C2vv");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("c723cd4e", content, true, {});

/***/ })

});