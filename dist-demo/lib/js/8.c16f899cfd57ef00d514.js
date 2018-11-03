webpackJsonp([8],{

/***/ "2247":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "OdZO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__("2247");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/UtilHttp.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var UtilHttp = ({
  mixins: [demo_mixin["a" /* default */]],
  data: function data() {
    return {
      ajaxAllBtnState: false,
      doGetBtnState: false,
      doPostBtnState: false,
      doCORSBtnState: false,
      doHttpNativeBtnState: false
    };
  },

  methods: {
    doGet: function doGet() {
      var _this = this;

      this.doGetBtnState = true;
      this.$vp.ajaxMixin('TIMESTAMP', {
        // .ajaxMixin('https://www.easy-mock.com/mock/5abc903ff5c35b191f472d79/example/TIMESTAMP', {
        mode: 'GET'
      }).then(function (data) {
        _this.doGetBtnState = false;
        _this.$vp.dialog(data, {
          title: '请求成功，响应结果',
          showCode: true
        });
      }).catch(function (resp) {
        console.log(resp);
        _this.doGetBtnState = false;
      });
    },
    doPost: function doPost() {
      var _this2 = this;

      this.doPostBtnState = true;
      this.$vp.ajaxMixin('LOGIN').then(function (data) {
        _this2.doPostBtnState = false;
        _this2.$vp.dialog(data, {
          title: '请求成功，响应结果',
          showCode: true
        });
      }).catch(function (resp) {
        _this2.doPostBtnState = false;
      });
    },
    doAjaxAll: function doAjaxAll() {
      var _this3 = this;

      this.ajaxAllBtnState = true;
      this.$vp.ajaxAll([{
        url: 'ALL1',
        mode: 'GET'
      }, {
        url: 'ALL2',
        mode: 'GET'
      }]).then(function (resArr) {
        _this3.ajaxAllBtnState = false;
        // 这里需要应用手动把axios的data属性解析掉
        var res = map_default()(resArr, function (item) {
          return item.data;
        });
        _this3.$vp.dialog(res, {
          title: '请求成功，响应结果',
          showCode: true
        });
      });
    },
    doHttpNative: function doHttpNative() {
      var _this4 = this;

      this.doHttpNativeBtnState = true;
      this.$vp.ajaxMixin('TIMESTAMP', { mode: 'NATIVE' }).then(function (res) {
        _this4.$vp.dialog(res, {
          title: '请求成功，响应结果',
          showCode: true
        });
        _this4.doHttpNativeBtnState = false;
      }).catch(function (err) {
        _this4.$vp.dialog(err, {
          title: '请求失败，响应结果',
          showCode: true
        });
        _this4.doHttpNativeBtnState = false;
      });
    },
    doCORS: function doCORS() {
      var _this5 = this;

      this.doCORSBtnState = true;
      this.$vp.ajaxMixin('TIMESTAMP', { mode: 'GET' }).then(function (res) {
        _this5.$vp.dialog(res, {
          title: '请求成功，响应结果',
          showCode: true
        });
        _this5.doCORSBtnState = false;
      }).catch(function () {
        _this5.doCORSBtnState = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/UtilHttp.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Demo_UtilHttp = ({
  mixins: [demo_mixin["a" /* default */]],
  data: function data() {
    return {
      ajaxAllBtnState: false,
      doGetBtnState: false,
      doPostBtnState: false,
      doCORSBtnState: false,
      doHttpNativeBtnState: false
    };
  },

  methods: {
    doGet: function doGet() {
      var _this = this;

      this.doGetBtnState = true;
      this.$vp.ajaxMixin('TIMESTAMP', {
        // .ajaxMixin('https://www.easy-mock.com/mock/5abc903ff5c35b191f472d79/example/TIMESTAMP', {
        mode: 'GET'
      }).then(function (data) {
        _this.doGetBtnState = false;
        _this.$vp.dialog(data, {
          title: '请求成功，响应结果',
          showCode: true
        });
      }).catch(function (resp) {
        console.log(resp);
        _this.doGetBtnState = false;
      });
    },
    doPost: function doPost() {
      var _this2 = this;

      this.doPostBtnState = true;
      this.$vp.ajaxMixin('LOGIN').then(function (data) {
        _this2.doPostBtnState = false;
        _this2.$vp.dialog(data, {
          title: '请求成功，响应结果',
          showCode: true
        });
      }).catch(function (resp) {
        _this2.doPostBtnState = false;
      });
    },
    doAjaxAll: function doAjaxAll() {
      var _this3 = this;

      this.ajaxAllBtnState = true;
      this.$vp.ajaxAll([{
        url: 'ALL1',
        mode: 'GET'
      }, {
        url: 'ALL2',
        mode: 'GET'
      }]).then(function (resArr) {
        _this3.ajaxAllBtnState = false;
        // 这里需要应用手动把axios的data属性解析掉
        var res = map_default()(resArr, function (item) {
          return item.data;
        });
        _this3.$vp.dialog(res, {
          title: '请求成功，响应结果',
          showCode: true
        });
      });
    },
    doHttpNative: function doHttpNative() {
      var _this4 = this;

      this.doHttpNativeBtnState = true;
      this.$vp.ajaxMixin('TIMESTAMP', { mode: 'NATIVE' }).then(function (res) {
        _this4.$vp.dialog(res, {
          title: '请求成功，响应结果',
          showCode: true
        });
        _this4.doHttpNativeBtnState = false;
      }).catch(function (err) {
        _this4.$vp.dialog(err, {
          title: '请求失败，响应结果',
          showCode: true
        });
        _this4.doHttpNativeBtnState = false;
      });
    },
    doCORS: function doCORS() {
      var _this5 = this;

      this.doCORSBtnState = true;
      this.$vp.ajaxMixin('TIMESTAMP', { mode: 'GET' }).then(function (res) {
        _this5.$vp.dialog(res, {
          title: '请求成功，响应结果',
          showCode: true
        });
        _this5.doCORSBtnState = false;
      }).catch(function () {
        _this5.doCORSBtnState = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7c74f0d6","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/UtilHttp.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"UtilHttp"}},[_c('group',{staticClass:"desc-group"},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"title"},[_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/util-http"}},[_vm._v("util-http.js 针对axios进行了二次封装的ajax模块。")])]),_vm._v(" "),_c('span',{staticClass:"hint-title"},[_vm._v("注意：")]),_vm._v(" "),_c('ul',{staticClass:"hint-msg"},[_c('li',[_vm._v("1. 在进行一下测试前请先阅读"),_c('a',[_vm._v("示例项目对util-http.js模块的配置")])]),_vm._v(" "),_c('li',[_vm._v("2. 保证启动了"),_c('a',{attrs:{"href":"http://jiiiiiin.cn/vue-viewplus/#/README?id=%E4%BE%8B%E5%AD%90"}},[_vm._v("mock server")])]),_vm._v(" "),_c('li',[_vm._v("3. 约定服务器端响应的数据结构（测试）\n            "),_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"json"},[_vm._v("{\n  \"code\": [1| \"其他字符串，如：session_timeout_err\"],\n  \"data\": [{}|[]],\n  \"message\": \"错误提示信息|正确提示信息\"\n}")])])])])])],1),_vm._v(" "),_c('group',{attrs:{"title":"ajaxMixin - GET请求","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{attrs:{"disabled":_vm.doGetBtnState},nativeOn:{"click":function($event){return _vm.doGet($event)}}},[_vm._v("使用$vp#ajaxMixin发送GET请求")])],1),_vm._v(" "),_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoGet() {\n  this.doGetBtnState = true\n  this.$vp\n    .ajaxMixin('TIMESTAMP', {\n      mode: 'GET'\n    })\n    .then(data => {\n      this.doGetBtnState = false\n      this.$vp.dialog(\n        data,\n        {\n          title: '请求成功，响应结果',\n          showCode: true\n        }\n      )\n    })\n    .catch(resp => {\n      console.log(resp)\n      this.doGetBtnState = false\n    })\n}\n      ")])])])],1),_vm._v(" "),_c('group',{attrs:{"title":"ajaxMixin - POST请求","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('x-button',{attrs:{"disabled":_vm.doPostBtnState},nativeOn:{"click":function($event){return _vm.doPost($event)}}},[_vm._v("使用$vp#ajaxMixin发送POST请求")])],1),_vm._v(" "),_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoPost() {\n  this.doPostBtnState = true\n  this.$vp\n    .ajaxMixin('LOGIN')\n    .then(data => {\n      this.doPostBtnState = false\n      this.$vp.dialog(\n        data,\n        {\n          title: '请求成功，响应结果',\n          showCode: true\n        }\n      )\n    })\n    .catch(resp => {\n      this.doPostBtnState = false\n    })\n}\n      ")])])])],1),_vm._v(" "),_c('group',{attrs:{"title":"ajaxAll请求","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('p',{staticClass:"hint-msg"},[_vm._v("针对这个方法插件没有帮应用进行业务成功与否的判断，但是应用可以调用`$vp#$vp.onParseServerResp(response)`来调用统一业务级别错误接口来根据自己的需求对判断进行后续处理")]),_vm._v(" "),_c('x-button',{attrs:{"disabled":_vm.ajaxAllBtnState},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.doAjaxAll($event)}}},[_vm._v("使用$vp#ajaxAll发送请求")])],1),_vm._v(" "),_c('cell-box',{staticClass:"code-box"},[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoAjaxAll() {\n  this.ajaxAllBtnState = true\n  this.$vp\n    .ajaxAll([\n      {\n        url: 'ALL1',\n        mode: 'GET'\n      }, {\n        url: 'ALL2',\n        mode: 'GET'\n      }\n    ])\n    .then(resArr => {\n      this.ajaxAllBtnState = false\n      // 这里需要应用手动把axios的data属性解析掉\n      const res = _.map(resArr, (item) => {\n        return item.data\n      })\n      this.$vp.dialog(res, {\n        title: '请求成功，响应结果',\n        showCode: true\n      })\n    })\n}\n      ")])])])],1),_vm._v(" "),_c('group',{attrs:{"title":"ajaxMixin - NATIVE请求","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px"}},[_c('span',{staticClass:"hint-msg"},[_vm._v("JSBridge交互，我们已经有了一套"),_c('a',{attrs:{"href":"https://github.com/Jiiiiiin/android-viewplus"}},[_c('strong',[_vm._v("android-viewplus")])]),_vm._v("一个安卓混合客户端开发库，如果需要进行Hybrid开发进查看")]),_vm._v(" "),_c('span',{staticClass:"hint-msg-warn"},[_vm._v("该功能需要客户端JsBridge能力，如没有修改，请别点了 ；）")]),_c('br'),_vm._v(" "),_c('x-button',{attrs:{"disabled":_vm.doHttpNativeBtnState},nativeOn:{"click":function($event){return _vm.doHttpNative($event)}}},[_vm._v("原生请求测试")])],1),_vm._v(" "),_c('cell-box',[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\ndoHttpNative() {\n  this.doHttpNativeBtnState = true\n  this.$vp\n    .ajaxMixin('TIMESTAMP', { mode: 'NATIVE' })\n    .then(res => {\n      this.$vp.dialog(res, {\n        title: '请求成功，响应结果',\n        showCode: true\n      })\n      this.doHttpNativeBtnState = false\n    })\n    .catch((err) => {\n      this.$vp.dialog(err, {\n        title: '请求失败，响应结果',\n        showCode: true\n      })\n      this.doHttpNativeBtnState = false\n    })\n}\n      ")])])])],1),_vm._v(" "),_c('group',{staticClass:"bottom-group",attrs:{"title":"CORS test","label-width":"15em"}},[_c('box',{attrs:{"gap":"10px 10px 25px 10px"}},[_c('span',{staticClass:"hint-msg-warn"},[_vm._v("该功能需要后台配合测试，如没有修改，请别点了 ；）")]),_vm._v(" "),_c('x-button',{attrs:{"disabled":_vm.doCORSBtnState},nativeOn:{"click":function($event){return _vm.doCORS($event)}}},[_vm._v("CORS测试")])],1),_vm._v(" "),_c('cell-box',[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\n// 这里的关键是配置`httpUtil#withCredentials`\ndoCORS() {\n  this.doCORSBtnState = true\n  this.$vp\n    .ajaxMixin('TIMESTAMP', { mode: 'GET' })\n    .then(res => {\n      this.$vp.dialog(res, {\n        title: '请求成功，响应结果',\n        showCode: true\n      })\n      this.doCORSBtnState = false\n    })\n    .catch(() => {\n      this.doCORSBtnState = false\n    })\n}\n      ")])])])],1)],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Demo/UtilHttp.vue
function injectStyle (context) {
  __webpack_require__("akw1")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7c74f0d6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  Demo_UtilHttp,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_Demo_UtilHttp = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "YDOV":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"UtilHttp.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "akw1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("YDOV");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("410230b8", content, true, {});

/***/ })

});