webpackJsonp([9],{

/***/ "7Brt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/JsBridgeContext.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var JsBridgeContext = ({
  mixins: [demo_mixin["a" /* default */]],
  methods: {
    doFireEvent: function doFireEvent() {
      var _this = this;

      try {
        this.$vp.fireEvent({
          event: 'UIEvent',
          action: 'toast',
          params: {
            msg: 'hello vplus'
          }
        }).then(function (res) {
          _this.$vp.dialog(res, {
            title: '桥接调用成功',
            showCode: true
          });
        }).catch(function (err) {
          _this.$vp.dialog('\u6865\u63A5\u8C03\u7528\u5931\u8D25 ' + err.message);
        });
      } catch (e) {
        this.$vp.dialog('\u6865\u63A5\u8C03\u7528\u5931\u8D25 ' + e.message);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/JsBridgeContext.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Demo_JsBridgeContext = ({
  mixins: [demo_mixin["a" /* default */]],
  methods: {
    doFireEvent: function doFireEvent() {
      var _this = this;

      try {
        this.$vp.fireEvent({
          event: 'UIEvent',
          action: 'toast',
          params: {
            msg: 'hello vplus'
          }
        }).then(function (res) {
          _this.$vp.dialog(res, {
            title: '桥接调用成功',
            showCode: true
          });
        }).catch(function (err) {
          _this.$vp.dialog('\u6865\u63A5\u8C03\u7528\u5931\u8D25 ' + err.message);
        });
      } catch (e) {
        this.$vp.dialog('\u6865\u63A5\u8C03\u7528\u5931\u8D25 ' + e.message);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ba878f22","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/JsBridgeContext.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"JsBridgeContext"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/js-bridge-context"}},[_vm._v("js-bridge-context.js JSBridge桥接模块。")])]),_vm._v(" "),_c('span',{staticClass:"hint-title"},[_vm._v("注意：")]),_vm._v(" "),_c('ul',{staticClass:"hint-msg"},[_c('li',[_vm._v("1. 这个页面的交互依赖于客户端提供的`JsBridge Context`能力，详细请参考文档，如果没有提供这组能力，运行将会报错!")])])])],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"使用$vp#fireEvent请求客户端弹出一个toast：","label-width":"15em"}},[_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoFireEvent() {\n  this.$vp.fireEvent({\n    event: 'UIEvent',\n    action: 'toast',\n    params: {\n      msg: 'hello vplus'\n    }\n  }).then(res => {\n    this.$vp.dialog(res, {\n      title: '桥接调用成功',\n      showCode: true\n    })\n  }).catch(err => {\n    this.$vp.dialog(`桥接调用失败 ${err.message}`)\n  })\n}\n      ")])])]),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{staticClass:"fl-right",attrs:{"mini":"","plain":""},nativeOn:{"click":function($event){return _vm.doFireEvent($event)}}},[_vm._v("运行")])],1)],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/JsBridgeContext.vue
function injectStyle (context) {
  __webpack_require__("h/bl")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ba878f22"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_JsBridgeContext,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_JsBridgeContext = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "f7//":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"JsBridgeContext.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "h/bl":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f7//");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("9de6fc78", content, true, {});

/***/ })

});