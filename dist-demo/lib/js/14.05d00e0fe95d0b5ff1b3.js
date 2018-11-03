webpackJsonp([14],{

/***/ "1epR":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("dgz1");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("3d8e01e0", content, true, {});

/***/ }),

/***/ "dgz1":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"mixin.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "iCdK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/lodash/isFunction.js
var isFunction = __webpack_require__("gGqR");
var isFunction_default = /*#__PURE__*/__webpack_require__.n(isFunction);

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// EXTERNAL MODULE: ./src/main.js + 8 modules
var main = __webpack_require__("NHnr");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("/5sW");

// EXTERNAL MODULE: ./node_modules/vux/src/plugins/toast/index.js
var plugins_toast = __webpack_require__("3BeM");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/mixin.vue








/* harmony default export */ var mixin = ({
  mixins: [demo_mixin["a" /* default */]],
  methods: {
    doMixin: function doMixin() {
      try {
        main["a" /* default */].mixin(vue_runtime_esm["a" /* default */], {
          install: function install(Vue, options) {
            Vue.use(plugins_toast["a" /* default */]);
            console.log('\u6DF7\u5408\u7684\u63D2\u4EF6\u7248\u672C ' + options.version, options);
          },
          toast: function toast() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '默认消息！';

            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$position = _ref.position,
                position = _ref$position === undefined ? 'bottom' : _ref$position,
                _ref$time = _ref.time,
                time = _ref$time === undefined ? 2000 : _ref$time,
                _ref$width = _ref.width,
                width = _ref$width === undefined ? '7.6em' : _ref$width,
                _ref$type = _ref.type,
                type = _ref$type === undefined ? 'text' : _ref$type;

            vue_runtime_esm["a" /* default */].$vux.toast.show({
              text: msg,
              time: time,
              position: position,
              width: width,
              type: type
            });
            return this;
          },
          installed: function installed() {
            console.log('sayHi\u65B9\u6CD5\u662F\u5426\u88AB\u6DF7\u5408\u6210\u529F\uFF1A' + isFunction_default()(vue_runtime_esm["a" /* default */].prototype.$vp.toast), vue_runtime_esm["a" /* default */].prototype.$vp);
            vue_runtime_esm["a" /* default */].prototype.$vp.toast('hi 自定义混合完成');
          }
        }, {
          moduleName: '示例模块',
          version: '1.0'
        });
      } catch (e) {
        this.$vp.dialog('\u81EA\u5B9A\u4E49\u6DF7\u5408\u51FA\u9519 ' + e.message);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/mixin.vue








/* harmony default export */ var Demo_mixin = ({
  mixins: [demo_mixin["a" /* default */]],
  methods: {
    doMixin: function doMixin() {
      try {
        main["a" /* default */].mixin(vue_runtime_esm["a" /* default */], {
          install: function install(Vue, options) {
            Vue.use(plugins_toast["a" /* default */]);
            console.log('\u6DF7\u5408\u7684\u63D2\u4EF6\u7248\u672C ' + options.version, options);
          },
          toast: function toast() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '默认消息！';

            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$position = _ref.position,
                position = _ref$position === undefined ? 'bottom' : _ref$position,
                _ref$time = _ref.time,
                time = _ref$time === undefined ? 2000 : _ref$time,
                _ref$width = _ref.width,
                width = _ref$width === undefined ? '7.6em' : _ref$width,
                _ref$type = _ref.type,
                type = _ref$type === undefined ? 'text' : _ref$type;

            vue_runtime_esm["a" /* default */].$vux.toast.show({
              text: msg,
              time: time,
              position: position,
              width: width,
              type: type
            });
            return this;
          },
          installed: function installed() {
            console.log('sayHi\u65B9\u6CD5\u662F\u5426\u88AB\u6DF7\u5408\u6210\u529F\uFF1A' + isFunction_default()(vue_runtime_esm["a" /* default */].prototype.$vp.toast), vue_runtime_esm["a" /* default */].prototype.$vp);
            vue_runtime_esm["a" /* default */].prototype.$vp.toast('hi 自定义混合完成');
          }
        }, {
          moduleName: '示例模块',
          version: '1.0'
        });
      } catch (e) {
        this.$vp.dialog('\u81EA\u5B9A\u4E49\u6DF7\u5408\u51FA\u9519 ' + e.message);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1609d798","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/mixin.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"Mixin"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_vm._v("添加自定义模块 ：）")]),_vm._v(" "),_c('span',{staticClass:"hint-msg"},[_vm._v("当前库有一个终止就是“统一开发人员的编码风格”，当然这里做的很简单，就是把所有模块的方法都定义到Vue.prototype.$vp下面。")])])],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"演示为$vp混合一个自定义Toast模块","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoMixin() {\n  try {\n    ViewPlus.mixin(Vue, {\n      install(Vue, options) {\n        Vue.use(ToastPlugin)\n        console.log(`混合的插件版本 ${options.version}`, options)\n      },\n      toast(msg = '默认消息！', {position = 'bottom', time = 2000, width = '7.6em', type = 'text'} = {}) {\n        Vue.$vux.toast.show({\n          text: msg,\n          time,\n          position,\n          width,\n          type\n        })\n        return this\n      },\n      installed() {\n        console.log(`sayHi方法是否被混合成功：${_.isFunction(Vue.prototype.$vp.toast)}`, Vue.prototype.$vp)\n        Vue.prototype.$vp.toast('hi 自定义混合完成')\n      }\n    }, {\n      moduleName: '示例模块',\n      version: '1.0'\n    })\n  } catch (e) {\n    this.$vp.dialog(`自定义混合出错 ${e.message}`)\n  }\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doMixin($event)}}},[_vm._v("运行")])],1)],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/mixin.vue
function injectStyle (context) {
  __webpack_require__("1epR")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1609d798"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_mixin,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_mixin = __webpack_exports__["default"] = (Component.exports);


/***/ })

});