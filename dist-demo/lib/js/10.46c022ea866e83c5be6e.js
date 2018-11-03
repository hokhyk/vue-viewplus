webpackJsonp([10],{

/***/ "2ZNZ":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("Ichw");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("7ab1b735", content, true, {});

/***/ }),

/***/ "Ichw":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"UtilCache.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "i1lQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/UtilCache.vue
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


// import _ from 'lodash'

/* harmony default export */ var UtilCache = ({
  mixins: [demo_mixin["a" /* default */]],
  data: function data() {
    return {};
  },

  methods: {
    doCacheSaveToLocalStore: function doCacheSaveToLocalStore() {
      this.$vp.cacheSaveToLocalStore('user', { name: 'admin' }, {
        exp: 5
      });
    },
    doCacheModifyExpFromLocalStore: function doCacheModifyExpFromLocalStore() {
      var _this = this;

      this.$vp.cacheSaveToLocalStore('test-exp', 'exp', {
        exp: 30
      });
      setTimeout(function () {
        _this.$vp.cacheModifyExpFromLocalStore('test-exp', 1);
        setTimeout(function () {
          var data = _this.$vp.cacheLoadFromLocalStore('test-exp', '数据已经被更新之后，过期了');
          _this.$vp.dialog(data);
        }, 3000);
      }, 3000);
    },
    doCacheLoadFromLocalStore: function doCacheLoadFromLocalStore() {
      var data = this.$vp.cacheLoadFromLocalStore('user', { name: 'tourist' });
      this.$vp.dialog(data, {
        showCode: true
      });
    },
    doCacheDeleteToLocalStore: function doCacheDeleteToLocalStore() {
      var _this2 = this;

      this.$vp.cacheSaveToLocalStore('test-del', 'delete');
      this.$vp.uiToast('\u7F13\u5B58\u7684\u503C: ' + this.$vp.cacheLoadFromLocalStore('test-del'));
      setTimeout(function () {
        _this2.$vp.cacheDeleteToLocalStore('test-del');
        var data = _this2.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了');
        _this2.$vp.dialog(data, {
          showCode: true
        });
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/UtilCache.vue
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


// import _ from 'lodash'

/* harmony default export */ var Demo_UtilCache = ({
  mixins: [demo_mixin["a" /* default */]],
  data: function data() {
    return {};
  },

  methods: {
    doCacheSaveToLocalStore: function doCacheSaveToLocalStore() {
      this.$vp.cacheSaveToLocalStore('user', { name: 'admin' }, {
        exp: 5
      });
    },
    doCacheModifyExpFromLocalStore: function doCacheModifyExpFromLocalStore() {
      var _this = this;

      this.$vp.cacheSaveToLocalStore('test-exp', 'exp', {
        exp: 30
      });
      setTimeout(function () {
        _this.$vp.cacheModifyExpFromLocalStore('test-exp', 1);
        setTimeout(function () {
          var data = _this.$vp.cacheLoadFromLocalStore('test-exp', '数据已经被更新之后，过期了');
          _this.$vp.dialog(data);
        }, 3000);
      }, 3000);
    },
    doCacheLoadFromLocalStore: function doCacheLoadFromLocalStore() {
      var data = this.$vp.cacheLoadFromLocalStore('user', { name: 'tourist' });
      this.$vp.dialog(data, {
        showCode: true
      });
    },
    doCacheDeleteToLocalStore: function doCacheDeleteToLocalStore() {
      var _this2 = this;

      this.$vp.cacheSaveToLocalStore('test-del', 'delete');
      this.$vp.uiToast('\u7F13\u5B58\u7684\u503C: ' + this.$vp.cacheLoadFromLocalStore('test-del'));
      setTimeout(function () {
        _this2.$vp.cacheDeleteToLocalStore('test-del');
        var data = _this2.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了');
        _this2.$vp.dialog(data, {
          showCode: true
        });
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-b8b4f922","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/UtilCache.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"UtilCache"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/util-cache"}},[_vm._v("util-cache.js 缓存模块。")])]),_vm._v(" "),_c('ul',{staticClass:"hint-msg"},[_c('li',[_vm._v("1. 如防止页面在刷新之后vuex数据状态不能保持，有了缓存模块，我们就可以从缓存中恢复state中的值；")]),_vm._v(" "),_c('li',[_vm._v("2. 时间有限，以下示例只写了针对`cacheXXXLocalStorage`的个别常用方法，针对Session Storage也具有相同的方法，这里就不再写了，每个对应的接口定义都是一样的，如果你在使用中遇到问题，欢迎拍砖。")])])])],1),_vm._v(" "),_c('group',{attrs:{"title":"使用$vp#cacheSaveToLocalStore将数据存储到中：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheSaveToLocalStore() {\n  this.$vp.cacheSaveToLocalStore('user', {name: 'admin'}, {\n    exp: 5\n  })\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheSaveToLocalStore($event)}}},[_vm._v("运行")])],1)],1),_vm._v(" "),_c('group',{attrs:{"title":"使用$vp#cacheLoadFromLocalStore获取缓存数据：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheLoadFromLocalStore() {\n  const data = this.$vp.cacheLoadFromLocalStore('user', { name: 'tourist' })\n  this.$vp.dialog(data, {\n    showCode: true\n  })\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheLoadFromLocalStore($event)}}},[_vm._v("运行")])],1)],1),_vm._v(" "),_c('group',{attrs:{"title":"使用$vp#cacheModifyExpFromLocalStore更新对应缓存的`exp`超时时间：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheModifyExpFromLocalStore() {\n  this.$vp.cacheSaveToLocalStore(\n    'test',\n    'exp',\n    {\n      exp: 30\n    }\n  )\n  setTimeout(() => {\n    this.$vp.cacheModifyExpFromLocalStore('test', 1)\n    setTimeout(() => {\n      const data = this.$vp.cacheLoadFromLocalStore('test', '数据已经被更新之后，过期了')\n      this.$vp.dialog(data)\n    }, 3000)\n  }, 3000)\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheModifyExpFromLocalStore($event)}}},[_vm._v("运行")])],1)],1),_vm._v(" "),_c('group',{attrs:{"title":"使用$vp#cacheModifyExpFromLocalStore更新对应缓存的`exp`超时时间：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheSaveToLocalStore() {\n  this.$vp.cacheModifyExpFromLocalStore('user', 30)\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheModifyExpFromLocalStore($event)}}},[_vm._v("运行")])],1)],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"使用$vp#cacheDeleteToLocalStore根据key删除缓存中的值。：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoCacheDeleteToLocalStore() {\n  this.$vp.cacheSaveToLocalStore(\n    'test-del',\n    'delete'\n  )\n  this.$vp.uiToast(`缓存的值: ${this.$vp.cacheLoadFromLocalStore('test-del')}`)\n  setTimeout(() => {\n    this.$vp.cacheDeleteToLocalStore('test-del')\n    const data = this.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了')\n    this.$vp.dialog(data, {\n      showCode: true\n    })\n  }, 1000)\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doCacheDeleteToLocalStore($event)}}},[_vm._v("运行")])],1)],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/UtilCache.vue
function injectStyle (context) {
  __webpack_require__("2ZNZ")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b8b4f922"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_UtilCache,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_UtilCache = __webpack_exports__["default"] = (Component.exports);


/***/ })

});