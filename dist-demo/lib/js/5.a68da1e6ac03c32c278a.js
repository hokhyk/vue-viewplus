webpackJsonp([5],{

/***/ "2+oE":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".vue-version[data-v-3163be6c]{text-align:center;font-size:12px;color:#ccc}.center[data-v-3163be6c]{margin-top:15px;text-align:center}.vux-notice[data-v-3163be6c]{color:#666;line-height:40px}.iconfont[data-v-3163be6c]{margin-right:15px;line-height:24px;font-size:18px}.weui-cell[data-v-3163be6c]{font-size:14px}", "", {"version":3,"sources":["/Users/jiiiiiin/Documents/Atom/vue-viewplus/examples/components/Info.vue"],"names":[],"mappings":"AACA,8BACE,kBAAmB,AACnB,eAAgB,AAChB,UAAY,CACb,AACD,yBACE,gBAAiB,AACjB,iBAAmB,CACpB,AACD,6BACE,WAAY,AACZ,gBAAkB,CACnB,AACD,2BACE,kBAAmB,AACnB,iBAAkB,AAClB,cAAgB,CACjB,AACD,4BACE,cAAgB,CACjB","file":"Info.vue","sourcesContent":["\n.vue-version[data-v-3163be6c] {\n  text-align: center;\n  font-size: 12px;\n  color: #ccc;\n}\n.center[data-v-3163be6c] {\n  margin-top: 15px;\n  text-align: center;\n}\n.vux-notice[data-v-3163be6c] {\n  color: #666;\n  line-height: 40px;\n}\n.iconfont[data-v-3163be6c] {\n  margin-right: 15px;\n  line-height: 24px;\n  font-size: 18px;\n}\n.weui-cell[data-v-3163be6c] {\n  font-size: 14px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "7YgM":
/***/ (function(module, exports) {

module.exports = {"name":"vue-viewplus","version":"0.9.1","description":"一个简化Vue应用开发的工具库","author":"z.jiiiiiin <“jiiiiiin@yeah.net”>","license":"MIT","private":false,"main":"dist/vue-viewplus.js","module":"src/main.js","repository":{"type":"git","url":"https://github.com/Jiiiiiin/vue-viewplus"},"files":["dist","src"],"scripts":{"dev":"node build/dev-server.js","start":"npm run dev","mock":"node mock/server.js","test":"jest","test-w":"jest --watchAll --notify","prebuild":"eslint src examples && rm -rf ./dist/* && npm run test","build":"node build/build.js","build-demo":"node build/build-examples.js","prepublish":"npm run lint && npm run test && npm run build","lint":"eslint --ext .js,.vue src examples","fix":"eslint --fix .js,.vue src examples","docsify-init":"docsify init ./docs","docsify-serve":"docsify serve ./docs"},"pre-commit":["lint && test"],"dependencies":{"axios":"^0.18.0","lodash":"^4.17.11","qs":"^6.5.2","vue-navigation":"^1.1.4","web-storage-cache":"^1.0.3"},"peerDependencies":{},"devDependencies":{"autoprefixer":"^8.1.0","babel-core":"^6.26.3","babel-eslint":"^8.2.2","babel-jest":"^22.4.1","babel-loader":"^7.1.5","babel-plugin-component":"^1.1.1","babel-plugin-lodash":"^3.3.4","babel-plugin-transform-function-bind":"^6.22.0","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-runtime":"^6.22.0","babel-polyfill":"^6.26.0","babel-preset-env":"^1.7.0","babel-preset-stage-2":"^6.22.0","babel-register":"^6.22.0","babel-runtime":"^6.26.0","better-scroll":"^1.13.2","chalk":"^2.3.2","clean-webpack-plugin":"^0.1.19","connect-history-api-fallback":"^1.3.0","copy-webpack-plugin":"^4.5.4","css-loader":"^0.28.11","docsify":"^4.8.1","eslint":"^4.19.0","eslint-config-standard":"^11.0.0","eslint-friendly-formatter":"^3.0.0","eslint-loader":"^2.0.0","eslint-plugin-html":"^4.0.6","eslint-plugin-import":"^2.9.0","eslint-plugin-node":"^6.0.1","eslint-plugin-promise":"^3.7.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"^0.9.6","express":"^4.16.4","extract-text-webpack-plugin":"^3.0.0","fastclick":"^1.0.6","file-loader":"^1.1.11","friendly-errors-webpack-plugin":"^1.6.1","html-webpack-plugin":"^3.0.6","http-proxy-middleware":"^0.18.0","jest":"^22.4.2","jest-localstorage-mock":"^2.2.0","jest-serializer-vue":"^1.0.0","json-server":"^0.12.1","less":"^3.8.1","less-loader":"^4.1.0","lodash-webpack-plugin":"^0.11.5","opn":"^5.4.0","optimize-css-assets-webpack-plugin":"^3.2.0","ora":"^2.0.0","portfinder":"^1.0.19","rimraf":"^2.6.0","semver":"^5.5.0","shelljs":"^0.8.1","uglifyjs-webpack-plugin":"^1.2.4","url-loader":"^1.0.1","vue":"^2.5.17","vue-highlightjs":"^1.3.3","vue-jest":"^2.1.1","vue-loader":"^14.2.1","vue-router":"^3.0.1","vue-style-loader":"^4.1.2","vue-svg-icon":"^1.2.9","vue-template-compiler":"^2.5.17","vue-test-utils":"^1.0.0-beta.6","vue-top-progress":"^0.7.0","vuex":"^3.0.1","vuex-router-sync":"^5.0.0","vux":"^2.9.2","vux-loader":"^1.2.9","webpack":"^3.12.0","webpack-bundle-analyzer":"^2.11.1","webpack-dev-middleware":"^2.0.6","webpack-hot-middleware":"^2.21.2","webpack-merge":"^4.1.4"},"jest":{"globals":{"NODE_ENV":"test"},"moduleFileExtensions":["js","vue"],"moduleNameMapper":{"^@/(.*)$":"<rootDir>/examples/$1","^vux$":"<rootDir>/test/vux.mock.js"},"transform":{"^.+\\.js$":"<rootDir>/node_modules/babel-jest",".*\\.(vue)$":"<rootDir>/node_modules/vue-jest"},"snapshotSerializers":["<rootDir>/node_modules/jest-serializer-vue"],"setupFiles":["jest-localstorage-mock"]},"engines":{"node":">= 4.0.0","npm":">= 3.0.0"},"browserslist":["iOS >= 7","Android >= 4.1"]}

/***/ }),

/***/ "HPb9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vux/src/components/cell/index.vue + 5 modules
var cell = __webpack_require__("1DHf");

// EXTERNAL MODULE: ./node_modules/vux/src/components/group/index.vue + 3 modules
var group = __webpack_require__("rHil");

// EXTERNAL MODULE: ./node_modules/vux/src/components/badge/index.vue + 3 modules
var badge = __webpack_require__("D8a4");

// EXTERNAL MODULE: ./node_modules/vux/src/components/divider/index.vue + 3 modules
var divider = __webpack_require__("rGqP");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Info.vue






var pkg = __webpack_require__("7YgM");
var version = pkg.version;
var vueVersion = pkg.devDependencies.vue;

/* harmony default export */ var Info = ({
  components: {
    Cell: cell["a" /* default */],
    Group: group["a" /* default */],
    Badge: badge["a" /* default */],
    Divider: divider["a" /* default */]
  },
  data: function data() {
    return {
      version: version,
      vueVersion: vueVersion
    };
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Info.vue






var Info_pkg = __webpack_require__("7YgM");
var Info_version = Info_pkg.version;
var Info_vueVersion = Info_pkg.devDependencies.vue;

/* harmony default export */ var components_Info = ({
  components: {
    Cell: cell["a" /* default */],
    Group: group["a" /* default */],
    Badge: badge["a" /* default */],
    Divider: divider["a" /* default */]
  },
  data: function data() {
    return {
      version: Info_version,
      vueVersion: Info_vueVersion
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3163be6c","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Info.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"center"},[_c('icon',{attrs:{"name":"logo","scale":"10"}}),_vm._v(" "),_c('p',{staticClass:"vux-notice"},[_vm._v("v"+_vm._s(_vm.version))])],1),_vm._v(" "),_c('group',[_c('cell',{attrs:{"title":"示例","link":"/Demo"}},[_c('i',{staticClass:"iconfont icon-demoon",attrs:{"slot":"icon"},slot:"icon"})]),_vm._v(" "),_c('cell',{attrs:{"title":"Github","link":"https://gitee.com/zhaojinos/vue-viewplus","value":"去点个赞！"}},[_c('i',{staticClass:"iconfont icon-github",attrs:{"slot":"icon"},slot:"icon"})])],1),_vm._v(" "),_c('br'),_vm._v(" "),_c('p',{staticClass:"vue-version"},[_vm._v("current vue version: "+_vm._s(_vm.vueVersion))])],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./examples/components/Info.vue
function injectStyle (context) {
  __webpack_require__("UTKC")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3163be6c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  components_Info,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var examples_components_Info = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "UTKC":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2+oE");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("604dfc36", content, true, {});

/***/ }),

/***/ "ebGo":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".vux-divider{display:table;white-space:nowrap;height:auto;overflow:hidden;line-height:1;text-align:center;padding:10px 0;color:#666}.vux-divider:after,.vux-divider:before{content:\"\";display:table-cell;position:relative;top:50%;width:50%;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC)}.vux-divider:before{background-position:right 1em top 50%}.vux-divider:after{background-position:left 1em top 50%}", "", {"version":3,"sources":["/Users/jiiiiiin/Documents/Atom/vue-viewplus/node_modules/vux/src/components/divider/index.vue"],"names":[],"mappings":"AACA,aACE,cAAe,AACf,mBAAoB,AACpB,YAAa,AACb,gBAAiB,AACjB,cAAe,AACf,kBAAmB,AACnB,eAAgB,AAChB,UAAY,CACb,AACD,uCACE,WAAY,AACZ,mBAAoB,AACpB,kBAAmB,AACnB,QAAS,AACT,UAAW,AACX,4BAA6B,AAC7B,4yCAA6yC,CAC9yC,AACD,oBACE,qCAAsC,CACvC,AACD,mBACE,oCAAqC,CACtC","file":"index.vue","sourcesContent":["\n.vux-divider {\n  display: table;\n  white-space: nowrap;\n  height: auto;\n  overflow: hidden;\n  line-height: 1;\n  text-align: center;\n  padding: 10px 0;\n  color: #666;\n}\n.vux-divider:after,.vux-divider:before {\n  content: '';\n  display: table-cell;\n  position: relative;\n  top: 50%;\n  width: 50%;\n  background-repeat: no-repeat;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC)\n}\n.vux-divider:before {\n  background-position: right 1em top 50%\n}\n.vux-divider:after {\n  background-position: left 1em top 50%\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "gmZy":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ebGo");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("fef9a386", content, true, {});

/***/ }),

/***/ "rGqP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/divider/index.vue
//
//
//
//
//
//

/* harmony default export */ var divider = ({
  name: 'divider'
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/divider/index.vue
//
//
//
//
//
//

/* harmony default export */ var components_divider = ({
  name: 'divider'
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-65b3ca5e","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vux/src/components/divider/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"vux-divider"},[_vm._t("default")],2)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./node_modules/vux/src/components/divider/index.vue
function injectStyle (context) {
  __webpack_require__("gmZy")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(component_normalizer["a" /* default */])(
  components_divider,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_divider = __webpack_exports__["a"] = (Component.exports);


/***/ })

});