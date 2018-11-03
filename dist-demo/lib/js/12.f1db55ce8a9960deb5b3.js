webpackJsonp([12],{

/***/ "eTfp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// EXTERNAL MODULE: ./node_modules/vux/src/components/cell/index.vue + 5 modules
var cell = __webpack_require__("1DHf");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/LoginStateCheck.vue




/* harmony default export */ var LoginStateCheck = ({
  mixins: [demo_mixin["a" /* default */]],
  components: {
    Cell: cell["a" /* default */]
  },
  methods: {
    doLogin: function doLogin() {
      var _this = this;

      this.$vp.ajaxMixin('LOGIN').then(function (data) {
        _this.doLoginBtnState = false;
        _this.$vp.modifyLoginState(true);
        console.log('\u767B\u5F55\u540E\u72B6\u6001\u4E3A\uFF1A ' + _this.$vp.isLogin());
        _this.$vp.uiToast('模拟登录成功');
      });
    },
    doLogout: function doLogout() {
      console.log('\u767B\u51FA\u524D\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
      this.$vp.modifyLoginState(false);
      console.log('\u767B\u5F55\u540E\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
      this.$vp.uiToast('退出登录完成');
    },
    doForcedWithdrawal: function doForcedWithdrawal() {
      var _this2 = this;

      this.$vp.ajaxMixin('FORCEDWITHDRAWAL', {
        mode: 'GET'
      }).catch(function (resp) {
        console.error('\u6A21\u62DF\u5F3A\u5236\u7B7E\u9000\u5B8C\u6210\uFF1A' + resp);
        _this2.$vp.uiToast('模拟强制签退完成');
      });
    }
  },
  created: function created() {
    console.log('\u767B\u5F55\u524D\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/LoginStateCheck.vue




/* harmony default export */ var Demo_LoginStateCheck = ({
  mixins: [demo_mixin["a" /* default */]],
  components: {
    Cell: cell["a" /* default */]
  },
  methods: {
    doLogin: function doLogin() {
      var _this = this;

      this.$vp.ajaxMixin('LOGIN').then(function (data) {
        _this.doLoginBtnState = false;
        _this.$vp.modifyLoginState(true);
        console.log('\u767B\u5F55\u540E\u72B6\u6001\u4E3A\uFF1A ' + _this.$vp.isLogin());
        _this.$vp.uiToast('模拟登录成功');
      });
    },
    doLogout: function doLogout() {
      console.log('\u767B\u51FA\u524D\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
      this.$vp.modifyLoginState(false);
      console.log('\u767B\u5F55\u540E\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
      this.$vp.uiToast('退出登录完成');
    },
    doForcedWithdrawal: function doForcedWithdrawal() {
      var _this2 = this;

      this.$vp.ajaxMixin('FORCEDWITHDRAWAL', {
        mode: 'GET'
      }).catch(function (resp) {
        console.error('\u6A21\u62DF\u5F3A\u5236\u7B7E\u9000\u5B8C\u6210\uFF1A' + resp);
        _this2.$vp.uiToast('模拟强制签退完成');
      });
    }
  },
  created: function created() {
    console.log('\u767B\u5F55\u524D\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3f1707fe","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/LoginStateCheck.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"LoginStateCheck"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/login-state-check"}},[_vm._v("login-state-check.js 身份认证控制模块。")])]),_vm._v(" "),_c('span',{staticClass:"hint-title"},[_vm._v("注意：")]),_vm._v(" "),_c('ul',{staticClass:"hint-msg"},[_c('li',[_vm._v("1. 该模块维护了一个vuex state `vplus#loginState`，来持有用户登录状态，在页面刷新的时候也通过缓存数据来对其进行恢复；")]),_vm._v(" "),_c('li',[_vm._v("2. 这个状态建议配合UtilHttp#accessRules.sessionTimeOut和UtilHttp#accessRules.onSessionTimeOut，来使用，也就是一般应用都是后台来控制登录状态或者说会话的时长，你需要在sessionTimeOut中配置后台会话超时返回的错误码，这样插件就会自动将当期模块的vplus#loginState设置为false，这样就帮我们管理了这个不可控状态；")]),_vm._v(" "),_c('li',[_vm._v("3. 如果没有配置在改列表里面的都被视为公共交易，即不需要身份认证就可以访问；")])])])],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"模拟一个简单的身份认证控制流程","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('cell',{attrs:{"title":"点击测试访问一个需要登录之后才能访问的页面","link":"/Demo/Manage/User"}})],1),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{nativeOn:{"click":function($event){return _vm.doLogin($event)}}},[_vm._v("登录")])],1),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{nativeOn:{"click":function($event){return _vm.doLogout($event)}}},[_vm._v("退出登录")])],1),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{nativeOn:{"click":function($event){return _vm.doForcedWithdrawal($event)}}},[_vm._v("模拟强制签退")])],1),_vm._v(" "),_c('cell-box',[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\nmethods: {\n  doLogin() {\n    this.$vp.ajaxMixin('LOGIN').then(data => {\n      this.doLoginBtnState = false\n      this.$vp.modifyLoginState(true)\n      console.log(`登录后状态为： ${this.$vp.isLogin()}`)\n      this.$vp.uiToast('模拟登录成功')\n    })\n  },\n  doLogout() {\n    console.log(`登出前状态为： ${this.$vp.isLogin()}`)\n    this.$vp.modifyLoginState(false)\n    console.log(`登录后状态为： ${this.$vp.isLogin()}`)\n    this.$vp.uiToast('退出登录完成')\n  },\n  doForcedWithdrawal() {\n    this.$vp\n      .ajaxMixin('FORCEDWITHDRAWAL', {\n        mode: 'GET'\n      })\n      .catch(resp => {\n        console.error(`模拟强制签退完成：${resp}`)\n        this.$vp.uiToast('模拟强制签退完成')\n      })\n  }\n},\ncreated() {\n  console.log(\n    `登录前状态为： ${this.$vp.isLogin()}`\n  )\n}\n    ")])])])],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/LoginStateCheck.vue
function injectStyle (context) {
  __webpack_require__("phw8")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3f1707fe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_LoginStateCheck,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_LoginStateCheck = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "pM+R":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"LoginStateCheck.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "phw8":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("pM+R");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("5336c531", content, true, {});

/***/ })

});