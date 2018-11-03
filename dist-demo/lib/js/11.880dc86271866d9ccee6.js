webpackJsonp([11],{

/***/ "+dYg":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("nlzl");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("2f3335a1", content, true, {});

/***/ }),

/***/ "2Nep":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// EXTERNAL MODULE: ./node_modules/vux/src/components/cell/index.vue + 5 modules
var cell = __webpack_require__("1DHf");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/PageStack.vue




/* harmony default export */ var PageStack = ({
  mixins: [demo_mixin["a" /* default */]],
  components: {
    Cell: cell["a" /* default */]
  },
  data: function data() {
    return {
      isStackBottom: true
    };
  },

  methods: {
    next: function next() {
      this.$vp.psPageNext('/Demo/PageStack/Page1', { params: { phoneNumb: 13111111111 } });
    }
  },
  created: function created() {
    console.log('\u767B\u5F55\u524D\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/PageStack.vue




/* harmony default export */ var Demo_PageStack = ({
  mixins: [demo_mixin["a" /* default */]],
  components: {
    Cell: cell["a" /* default */]
  },
  data: function data() {
    return {
      isStackBottom: true
    };
  },

  methods: {
    next: function next() {
      this.$vp.psPageNext('/Demo/PageStack/Page1', { params: { phoneNumb: 13111111111 } });
    }
  },
  created: function created() {
    console.log('\u767B\u5F55\u524D\u72B6\u6001\u4E3A\uFF1A ' + this.$vp.isLogin());
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-48f6bfb9","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/PageStack.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"PageStack"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/params-stack"}},[_vm._v("params-stack.js 参数栈模块。")])]),_vm._v(" "),_c('span',{staticClass:"hint-title"},[_vm._v("注意：")]),_vm._v(" "),_c('ul',{staticClass:"hint-msg"},[_c('li',[_vm._v("1. 目前插件的参数栈并没有管理vue router帮我们传递的参数；")]),_vm._v(" "),_c('li',[_vm._v("2. 当前模块提供的参数传递方式，和vue router给我们提供了两种页面间传递参数的方式，**并不冲突**，可以互补使用；")])])])],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"模拟一个简单表单提交流程","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('cell',{staticStyle:{"color":"#af7f00"},attrs:{"title":"点击 手机充值","link":"/Demo/PageStack/Page1"},nativeOn:{"click":function($event){_vm.next()}}})],1)],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/PageStack.vue
function injectStyle (context) {
  __webpack_require__("+dYg")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-48f6bfb9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_PageStack,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_PageStack = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "nlzl":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PageStack.vue","sourceRoot":""}]);

// exports


/***/ })

});