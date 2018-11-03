webpackJsonp([2],{

/***/ "2LX0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = __webpack_require__("fcJk");

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__("LLCR");

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = __webpack_require__("CFqi");

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = __webpack_require__("cddD");

var _isFQDN2 = _interopRequireDefault(_isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];

/***/ }),

/***/ "8eXq":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".vux-flexbox{width:100%;text-align:left;display:-webkit-box;display:flex;display:-webkit-flex;box-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.vux-flexbox .vux-flexbox-item{-webkit-box-flex:1;flex:1;-webkit-flex:1;min-width:20px;width:0}.vux-flexbox .vux-flexbox-item:first-child{margin-left:0!important;margin-top:0!important}.vux-flex-row{box-direction:row;box-orient:horizontal;-webkit-box-orient:horizontal;-webkit-flex-direction:row;flex-direction:row}.vux-flex-col,.vux-flex-row{-webkit-box-direction:normal}.vux-flex-col{box-orient:vertical;-webkit-box-orient:vertical;-webkit-flex-direction:column;flex-direction:column}.vux-flex-col>.vux-flexbox-item{width:100%}", "", {"version":3,"sources":["/Users/jiiiiiin/Documents/Atom/vue-viewplus/node_modules/vux/src/components/flexbox/flexbox.vue"],"names":[],"mappings":"AACA,aACE,WAAY,AACZ,gBAAiB,AACjB,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AACtB,iBAAkB,AAClB,yBAA0B,AAC1B,2BAA4B,AACpB,kBAAoB,CAC7B,AACD,+BACE,mBAAoB,AACZ,OAAQ,AAChB,eAAgB,AAChB,eAAgB,AAChB,OAAU,CACX,AACD,2CACE,wBAAyB,AACzB,sBAAwB,CACzB,AACD,cACE,kBAAmB,AACnB,sBAAuB,AACvB,8BAA+B,AAE/B,2BAA4B,AACpB,kBAAoB,CAC7B,AACD,4BAJE,4BAA8B,CAU/B,AAND,cACE,oBAAqB,AACrB,4BAA6B,AAE7B,8BAA+B,AACvB,qBAAuB,CAChC,AACD,gCACE,UAAY,CACb","file":"flexbox.vue","sourcesContent":["\n.vux-flexbox {\n  width: 100%;\n  text-align: left;\n  display: -webkit-box;\n  display: flex;\n  display: -webkit-flex;\n  box-align: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.vux-flexbox .vux-flexbox-item {\n  -webkit-box-flex: 1;\n          flex: 1;\n  -webkit-flex: 1;\n  min-width: 20px;\n  width: 0%;\n}\n.vux-flexbox .vux-flexbox-item:first-child {\n  margin-left: 0!important;\n  margin-top: 0!important;\n}\n.vux-flex-row {\n  box-direction: row;\n  box-orient: horizontal;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.vux-flex-col {\n  box-orient: vertical;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n.vux-flex-col > .vux-flexbox-item {\n  width: 100%;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "CFqi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;

var _assertString = __webpack_require__("fcJk");

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];

/***/ }),

/***/ "Cdx3":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("sB3e");
var $keys = __webpack_require__("lktj");

__webpack_require__("uqUo")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "Ewe+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobilePhone;

var _assertString = __webpack_require__("fcJk");

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var phones = {
  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-EG': /^((\+?20)|0)?1[012]\d{8}$/,
  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
  'el-GR': /^(\+?30|0)?(69\d{8})$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-HK': /^(\+?852\-?)?[456789]\d{3}\-?\d{4}$/,
  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
  'en-KE': /^(\+?254|0)?[7]\d{8}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)2\d{7,9}$/,
  'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-SG': /^(\+65)?[89]\d{7}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
  'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}/,
  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
  'id-ID': /^(\+?62|0[1-9])[\s|\d]+$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'ja-JP': /^(\+?81|0)[789]0[ \-]?[1-9]\d{2}[ \-]?\d{5}$/,
  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'nl-BE': /^(\+?32|0)4?\d{8}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'th-TH': /^(\+66|66|0)\d{9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'uk-UA': /^(\+?38|8)?0\d{9}$/,
  'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
  'zh-CN': /^(\+?0?86\-?)?1[3456789]\d{9}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
};
/* eslint-enable max-len */

// aliases
phones['en-CA'] = phones['en-US'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];

function isMobilePhone(str, locale, options) {
  (0, _assertString2.default)(str);
  if (options && options.strictMode && !str.startsWith('+')) {
    return false;
  }
  if (locale in phones) {
    return phones[locale].test(str);
  } else if (locale === 'any') {
    for (var key in phones) {
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];
        if (phone.test(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error('Invalid locale \'' + locale + '\'');
}
module.exports = exports['default'];

/***/ }),

/***/ "LLCR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];

/***/ }),

/***/ "VmBU":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("tJgO");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("a18c80d6", content, true, {});

/***/ }),

/***/ "cddD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = __webpack_require__("fcJk");

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = __webpack_require__("LLCR");

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFQDN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];

/***/ }),

/***/ "d6My":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".weui-cell_access{-webkit-tap-highlight-color:rgba(0,0,0,0);color:inherit}.weui-cell_access:active{background-color:#ececec}.weui-cell_access .weui-cell__ft{padding-right:13px;position:relative}.weui-cell_access .weui-cell__ft:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link.weui-cell:first-child:before{display:block}.weui-cell_access.vux-cell-box{padding-right:13px;position:relative}.weui-cell_access.vux-cell-box:after{content:\" \";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:17px}.weui-cells{margin-top:1.17647059em;background-color:#fff;line-height:1.41176471;font-size:17px;overflow:hidden;position:relative}.weui-cells:before{top:0;border-top:1px solid #d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells:after,.weui-cells:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#d9d9d9}.weui-cells:after{bottom:0;border-bottom:1px solid #d9d9d9;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells__title+.weui-cells{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-cell:before{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.weui-cell:first-child:before{display:none}.weui-cell_primary{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.vux-cell-justify{height:1.41176471em}.vux-cell-justify.vux-cell-justify:after{content:\".\";display:inline-block;width:100%;overflow:hidden;height:0}.weui-label{display:block;width:105px;word-wrap:break-word;word-break:break-all}.weui-input{width:100%;border:0;outline:0;-webkit-appearance:none;background-color:transparent;font-size:inherit;color:inherit;height:1.41176471em;line-height:1.41176471}.weui-input::-webkit-inner-spin-button,.weui-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.weui-textarea{display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-cell_warn .weui-textarea-counter{color:#e64340}.weui-toptips{display:none;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:0;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-cells_form .weui-cell__ft{font-size:0}.weui-cells_form .weui-icon-warn{display:none}.weui-cells_form input,.weui-cells_form label[for],.weui-cells_form textarea{-webkit-tap-highlight-color:rgba(0,0,0,0)}.weui-cell_warn{color:#e64340}.weui-cell_warn .weui-icon-warn{display:inline-block}.weui-cell_vcode{padding-top:0;padding-right:0;padding-bottom:0}.weui-vcode-btn,.weui-vcode-img{margin-left:5px;height:44px;vertical-align:middle}.weui-vcode-btn{display:inline-block;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:44px;font-size:17px;color:#3cc51f}button.weui-vcode-btn{background-color:transparent;border-top:0;border-right:0;border-bottom:0;outline:0}.weui-vcode-btn:active{color:#52a341}.vux-x-input .vux-x-input-placeholder-right input::-webkit-input-placeholder{text-align:right}.vux-x-input .vux-x-input-placeholder-center input::-webkit-input-placeholder{text-align:center}.vux-input-icon.weui-icon-success:before,.vux-input-icon.weui-icon-warn:before,.vux-x-input .vux-input-icon{font-size:21px}.vux-x-input .weui-icon{padding-left:5px}.vux-x-input.weui-cell_vcode{padding-top:0;padding-right:0;padding-bottom:0}.vux-x-input.disabled .weui-input{text-fill-color:#888;-webkit-text-fill-color:#888;opacity:1}.vux-x-input-right-full{margin-left:5px;height:44px;vertical-align:middle}.vux-x-input-right-full img{height:44px}.vux-x-input-has-right-full{padding-top:0;padding-right:0;padding-bottom:0}", "", {"version":3,"sources":["/Users/jiiiiiin/Documents/Atom/vue-viewplus/node_modules/vux/src/components/x-input/index.vue"],"names":[],"mappings":"AAgaA,kBACE,0CAA8C,AAC9C,aAAe,CAChB,AACD,yBACE,wBAA0B,CAC3B,AACD,iCACE,mBAAoB,AACpB,iBAAmB,CACpB,AACD,uCACE,YAAa,AACb,qBAAsB,AACtB,WAAY,AACZ,UAAW,AACX,yBAA0B,AAC1B,qBAAsB,AACtB,mBAAoB,AACpB,+CAAyD,AACjD,uCAAiD,AACzD,kBAAmB,AACnB,SAAU,AACV,kBAAmB,AACnB,QAAS,AACT,gBAAiB,AACjB,SAAW,CACZ,AACD,gBACE,cAAe,AACf,cAAgB,CACjB,AACD,6CACE,aAAe,CAChB,AACD,+BACE,mBAAoB,AACpB,iBAAmB,CACpB,AACD,qCACE,YAAa,AACb,qBAAsB,AACtB,WAAY,AACZ,UAAW,AACX,yBAA0B,AAC1B,qBAAsB,AACtB,mBAAoB,AACpB,+CAAyD,AACjD,uCAAiD,AACzD,kBAAmB,AACnB,SAAU,AACV,kBAAmB,AACnB,QAAS,AACT,gBAAiB,AACjB,UAAY,CACb,AACD,YACE,wBAAyB,AACzB,sBAA0B,AAC1B,uBAAwB,AACxB,eAAgB,AAChB,gBAAiB,AACjB,iBAAmB,CACpB,AACD,mBAIE,MAAO,AAGP,6BAA8B,AAE9B,6BAA8B,AACtB,qBAAsB,AAC9B,6BAA+B,AACvB,oBAAuB,CAChC,AACD,qCAbE,YAAa,AACb,kBAAmB,AACnB,OAAQ,AAER,QAAS,AACT,WAAY,AAEZ,aAAe,CAmBhB,AAbD,kBAIE,SAAU,AAGV,gCAAiC,AAEjC,gCAAiC,AACzB,wBAAyB,AACjC,6BAA+B,AACvB,oBAAuB,CAChC,AACD,mBACE,iBAAmB,AACnB,mBAAqB,AACrB,kBAAmB,AACnB,mBAAoB,AACpB,WAAe,AACf,cAAgB,CACjB,AACD,+BACE,YAAc,CACf,AACD,kBACE,gBAAkB,AAClB,WAAe,AACf,kBAAmB,AACnB,mBAAoB,AACpB,cAAgB,CACjB,AACD,WACE,kBAAmB,AACnB,kBAAmB,AACnB,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,yBAA0B,AAC1B,2BAA4B,AACpB,kBAAoB,CAC7B,AACD,kBACE,YAAa,AACb,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,WAAY,AACZ,6BAA8B,AAC9B,cAAe,AACf,6BAA8B,AACtB,qBAAsB,AAC9B,6BAA+B,AACvB,qBAAuB,AAC/B,SAAW,CACZ,AACD,8BACE,YAAc,CACf,AACD,mBACE,wBAAyB,AACzB,+BAAgC,AACxB,sBAAwB,CACjC,AACD,eACE,mBAAoB,AACpB,eAAgB,AACR,MAAQ,CACjB,AACD,eACE,iBAAkB,AAClB,UAAe,CAChB,AACD,kBACE,mBAAqB,CACtB,AACD,yCACE,YAAa,AACb,qBAAsB,AACtB,WAAY,AACZ,gBAAiB,AACjB,QAAU,CACX,AACD,YACE,cAAe,AACf,YAAa,AACb,qBAAsB,AACtB,oBAAsB,CACvB,AACD,YACE,WAAY,AACZ,SAAU,AACV,UAAW,AACX,wBAAyB,AACzB,6BAA8B,AAC9B,kBAAmB,AACnB,cAAe,AACf,oBAAqB,AACrB,sBAAwB,CACzB,AACD,8EAEE,wBAAyB,AACzB,QAAU,CACX,AACD,eACE,cAAe,AACf,SAAU,AACV,YAAa,AACb,WAAY,AACZ,cAAe,AACf,cAAe,AACf,oBAAqB,AACrB,SAAW,CACZ,AACD,uBACE,cAAe,AACf,gBAAkB,CACnB,AACD,uCACE,aAAe,CAChB,AACD,cACE,aAAc,AACd,eAAgB,AAChB,gCAAiC,AACzB,wBAAyB,AACjC,MAAO,AACP,OAAQ,AACR,QAAS,AACT,YAAa,AACb,eAAgB,AAChB,kBAAmB,AACnB,WAAY,AACZ,aAAc,AACd,qBAAsB,AACtB,oBAAsB,CACvB,AACD,mBACE,wBAA0B,CAC3B,AACD,gCACE,WAAa,CACd,AACD,iCACE,YAAc,CACf,AACD,6EAGE,yCAA8C,CAC/C,AACD,gBACE,aAAe,CAChB,AACD,gCACE,oBAAsB,CACvB,AACD,iBACE,cAAe,AACf,gBAAiB,AACjB,gBAAkB,CACnB,AAMD,gCAJE,gBAAiB,AACjB,YAAa,AACb,qBAAuB,CAYxB,AAVD,gBACE,qBAAsB,AAGtB,sBAAyB,AACzB,8BAA+B,AAC/B,iBAAkB,AAElB,eAAgB,AAChB,aAAe,CAChB,AACD,sBACE,6BAA8B,AAC9B,aAAc,AACd,eAAgB,AAChB,gBAAiB,AACjB,SAAW,CACZ,AACD,uBACE,aAAe,CAChB,AACD,6EACE,gBAAkB,CACnB,AACD,8EACE,iBAAmB,CACpB,AAID,4GAEE,cAAgB,CACjB,AACD,wBACE,gBAAkB,CACnB,AACD,6BACE,cAAe,AACf,gBAAiB,AACjB,gBAAkB,CACnB,AACD,kCACE,qBAAsB,AACtB,6BAA8B,AAE9B,SAAW,CAEZ,AACD,wBACE,gBAAiB,AACjB,YAAa,AACb,qBAAuB,CACxB,AACD,4BACE,WAAa,CACd,AACD,4BACE,cAAe,AACf,gBAAiB,AACjB,gBAAkB,CACnB","file":"index.vue","sourcesContent":["/**\n* actionsheet\n*/\n/**\n* en: primary type text color of menu item\n* zh-CN: 菜单项primary类型的文本颜色\n*/\n/**\n* en: warn type text color of menu item\n* zh-CN: 菜单项warn类型的文本颜色\n*/\n/**\n* en: default type text color of menu item\n* zh-CN: 菜单项default类型的文本颜色\n*/\n/**\n* en: disabled type text color of menu item\n* zh-CN: 菜单项disabled类型的文本颜色\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* en: title and content's padding-left and padding-right\n* zh-CN: 标题及内容区域的 padding-left 和 padding-right\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* en: border radius\n* zh-CN: 圆角边框\n*/\n/**\n* en: font color\n* zh-CN: 字体颜色\n*/\n/**\n* en: margin-top value between previous button, not works when there is only one button\n* zh-CN: 与相邻按钮的 margin-top 间隙，只有一个按钮时不生效\n*/\n/**\n* en: button height\n* zh-CN: 按钮高度\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: font size\n* zh-CN: 字体大小\n*/\n/**\n* en: the font size of the mini type\n* zh-CN: mini类型的字体大小\n*/\n/**\n* en: the line height of the mini type\n* zh-CN: mini类型的行高\n*/\n/**\n* en: the background color of the warn type\n* zh-CN: warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in active\n* zh-CN: active状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in disabled\n* zh-CN: disabled状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the default type\n* zh-CN: default类型的背景颜色\n*/\n/**\n* en: the font color of the default type\n* zh-CN: default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in active\n* zh-CN: active状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in disabled\n* zh-CN: disabled状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in disabled\n* zh-CN: disabled状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in active\n* zh-CN: active状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the primary type\n* zh-CN: primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in active\n* zh-CN: active状态下，primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in disabled\n* zh-CN: disabled状态下，primary类型的背景颜色\n*/\n/**\n* en: the font color of the plain primary type\n* zh-CN: plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type\n* zh-CN: plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type\n* zh-CN: plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type\n* zh-CN: plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type\n* zh-CN: plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type\n* zh-CN: plain的warn类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的边框颜色\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* en: badge background color\n* zh-CN: badge的背景颜色\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: border radius color\n* zh-CN: 圆角边框的半径\n*/\n/**\n* en: border color\n* zh-CN: 边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 默认状态下圆角边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default background color\n* zh-CN: 默认状态下的背景颜色\n*/\n/**\n* en: selected background color\n* zh-CN: 选中状态下的背景颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/* alias */\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default text color\n* zh-CN: 默认状态下的文本颜色\n*/\n/**\n* en: height\n* zh-CN: 元素高度\n*/\n/**\n* en: line height\n* zh-CN: 元素行高\n*/\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* en: margin-top of title\n* zh-CN: 标题的margin-top\n*/\n/**\n* en: margin-bottom of title\n* zh-CN: 标题的margin-bottom\n*/\n/**\n* en: margin-top of footer title\n* zh-CN: 底部标题的margin-top\n*/\n/**\n* en: margin-bottom of footer title\n* zh-CN: 底部标题的margin-bottom\n*/\n/**\n* toast\n*/\n/**\n* en: text color of content\n* zh-CN: 内容文本颜色\n*/\n/**\n* en: default top\n* zh-CN: 默认状态下距离顶部的高度\n*/\n/**\n* en: position top\n* zh-CN: 顶部显示的高度\n*/\n/**\n* en: position bottom\n* zh-CN: 底部显示的高度\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* en: forward and backward arrows color\n* zh-CN: 前进后退的箭头颜色\n*/\n/**\n* en: text color of week highlight\n* zh-CN: 周末高亮的文本颜色\n*/\n/**\n* en: background color when selected\n* zh-CN: 选中时的背景颜色\n*/\n/**\n* en: text color when disabled\n* zh-CN: 禁用时的文本颜色\n*/\n/**\n* en: text color of today\n* zh-CN: 今天的文本颜色\n*/\n/**\n* en: font size of cell\n* zh-CN: 单元格的字号\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: size of date cell\n* zh-CN: 日期单元格尺寸大小\n*/\n/**\n* en: line height of date cell\n* zh-CN: 日期单元格的行高\n*/\n/**\n* en: text color of header\n* zh-CN: 头部的文本颜色\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* en: text color of cancel button\n* zh-CN: 取消按钮文本颜色\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: text color of placeholder\n* zh-CN: placeholder文本颜色\n*/\n/**\n* radio\n*/\n/**\n* en: checked icon color\n* zh-CN: 选中状态的图标颜色\n*/\n/**\n* loadmore\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* loading\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n.weui-cell_access {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  color: inherit;\n}\n.weui-cell_access:active {\n  background-color: #ECECEC;\n}\n.weui-cell_access .weui-cell__ft {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access .weui-cell__ft:after {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 2px;\n}\n.weui-cell_link {\n  color: #586C94;\n  font-size: 14px;\n}\n.weui-cell_link.weui-cell:first-child:before {\n  display: block;\n}\n.weui-cell_access.vux-cell-box {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access.vux-cell-box:after {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 17px;\n}\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: 0.3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.weui-cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n          align-items: flex-start;\n}\n.weui-cell__bd {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.vux-cell-justify {\n  height: 1.41176471em;\n}\n.vux-cell-justify.vux-cell-justify:after {\n  content: \".\";\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n  height: 0;\n}\n.weui-label {\n  display: block;\n  width: 105px;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-input {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  background-color: transparent;\n  font-size: inherit;\n  color: inherit;\n  height: 1.41176471em;\n  line-height: 1.41176471;\n}\n.weui-input::-webkit-outer-spin-button,\n.weui-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.weui-textarea {\n  display: block;\n  border: 0;\n  resize: none;\n  width: 100%;\n  color: inherit;\n  font-size: 1em;\n  line-height: inherit;\n  outline: 0;\n}\n.weui-textarea-counter {\n  color: #B2B2B2;\n  text-align: right;\n}\n.weui-cell_warn .weui-textarea-counter {\n  color: #E64340;\n}\n.weui-toptips {\n  display: none;\n  position: fixed;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 5px;\n  font-size: 14px;\n  text-align: center;\n  color: #FFF;\n  z-index: 5000;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-toptips_warn {\n  background-color: #E64340;\n}\n.weui-cells_form .weui-cell__ft {\n  font-size: 0;\n}\n.weui-cells_form .weui-icon-warn {\n  display: none;\n}\n.weui-cells_form input,\n.weui-cells_form textarea,\n.weui-cells_form label[for] {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-cell_warn {\n  color: #E64340;\n}\n.weui-cell_warn .weui-icon-warn {\n  display: inline-block;\n}\n.weui-cell_vcode {\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n}\n.weui-vcode-img {\n  margin-left: 5px;\n  height: 44px;\n  vertical-align: middle;\n}\n.weui-vcode-btn {\n  display: inline-block;\n  height: 44px;\n  margin-left: 5px;\n  padding: 0 0.6em 0 0.7em;\n  border-left: 1px solid #E5E5E5;\n  line-height: 44px;\n  vertical-align: middle;\n  font-size: 17px;\n  color: #3CC51F;\n}\nbutton.weui-vcode-btn {\n  background-color: transparent;\n  border-top: 0;\n  border-right: 0;\n  border-bottom: 0;\n  outline: 0;\n}\n.weui-vcode-btn:active {\n  color: #52a341;\n}\n.vux-x-input .vux-x-input-placeholder-right input::-webkit-input-placeholder {\n  text-align: right;\n}\n.vux-x-input .vux-x-input-placeholder-center input::-webkit-input-placeholder {\n  text-align: center;\n}\n.vux-x-input .vux-input-icon {\n  font-size: 21px;\n}\n.vux-input-icon.weui-icon-warn:before,\n.vux-input-icon.weui-icon-success:before {\n  font-size: 21px;\n}\n.vux-x-input .weui-icon {\n  padding-left: 5px;\n}\n.vux-x-input.weui-cell_vcode {\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n}\n.vux-x-input.disabled .weui-input {\n  text-fill-color: #888;\n  -webkit-text-fill-color: #888;\n  /* Override iOS / Android font color change */\n  opacity: 1;\n  /* Override iOS opacity change affecting text & background color */\n}\n.vux-x-input-right-full {\n  margin-left: 5px;\n  height: 44px;\n  vertical-align: middle;\n}\n.vux-x-input-right-full img {\n  height: 44px;\n}\n.vux-x-input-has-right-full {\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "fZjL":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("jFbC"), __esModule: true };

/***/ }),

/***/ "fcJk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];

/***/ }),

/***/ "hfL7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d6My");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("1eb205cc", content, true, {});

/***/ }),

/***/ "jFbC":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Cdx3");
module.exports = __webpack_require__("FeBl").Object.keys;


/***/ }),

/***/ "lFEC":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VMasker = factory();
  }
}(this, function() {
  var DIGIT = "9",
      ALPHA = "A",
      ALPHANUM = "S",
      BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
      isAllowedKeyCode = function(keyCode) {
        for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
          if (keyCode == BY_PASS_KEYS[i]) {
            return false;
          }
        }
        return true;
      },
      mergeMoneyOptions = function(opts) {
        opts = opts || {};
        opts = {
          delimiter: opts.delimiter || ".",
          lastOutput: opts.lastOutput,
          precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
          separator: opts.separator || ",",
          showSignal: opts.showSignal,
          suffixUnit: opts.suffixUnit && (" " + opts.suffixUnit.replace(/[\s]/g,'')) || "",
          unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
          zeroCents: opts.zeroCents
        };
        opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
        return opts;
      },
      // Fill wildcards past index in output with placeholder
      addPlaceholdersToOutput = function(output, index, placeholder) {
        for (; index < output.length; index++) {
          if(output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
            output[index] = placeholder;
          }
        }
        return output;
      }
  ;

  var VanillaMasker = function(elements) {
    this.elements = elements;
  };

  VanillaMasker.prototype.unbindElementToMask = function() {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = false;
      this.elements[i].onkeydown = false;

      if (this.elements[i].value.length) {
        this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
      }
    }
  };

  VanillaMasker.prototype.bindElementToMask = function(maskFunction) {
    var that = this,
        onType = function(e) {
          e = e || window.event;
          var source = e.target || e.srcElement;

          if (isAllowedKeyCode(e.keyCode)) {
            setTimeout(function() {
              that.opts.lastOutput = source.lastOutput;
              source.value = VMasker[maskFunction](source.value, that.opts);
              source.lastOutput = source.value;
              if (source.setSelectionRange && that.opts.suffixUnit) {
                source.setSelectionRange(source.value.length, (source.value.length - that.opts.suffixUnit.length));
              }
            }, 0);
          }
        }
    ;
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = onType;
      if (this.elements[i].value.length) {
        this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
      }
    }
  };

  VanillaMasker.prototype.maskMoney = function(opts) {
    this.opts = mergeMoneyOptions(opts);
    this.bindElementToMask("toMoney");
  };

  VanillaMasker.prototype.maskNumber = function() {
    this.opts = {};
    this.bindElementToMask("toNumber");
  };
  
  VanillaMasker.prototype.maskAlphaNum = function() {
    this.opts = {};
    this.bindElementToMask("toAlphaNumeric");
  };

  VanillaMasker.prototype.maskPattern = function(pattern) {
    this.opts = {pattern: pattern};
    this.bindElementToMask("toPattern");
  };

  VanillaMasker.prototype.unMask = function() {
    this.unbindElementToMask();
  };

  var VMasker = function(el) {
    if (!el) {
      throw new Error("VanillaMasker: There is no element to bind.");
    }
    var elements = ("length" in el) ? (el.length ? el : []) : [el];
    return new VanillaMasker(elements);
  };

  VMasker.toMoney = function(value, opts) {
    opts = mergeMoneyOptions(opts);
    if (opts.zeroCents) {
      opts.lastOutput = opts.lastOutput || "";
      var zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
          zeroRegExp = new RegExp(zeroMatcher, "g"),
          digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
          lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0
      ;
      value = value.toString().replace(zeroRegExp, "");
      if (digitsLength < lastDigitLength) {
        value = value.slice(0, value.length - 1);
      }
    }
    var number = value.toString().replace(/[\D]/g, ""),
        clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
        clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
        money = number.substr(0, number.length - opts.moneyPrecision),
        masked = money.substr(0, money.length % 3),
        cents = new Array(opts.precision + 1).join("0")
    ;
    money = money.substr(money.length % 3, money.length);
    for (var i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) {
        masked += opts.delimiter;
      }
      masked += money[i];
    }
    masked = masked.replace(clearDelimiter, "");
    masked = masked.length ? masked : "0";
    var signal = "";
    if(opts.showSignal === true) {
      signal = value < 0 || (value.startsWith && value.startsWith('-')) ? "-" :  "";
    }
    if (!opts.zeroCents) {
      var beginCents = number.length - opts.precision,
          centsValue = number.substr(beginCents, opts.precision),
          centsLength = centsValue.length,
          centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
      ;
      cents = (cents + centsValue).slice(-centsSliced);
    }
    var output = opts.unit + signal + masked + opts.separator + cents;
    return output.replace(clearSeparator, "") + opts.suffixUnit;
  };

  VMasker.toPattern = function(value, opts) {
    var pattern = (typeof opts === 'object' ? opts.pattern : opts),
        patternChars = pattern.replace(/\W/g, ''),
        output = pattern.split(""),
        values = value.toString().replace(/\W/g, ""),
        charsValues = values.replace(/\W/g, ''),
        index = 0,
        i,
        outputLength = output.length,
        placeholder = (typeof opts === 'object' ? opts.placeholder : undefined)
    ;
    
    for (i = 0; i < outputLength; i++) {
      // Reached the end of input
      if (index >= values.length) {
        if (patternChars.length == charsValues.length) {
          return output.join("");
        }
        else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
          return addPlaceholdersToOutput(output, i, placeholder).join("");
        }
        else {
          break;
        }
      }
      // Remaining chars in input
      else{
        if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
            (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
            (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
          output[i] = values[index++];
        } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
          if(placeholder !== undefined){
            return addPlaceholdersToOutput(output, i, placeholder).join("");
          }
          else{
            return output.slice(0, i).join("");
          }
        }
      }
    }
    return output.join("").substr(0, i);
  };

  VMasker.toNumber = function(value) {
    return value.toString().replace(/(?!^-)[^0-9]/g, "");
  };
  
  VMasker.toAlphaNumeric = function(value) {
    return value.toString().replace(/[^a-z0-9 ]+/i, "");
  };

  return VMasker;
}));


/***/ }),

/***/ "pDNl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// CONCATENATED MODULE: ./node_modules/vux/src/libs/mixin_uuid.js
/* harmony default export */ var mixin_uuid = ({
  mounted: function mounted() {
    // fix for ssr
    if (false) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[VUX] 当前版本组件要求 vux-loader 更新到最新版本');
      }
    } else if (false) {
      // eslint-disable-line
      this.uuid = createId();
    }
  },
  data: function data() {
    return {
      uuid: createId()
    };
  }
});

function createId() {
  return Math.random().toString(36).substring(3, 8);
}
// CONCATENATED MODULE: ./node_modules/vux/src/libs/base.js


/* harmony default export */ var base = ({
  mixins: [mixin_uuid],
  props: {
    required: {
      type: Boolean,
      default: false
    }
  },
  created: function created() {
    this.handleChangeEvent = false;
  },

  computed: {
    dirty: {
      get: function get() {
        return !this.pristine;
      },
      set: function set(newValue) {
        this.pristine = !newValue;
      }
    },
    invalid: function invalid() {
      return !this.valid;
    }
  },
  methods: {
    setTouched: function setTouched() {
      this.touched = true;
    }
  },
  watch: {
    value: function value(newVal) {
      if (this.pristine === true) {
        this.pristine = false;
      }
      if (!this.handleChangeEvent) {
        this.$emit('on-change', newVal);
        this.$emit('input', newVal);
      }
    }
  },
  data: function data() {
    return {
      errors: {},
      pristine: true,
      touched: false
    };
  }
});
// EXTERNAL MODULE: ./node_modules/vux/src/components/icon/index.vue + 3 modules
var icon = __webpack_require__("oWtu");

// EXTERNAL MODULE: ./node_modules/vux/src/components/toast/index.vue + 3 modules
var toast = __webpack_require__("rLAy");

// EXTERNAL MODULE: ./node_modules/vux/src/components/inline-desc/index.vue + 3 modules
var inline_desc = __webpack_require__("kbG3");

// EXTERNAL MODULE: ./node_modules/validator/lib/isEmail.js
var isEmail = __webpack_require__("2LX0");
var isEmail_default = /*#__PURE__*/__webpack_require__.n(isEmail);

// EXTERNAL MODULE: ./node_modules/validator/lib/isMobilePhone.js
var isMobilePhone = __webpack_require__("Ewe+");
var isMobilePhone_default = /*#__PURE__*/__webpack_require__.n(isMobilePhone);

// EXTERNAL MODULE: ./node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__("y1vT");
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);

// CONCATENATED MODULE: ./node_modules/vux/src/tools/debounce/index.js

/* harmony default export */ var debounce = (lodash_debounce_default.a);
// EXTERNAL MODULE: ./node_modules/vanilla-masker/lib/vanilla-masker.js
var vanilla_masker = __webpack_require__("lFEC");
var vanilla_masker_default = /*#__PURE__*/__webpack_require__.n(vanilla_masker);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/x-input/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













var validators = {
  'email': {
    fn: isEmail_default.a,
    msg: '邮箱格式'
  },
  'china-mobile': {
    fn: function fn(str) {
      return isMobilePhone_default()(str, 'zh-CN');
    },

    msg: '手机号码'
  },
  'china-name': {
    fn: function fn(str) {
      return str.length >= 2 && str.length <= 6;
    },

    msg: '中文姓名'
  }
};
/* harmony default export */ var x_input = ({
  name: 'x-input',
  created: function created() {
    var _this = this;

    this.currentValue = this.value === undefined || this.value === null ? '' : this.mask ? this.maskValue(this.value) : this.value;
    /* istanbul ignore if */
    if (false) {
      if (!this.title && !this.placeholder && !this.currentValue) {
        console.warn('no title and no placeholder?');
      }
    }

    if (this.required && (typeof this.currentValue === 'undefined' || this.currentValue === '')) {
      this.valid = false;
    }
    this.handleChangeEvent = true;
    if (this.debounce) {
      this._debounce = debounce(function () {
        _this.$emit('on-change', _this.currentValue);
      }, this.debounce);
    }
  },
  beforeMount: function beforeMount() {
    if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true;
    }
    if (this.$slots && this.$slots['right-full-height']) {
      this.hasRightFullHeightSlot = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this._debounce) {
      this._debounce.cancel();
    }
    window.removeEventListener('resize', this.scrollIntoView);
  },

  mixins: [base],
  components: {
    Icon: icon["a" /* default */],
    InlineDesc: inline_desc["a" /* default */],
    Toast: toast["a" /* default */]
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    inlineDesc: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    equalWith: String,
    textAlign: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    iconType: String,
    debounce: Number,
    placeholderAlign: String,
    labelWidth: String,
    mask: String,
    shouldToastError: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    labelStyles: function labelStyles() {
      return {
        width: this.labelWidthComputed || this.$parent.labelWidth || this.labelWidthComputed,
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      };
    },
    labelClass: function labelClass() {
      return {
        'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      };
    },
    pattern: function pattern() {
      if (this.keyboard === 'number' || this.isType === 'china-mobile') {
        return '[0-9]*';
      }
    },
    labelWidthComputed: function labelWidthComputed() {
      var width = this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1;
      if (width < 10) {
        return width + 'em';
      }
    },
    hasErrors: function hasErrors() {
      return keys_default()(this.errors).length > 0;
    },
    inputStyle: function inputStyle() {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        };
      }
    },
    showWarn: function showWarn() {
      return !this.novalidate && !this.equalWith && !this.valid && this.firstError && (this.touched || this.forceShowError);
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.scrollIntoView);
  },

  methods: {
    scrollIntoView: function scrollIntoView() {
      var _this2 = this;

      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // alert('scroll into view')
      if (/iphone/i.test(navigator.userAgent)) {
        // return
      }
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        // alert('will scroll')
        setTimeout(function () {
          // alert(this.$refs.input.length)
          _this2.$refs.input.scrollIntoViewIfNeeded(true);
        }, time);
      }
    },
    onClickErrorIcon: function onClickErrorIcon() {
      if (this.shouldToastError && this.firstError) {
        this.showErrorToast = true;
      }
      this.$emit('on-click-error-icon', this.firstError);
    },
    maskValue: function maskValue(val) {
      var val1 = this.mask ? vanilla_masker_default.a.toPattern(val, this.mask) : val;
      return val1;
    },
    reset: function reset() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this.dirty = false;
      this.currentValue = value;
      this.firstError = '';
      this.valid = true;
    },
    clear: function clear() {
      this.currentValue = '';
      this.focus();
      this.$emit('on-click-clear-icon');
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    focusHandler: function focusHandler($event) {
      var _this3 = this;

      this.$emit('on-focus', this.currentValue, $event);
      this.isFocus = true;
      // this.scrollIntoView(500)
      // this.scrollIntoView(5000)
      setTimeout(function () {
        _this3.$refs.input.scrollIntoViewIfNeeded(false);
        // this.$refs.input.scrollIntoViewIfNeeded()
      }, 1000);
      // $event.target.
    },
    onBlur: function onBlur($event) {
      this.setTouched();
      this.validate();
      this.isFocus = false;
      this.$emit('on-blur', this.currentValue, $event);
    },
    onKeyUp: function onKeyUp(e) {
      if (e.key === 'Enter') {
        e.target.blur();
        this.$emit('on-enter', this.currentValue, e);
      }
    },
    getError: function getError() {
      var key = keys_default()(this.errors)[0];
      this.firstError = this.errors[key];
    },
    validate: function validate() {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual();
        return;
      }
      this.errors = {};

      if (!this.currentValue && !this.required) {
        this.valid = true;
        return;
      }

      if (!this.currentValue && this.required) {
        this.valid = false;
        this.errors.required = '必填哦';
        this.getError();
        return;
      }

      if (typeof this.isType === 'string') {
        var validator = validators[this.isType];
        if (validator) {
          var value = this.currentValue;

          if (this.isType === 'china-mobile' && this.mask === '999 9999 9999') {
            value = this.currentValue.replace(/\s+/g, '');
          }

          this.valid = validator['fn'](value);
          if (!this.valid) {
            this.forceShowError = true;
            this.errors.format = validator['msg'] + '格式不对哦~';
            this.getError();
            return;
          } else {
            delete this.errors.format;
          }
        }
      }

      if (typeof this.isType === 'function') {
        var validStatus = this.isType(this.currentValue);
        this.valid = validStatus.valid;
        if (!this.valid) {
          this.errors.format = validStatus.msg;
          this.forceShowError = true;
          this.getError();
          return;
        } else {
          delete this.errors.format;
        }
      }

      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = '\u6700\u5C11\u5E94\u8BE5\u8F93\u5165' + this.min + '\u4E2A\u5B57\u7B26\u54E6';
          this.valid = false;
          this.getError();
          return;
        } else {
          delete this.errors.min;
        }
      }

      if (this.max) {
        if (this.currentValue.length > this.max) {
          this.errors.max = '\u6700\u591A\u53EF\u4EE5\u8F93\u5165' + this.max + '\u4E2A\u5B57\u7B26\u54E6';
          this.valid = false;
          this.forceShowError = true;
          return;
        } else {
          this.forceShowError = false;
          delete this.errors.max;
        }
      }

      this.valid = true;
    },
    validateEqual: function validateEqual() {
      if (!this.equalWith && this.currentValue) {
        this.valid = false;
        this.errors.equal = '输入不一致';
        return;
      }
      var willCheck = this.dirty || this.currentValue.length >= this.equalWith.length;
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false;
        this.errors.equal = '输入不一致';
        return;
      } else {
        if (!this.currentValue && this.required) {
          this.valid = false;
        } else {
          this.valid = true;
          delete this.errors.equal;
        }
      }
    },

    // #2810
    _getInputMaskSelection: function _getInputMaskSelection(selection, direction, maskVal, loop) {
      if (!this.mask || loop && direction === 0) {
        return selection;
      }
      if (direction === 0) {
        direction = this.lastDirection;
      }
      if (direction > 0) {
        var maskChar = this.mask.substr(selection - direction, 1);
        if (!maskChar.match(/[9SA]/)) {
          return this._getInputMaskSelection(selection + 1, direction, maskVal, true);
        }
      }
      return selection;
    }
  },
  data: function data() {
    return {
      hasRightFullHeightSlot: false,
      hasRestrictedLabel: false,
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
      currentValue: '',
      showErrorToast: false,
      isFocus: false
    };
  },

  watch: {
    mask: function mask(val) {
      if (val && this.currentValue) {
        this.currentValue = this.maskValue(this.currentValue);
      }
    },
    valid: function valid() {
      this.getError();
    },
    value: function value(val) {
      this.currentValue = val;
    },
    equalWith: function equalWith(newVal) {
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true;
        }
        this.validateEqual();
      } else {
        this.validate();
      }
    },
    currentValue: function currentValue(newVal, oldVal) {
      var _this4 = this;

      if (!this.equalWith && newVal) {
        this.validateEqual();
      }
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true;
        }
        this.validateEqual();
      } else {
        this.validate();
      }

      var selection = this.$refs.input.selectionStart;
      var direction = newVal.length - oldVal.length;
      selection = this._getInputMaskSelection(selection, direction, this.maskValue(newVal));
      this.lastDirection = direction;
      this.$emit('input', this.maskValue(newVal));
      // #2810
      this.$nextTick(function () {
        if (_this4.$refs.input.selectionStart !== selection) {
          _this4.$refs.input.selectionStart = selection;
          _this4.$refs.input.selectionEnd = selection;
        }
        if (_this4.currentValue !== _this4.maskValue(newVal)) {
          _this4.currentValue = _this4.maskValue(newVal);
        }
      });

      if (this._debounce) {
        this._debounce();
      } else {
        this.$emit('on-change', newVal);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/x-input/index.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













var x_input_validators = {
  'email': {
    fn: isEmail_default.a,
    msg: '邮箱格式'
  },
  'china-mobile': {
    fn: function fn(str) {
      return isMobilePhone_default()(str, 'zh-CN');
    },

    msg: '手机号码'
  },
  'china-name': {
    fn: function fn(str) {
      return str.length >= 2 && str.length <= 6;
    },

    msg: '中文姓名'
  }
};
/* harmony default export */ var components_x_input = ({
  name: 'x-input',
  created: function created() {
    var _this = this;

    this.currentValue = this.value === undefined || this.value === null ? '' : this.mask ? this.maskValue(this.value) : this.value;
    /* istanbul ignore if */
    if (false) {
      if (!this.title && !this.placeholder && !this.currentValue) {
        console.warn('no title and no placeholder?');
      }
    }

    if (this.required && (typeof this.currentValue === 'undefined' || this.currentValue === '')) {
      this.valid = false;
    }
    this.handleChangeEvent = true;
    if (this.debounce) {
      this._debounce = debounce(function () {
        _this.$emit('on-change', _this.currentValue);
      }, this.debounce);
    }
  },
  beforeMount: function beforeMount() {
    if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true;
    }
    if (this.$slots && this.$slots['right-full-height']) {
      this.hasRightFullHeightSlot = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this._debounce) {
      this._debounce.cancel();
    }
    window.removeEventListener('resize', this.scrollIntoView);
  },

  mixins: [base],
  components: {
    Icon: icon["a" /* default */],
    InlineDesc: inline_desc["a" /* default */],
    Toast: toast["a" /* default */]
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    inlineDesc: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    equalWith: String,
    textAlign: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    iconType: String,
    debounce: Number,
    placeholderAlign: String,
    labelWidth: String,
    mask: String,
    shouldToastError: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    labelStyles: function labelStyles() {
      return {
        width: this.labelWidthComputed || this.$parent.labelWidth || this.labelWidthComputed,
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      };
    },
    labelClass: function labelClass() {
      return {
        'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      };
    },
    pattern: function pattern() {
      if (this.keyboard === 'number' || this.isType === 'china-mobile') {
        return '[0-9]*';
      }
    },
    labelWidthComputed: function labelWidthComputed() {
      var width = this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1;
      if (width < 10) {
        return width + 'em';
      }
    },
    hasErrors: function hasErrors() {
      return keys_default()(this.errors).length > 0;
    },
    inputStyle: function inputStyle() {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        };
      }
    },
    showWarn: function showWarn() {
      return !this.novalidate && !this.equalWith && !this.valid && this.firstError && (this.touched || this.forceShowError);
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.scrollIntoView);
  },

  methods: {
    scrollIntoView: function scrollIntoView() {
      var _this2 = this;

      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // alert('scroll into view')
      if (/iphone/i.test(navigator.userAgent)) {
        // return
      }
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        // alert('will scroll')
        setTimeout(function () {
          // alert(this.$refs.input.length)
          _this2.$refs.input.scrollIntoViewIfNeeded(true);
        }, time);
      }
    },
    onClickErrorIcon: function onClickErrorIcon() {
      if (this.shouldToastError && this.firstError) {
        this.showErrorToast = true;
      }
      this.$emit('on-click-error-icon', this.firstError);
    },
    maskValue: function maskValue(val) {
      var val1 = this.mask ? vanilla_masker_default.a.toPattern(val, this.mask) : val;
      return val1;
    },
    reset: function reset() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this.dirty = false;
      this.currentValue = value;
      this.firstError = '';
      this.valid = true;
    },
    clear: function clear() {
      this.currentValue = '';
      this.focus();
      this.$emit('on-click-clear-icon');
    },
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    focusHandler: function focusHandler($event) {
      var _this3 = this;

      this.$emit('on-focus', this.currentValue, $event);
      this.isFocus = true;
      // this.scrollIntoView(500)
      // this.scrollIntoView(5000)
      setTimeout(function () {
        _this3.$refs.input.scrollIntoViewIfNeeded(false);
        // this.$refs.input.scrollIntoViewIfNeeded()
      }, 1000);
      // $event.target.
    },
    onBlur: function onBlur($event) {
      this.setTouched();
      this.validate();
      this.isFocus = false;
      this.$emit('on-blur', this.currentValue, $event);
    },
    onKeyUp: function onKeyUp(e) {
      if (e.key === 'Enter') {
        e.target.blur();
        this.$emit('on-enter', this.currentValue, e);
      }
    },
    getError: function getError() {
      var key = keys_default()(this.errors)[0];
      this.firstError = this.errors[key];
    },
    validate: function validate() {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual();
        return;
      }
      this.errors = {};

      if (!this.currentValue && !this.required) {
        this.valid = true;
        return;
      }

      if (!this.currentValue && this.required) {
        this.valid = false;
        this.errors.required = '必填哦';
        this.getError();
        return;
      }

      if (typeof this.isType === 'string') {
        var validator = x_input_validators[this.isType];
        if (validator) {
          var value = this.currentValue;

          if (this.isType === 'china-mobile' && this.mask === '999 9999 9999') {
            value = this.currentValue.replace(/\s+/g, '');
          }

          this.valid = validator['fn'](value);
          if (!this.valid) {
            this.forceShowError = true;
            this.errors.format = validator['msg'] + '格式不对哦~';
            this.getError();
            return;
          } else {
            delete this.errors.format;
          }
        }
      }

      if (typeof this.isType === 'function') {
        var validStatus = this.isType(this.currentValue);
        this.valid = validStatus.valid;
        if (!this.valid) {
          this.errors.format = validStatus.msg;
          this.forceShowError = true;
          this.getError();
          return;
        } else {
          delete this.errors.format;
        }
      }

      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = '\u6700\u5C11\u5E94\u8BE5\u8F93\u5165' + this.min + '\u4E2A\u5B57\u7B26\u54E6';
          this.valid = false;
          this.getError();
          return;
        } else {
          delete this.errors.min;
        }
      }

      if (this.max) {
        if (this.currentValue.length > this.max) {
          this.errors.max = '\u6700\u591A\u53EF\u4EE5\u8F93\u5165' + this.max + '\u4E2A\u5B57\u7B26\u54E6';
          this.valid = false;
          this.forceShowError = true;
          return;
        } else {
          this.forceShowError = false;
          delete this.errors.max;
        }
      }

      this.valid = true;
    },
    validateEqual: function validateEqual() {
      if (!this.equalWith && this.currentValue) {
        this.valid = false;
        this.errors.equal = '输入不一致';
        return;
      }
      var willCheck = this.dirty || this.currentValue.length >= this.equalWith.length;
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false;
        this.errors.equal = '输入不一致';
        return;
      } else {
        if (!this.currentValue && this.required) {
          this.valid = false;
        } else {
          this.valid = true;
          delete this.errors.equal;
        }
      }
    },

    // #2810
    _getInputMaskSelection: function _getInputMaskSelection(selection, direction, maskVal, loop) {
      if (!this.mask || loop && direction === 0) {
        return selection;
      }
      if (direction === 0) {
        direction = this.lastDirection;
      }
      if (direction > 0) {
        var maskChar = this.mask.substr(selection - direction, 1);
        if (!maskChar.match(/[9SA]/)) {
          return this._getInputMaskSelection(selection + 1, direction, maskVal, true);
        }
      }
      return selection;
    }
  },
  data: function data() {
    return {
      hasRightFullHeightSlot: false,
      hasRestrictedLabel: false,
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
      currentValue: '',
      showErrorToast: false,
      isFocus: false
    };
  },

  watch: {
    mask: function mask(val) {
      if (val && this.currentValue) {
        this.currentValue = this.maskValue(this.currentValue);
      }
    },
    valid: function valid() {
      this.getError();
    },
    value: function value(val) {
      this.currentValue = val;
    },
    equalWith: function equalWith(newVal) {
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true;
        }
        this.validateEqual();
      } else {
        this.validate();
      }
    },
    currentValue: function currentValue(newVal, oldVal) {
      var _this4 = this;

      if (!this.equalWith && newVal) {
        this.validateEqual();
      }
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true;
        }
        this.validateEqual();
      } else {
        this.validate();
      }

      var selection = this.$refs.input.selectionStart;
      var direction = newVal.length - oldVal.length;
      selection = this._getInputMaskSelection(selection, direction, this.maskValue(newVal));
      this.lastDirection = direction;
      this.$emit('input', this.maskValue(newVal));
      // #2810
      this.$nextTick(function () {
        if (_this4.$refs.input.selectionStart !== selection) {
          _this4.$refs.input.selectionStart = selection;
          _this4.$refs.input.selectionEnd = selection;
        }
        if (_this4.currentValue !== _this4.maskValue(newVal)) {
          _this4.currentValue = _this4.maskValue(newVal);
        }
      });

      if (this._debounce) {
        this._debounce();
      } else {
        this.$emit('on-change', newVal);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d6629626","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vux/src/components/x-input/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vux-x-input weui-cell",class:{
			'weui-cell_warn': _vm.showWarn,
			'disabled': _vm.disabled,
			'vux-x-input-has-right-full': _vm.hasRightFullHeightSlot
		}},[_c('div',{staticClass:"weui-cell__hd"},[(_vm.hasRestrictedLabel)?_c('div',{style:(_vm.labelStyles)},[_vm._t("restricted-label")],2):_vm._e(),_vm._v(" "),_vm._t("label",[(_vm.title)?_c('label',{staticClass:"weui-label",class:_vm.labelClass,style:({width: _vm.labelWidth || _vm.$parent.labelWidth || _vm.labelWidthComputed, textAlign: _vm.$parent.labelAlign, marginRight: _vm.$parent.labelMarginRight}),attrs:{"for":("vux-x-input-" + _vm.uuid)},domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.inlineDesc)?_c('inline-desc',[_vm._v(_vm._s(_vm.inlineDesc))]):_vm._e()])],2),_vm._v(" "),_c('div',{staticClass:"weui-cell__bd weui-cell__primary",class:_vm.placeholderAlign ? ("vux-x-input-placeholder-" + _vm.placeholderAlign) : ''},[(!_vm.type || _vm.type === 'text')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:(_vm.inputStyle),attrs:{"id":("vux-x-input-" + _vm.uuid),"maxlength":_vm.max,"autocomplete":_vm.autocomplete,"autocapitalize":_vm.autocapitalize,"autocorrect":_vm.autocorrect,"spellcheck":_vm.spellcheck,"type":"text","name":_vm.name,"pattern":_vm.pattern,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled},domProps:{"value":(_vm.currentValue)},on:{"focus":_vm.focusHandler,"blur":_vm.onBlur,"keyup":_vm.onKeyUp,"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value}}}):_vm._e(),_vm._v(" "),(_vm.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:(_vm.inputStyle),attrs:{"id":("vux-x-input-" + _vm.uuid),"maxlength":_vm.max,"autocomplete":_vm.autocomplete,"autocapitalize":_vm.autocapitalize,"autocorrect":_vm.autocorrect,"spellcheck":_vm.spellcheck,"type":"number","name":_vm.name,"pattern":_vm.pattern,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled},domProps:{"value":(_vm.currentValue)},on:{"focus":_vm.focusHandler,"blur":_vm.onBlur,"keyup":_vm.onKeyUp,"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value}}}):_vm._e(),_vm._v(" "),(_vm.type === 'email')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:(_vm.inputStyle),attrs:{"id":("vux-x-input-" + _vm.uuid),"maxlength":_vm.max,"autocomplete":_vm.autocomplete,"autocapitalize":_vm.autocapitalize,"autocorrect":_vm.autocorrect,"spellcheck":_vm.spellcheck,"type":"email","name":_vm.name,"pattern":_vm.pattern,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled},domProps:{"value":(_vm.currentValue)},on:{"focus":_vm.focusHandler,"blur":_vm.onBlur,"keyup":_vm.onKeyUp,"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value}}}):_vm._e(),_vm._v(" "),(_vm.type === 'password')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:(_vm.inputStyle),attrs:{"id":("vux-x-input-" + _vm.uuid),"maxlength":_vm.max,"autocomplete":_vm.autocomplete,"autocapitalize":_vm.autocapitalize,"autocorrect":_vm.autocorrect,"spellcheck":_vm.spellcheck,"type":"password","name":_vm.name,"pattern":_vm.pattern,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled},domProps:{"value":(_vm.currentValue)},on:{"focus":_vm.focusHandler,"blur":_vm.onBlur,"keyup":_vm.onKeyUp,"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value}}}):_vm._e(),_vm._v(" "),(_vm.type === 'tel')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],ref:"input",staticClass:"weui-input",style:(_vm.inputStyle),attrs:{"id":("vux-x-input-" + _vm.uuid),"maxlength":_vm.max,"autocomplete":_vm.autocomplete,"autocapitalize":_vm.autocapitalize,"autocorrect":_vm.autocorrect,"spellcheck":_vm.spellcheck,"type":"tel","name":_vm.name,"pattern":_vm.pattern,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled},domProps:{"value":(_vm.currentValue)},on:{"focus":_vm.focusHandler,"blur":_vm.onBlur,"keyup":_vm.onKeyUp,"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value}}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"weui-cell__ft"},[_c('icon',{directives:[{name:"show",rawName:"v-show",value:(!_vm.hasRightFullHeightSlot && !_vm.equalWith && _vm.showClear && _vm.currentValue !== '' && !_vm.readonly && !_vm.disabled && _vm.isFocus),expression:"!hasRightFullHeightSlot && !equalWith && showClear && currentValue !== '' && !readonly && !disabled && isFocus"}],attrs:{"type":"clear"},nativeOn:{"click":function($event){return _vm.clear($event)}}}),_vm._v(" "),_c('icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.showWarn),expression:"showWarn"}],staticClass:"vux-input-icon",attrs:{"type":"warn","title":!_vm.valid ? _vm.firstError : ''},nativeOn:{"click":function($event){return _vm.onClickErrorIcon($event)}}}),_vm._v(" "),(!_vm.novalidate && _vm.hasLengthEqual && _vm.dirty && _vm.equalWith && !_vm.valid)?_c('icon',{staticClass:"vux-input-icon",attrs:{"type":"warn"},nativeOn:{"click":function($event){return _vm.onClickErrorIcon($event)}}}):_vm._e(),_vm._v(" "),_c('icon',{directives:[{name:"show",rawName:"v-show",value:(!_vm.novalidate && _vm.equalWith && _vm.equalWith === _vm.currentValue && _vm.valid),expression:"!novalidate && equalWith && equalWith === currentValue && valid"}],attrs:{"type":"success"}}),_vm._v(" "),_c('icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.novalidate && _vm.iconType === 'success'),expression:"novalidate && iconType === 'success'"}],staticClass:"vux-input-icon",attrs:{"type":"success"}}),_vm._v(" "),_c('icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.novalidate && _vm.iconType === 'error'),expression:"novalidate && iconType === 'error'"}],staticClass:"vux-input-icon",attrs:{"type":"warn"}}),_vm._v(" "),_vm._t("right"),_vm._v(" "),(_vm.hasRightFullHeightSlot)?_c('div',{staticClass:"vux-x-input-right-full"},[_vm._t("right-full-height")],2):_vm._e()],2),_vm._v(" "),_c('toast',{attrs:{"type":"text","width":"auto","time":600},model:{value:(_vm.showErrorToast),callback:function ($$v) {_vm.showErrorToast=$$v},expression:"showErrorToast"}},[_vm._v(_vm._s(_vm.firstError))])],1)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./node_modules/vux/src/components/x-input/index.vue
function injectStyle (context) {
  __webpack_require__("hfL7")
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
  components_x_input,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_x_input = __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "tJgO":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Page2.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "wU/2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./examples/components/Demo/demo-mixin.js + 13 modules
var demo_mixin = __webpack_require__("BR0b");

// EXTERNAL MODULE: ./src/main.js + 8 modules
var main = __webpack_require__("NHnr");

// EXTERNAL MODULE: ./node_modules/vux/src/components/x-input/index.vue + 6 modules
var x_input = __webpack_require__("pDNl");

// EXTERNAL MODULE: ./node_modules/vux/src/components/form-preview/index.vue + 3 modules
var form_preview = __webpack_require__("pTXB");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/flexbox/flexbox.vue
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var flexbox = ({
  name: 'flexbox',
  props: {
    gutter: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    },
    justify: String,
    align: String,
    wrap: String,
    direction: String
  },
  computed: {
    styles: function styles() {
      var styles = {
        'justify-content': this.justify,
        '-webkit-justify-content': this.justify,
        'align-items': this.align,
        '-webkit-align-items': this.align,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        'flex-direction': this.direction,
        '-webkit-flex-direction': this.direction
      };
      return styles;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/flexbox/flexbox.vue
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var flexbox_flexbox = ({
  name: 'flexbox',
  props: {
    gutter: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    },
    justify: String,
    align: String,
    wrap: String,
    direction: String
  },
  computed: {
    styles: function styles() {
      var styles = {
        'justify-content': this.justify,
        '-webkit-justify-content': this.justify,
        'align-items': this.align,
        '-webkit-align-items': this.align,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        'flex-direction': this.direction,
        '-webkit-flex-direction': this.direction
      };
      return styles;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-28eb4a1c","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vux/src/components/flexbox/flexbox.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vux-flexbox",class:{
  'vux-flex-col': _vm.orient === 'vertical',
  'vux-flex-row': _vm.orient === 'horizontal'
},style:(_vm.styles)},[_vm._t("default")],2)}
var staticRenderFns = []

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/component-normalizer.js
var component_normalizer = __webpack_require__("XyMi");

// CONCATENATED MODULE: ./node_modules/vux/src/components/flexbox/flexbox.vue
function injectStyle (context) {
  __webpack_require__("zMue")
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
  flexbox_flexbox,
  render,
  staticRenderFns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_flexbox_flexbox = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/flexbox/flexbox-item.vue
//
//
//
//
//
//

var prefixList = ['-moz-box-', '-webkit-box-', ''];

/* harmony default export */ var flexbox_item = ({
  name: 'flexbox-item',
  props: {
    span: [Number, String],
    order: [Number, String]
  },
  beforeMount: function beforeMount() {
    this.bodyWidth = document.documentElement.offsetWidth;
  },

  methods: {
    buildWidth: function buildWidth(width) {
      if (typeof width === 'number') {
        if (width < 1) {
          return width;
        } else {
          return width / 12;
        }
      } else if (typeof width === 'string') {
        return width.replace('px', '') / this.bodyWidth;
      }
    }
  },
  computed: {
    style: function style() {
      var styles = {};
      var marginName = this.$parent.orient === 'horizontal' ? 'marginLeft' : 'marginTop';

      if (this.$parent.gutter * 1 !== 0) {
        styles[marginName] = this.$parent.gutter + 'px';
      }

      if (this.span) {
        for (var i = 0; i < prefixList.length; i++) {
          styles[prefixList[i] + 'flex'] = '0 0 ' + this.buildWidth(this.span) * 100 + '%';
        }
      }
      if (typeof this.order !== 'undefined') {
        styles.order = this.order;
      }
      return styles;
    }
  },
  data: function data() {
    return {
      bodyWidth: 0
    };
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vux/src/components/flexbox/flexbox-item.vue
//
//
//
//
//
//

var flexbox_item_prefixList = ['-moz-box-', '-webkit-box-', ''];

/* harmony default export */ var flexbox_flexbox_item = ({
  name: 'flexbox-item',
  props: {
    span: [Number, String],
    order: [Number, String]
  },
  beforeMount: function beforeMount() {
    this.bodyWidth = document.documentElement.offsetWidth;
  },

  methods: {
    buildWidth: function buildWidth(width) {
      if (typeof width === 'number') {
        if (width < 1) {
          return width;
        } else {
          return width / 12;
        }
      } else if (typeof width === 'string') {
        return width.replace('px', '') / this.bodyWidth;
      }
    }
  },
  computed: {
    style: function style() {
      var styles = {};
      var marginName = this.$parent.orient === 'horizontal' ? 'marginLeft' : 'marginTop';

      if (this.$parent.gutter * 1 !== 0) {
        styles[marginName] = this.$parent.gutter + 'px';
      }

      if (this.span) {
        for (var i = 0; i < flexbox_item_prefixList.length; i++) {
          styles[flexbox_item_prefixList[i] + 'flex'] = '0 0 ' + this.buildWidth(this.span) * 100 + '%';
        }
      }
      if (typeof this.order !== 'undefined') {
        styles.order = this.order;
      }
      return styles;
    }
  },
  data: function data() {
    return {
      bodyWidth: 0
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3f79b7cb","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vux/src/components/flexbox/flexbox-item.vue
var flexbox_item_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vux-flexbox-item",style:(_vm.style)},[_vm._t("default")],2)}
var flexbox_item_staticRenderFns = []

// CONCATENATED MODULE: ./node_modules/vux/src/components/flexbox/flexbox-item.vue
/* script */


/* template */

/* template functional */
var flexbox_item___vue_template_functional__ = false
/* styles */
var flexbox_item___vue_styles__ = null
/* scopeId */
var flexbox_item___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var flexbox_item___vue_module_identifier__ = null

var flexbox_item_Component = Object(component_normalizer["a" /* default */])(
  flexbox_flexbox_item,
  flexbox_item_render,
  flexbox_item_staticRenderFns,
  flexbox_item___vue_template_functional__,
  flexbox_item___vue_styles__,
  flexbox_item___vue_scopeId__,
  flexbox_item___vue_module_identifier__
)

/* harmony default export */ var components_flexbox_flexbox_item = (flexbox_item_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/PageStack/Page2.vue









/* harmony default export */ var Page2 = ({
  mixins: [main["b" /* paramsStack */], demo_mixin["a" /* default */]],
  components: {
    FormPreview: form_preview["a" /* default */],
    Flexbox: components_flexbox_flexbox,
    FlexboxItem: components_flexbox_flexbox_item,
    XInput: x_input["a" /* default */]
  },
  data: function data() {
    return {
      list: [{
        label: '手机号',
        value: ''
      }],
      stackList: [{
        label: 'params',
        value: {}
      }, {
        label: 'backParams',
        value: {}
      }],
      dataParams: {
        phoneNumb: '',
        amount: '50元'
      }
    };
  },

  methods: {
    showStackList: function showStackList() {
      console.log('this.params', this.params);
      console.log('this.backParams', stringify_default()(this.backParams));
      this.stackList[0].value = this.params;
      this.stackList[1].value = this.backParams;
    },

    /**
    * 如果需要下一个页面点击返回，任然要回显当前页面，就调用该方法
    * /
    next() {
    
    
    
    
    this.$vp.psPageNext('/Demo/PageStack/Page4', { params: this.dataParams })
    },
    /**
    * 一般确认页面都无需被“保留”，故这里使用`this.$vp.psPageReplace`接口完成跳转，底层将会使用
    * `router.replace({location})`完成跳转
    */
    replace: function replace() {
      console.log('充值确认数据：', stringify_default()(this.dataParams));
      this.$vp.psPageReplace('/Demo/PageStack/Page4', { params: this.dataParams });
    },
    bck: function bck() {
      this.$vp.psPageGoBack({
        backParams: {
          phoneNumb: '13222222222'
        }
      });
    }
  },
  created: function created() {
    this.showStackList();
    this.list[0].value = this.params.phoneNumb;
    this.dataParams.phoneNumb = this.params.phoneNumb;
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vux-loader/src/script-loader.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./examples/components/Demo/PageStack/Page2.vue









/* harmony default export */ var PageStack_Page2 = ({
  mixins: [main["b" /* paramsStack */], demo_mixin["a" /* default */]],
  components: {
    FormPreview: form_preview["a" /* default */],
    Flexbox: components_flexbox_flexbox,
    FlexboxItem: components_flexbox_flexbox_item,
    XInput: x_input["a" /* default */]
  },
  data: function data() {
    return {
      list: [{
        label: '手机号',
        value: ''
      }],
      stackList: [{
        label: 'params',
        value: {}
      }, {
        label: 'backParams',
        value: {}
      }],
      dataParams: {
        phoneNumb: '',
        amount: '50元'
      }
    };
  },

  methods: {
    showStackList: function showStackList() {
      console.log('this.params', this.params);
      console.log('this.backParams', stringify_default()(this.backParams));
      this.stackList[0].value = this.params;
      this.stackList[1].value = this.backParams;
    },

    /**
    * 如果需要下一个页面点击返回，任然要回显当前页面，就调用该方法
    * /
    next() {
    
    
    
    
    this.$vp.psPageNext('/Demo/PageStack/Page4', { params: this.dataParams })
    },
    /**
    * 一般确认页面都无需被“保留”，故这里使用`this.$vp.psPageReplace`接口完成跳转，底层将会使用
    * `router.replace({location})`完成跳转
    */
    replace: function replace() {
      console.log('充值确认数据：', stringify_default()(this.dataParams));
      this.$vp.psPageReplace('/Demo/PageStack/Page4', { params: this.dataParams });
    },
    bck: function bck() {
      this.$vp.psPageGoBack({
        backParams: {
          phoneNumb: '13222222222'
        }
      });
    }
  },
  created: function created() {
    this.showStackList();
    this.list[0].value = this.params.phoneNumb;
    this.dataParams.phoneNumb = this.params.phoneNumb;
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-643d5aa1","hasScoped":true,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vux-loader/src/before-template-compiler-loader.js!./node_modules/vux-loader/src/template-loader.js!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./examples/components/Demo/PageStack/Page2.vue
var Page2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('group',{staticClass:"bottom-group",attrs:{"label-width":"15em"}},[_c('form-preview',{attrs:{"header-label":"请确认订单信息","body-items":_vm.list}}),_vm._v(" "),_c('x-input',{staticStyle:{"margin-top":"10px"},attrs:{"title":"请输出充值金额"},model:{value:(_vm.dataParams.amount),callback:function ($$v) {_vm.$set(_vm.dataParams, "amount", $$v)},expression:"dataParams.amount"}}),_vm._v(" "),_c('box',{attrs:{"gap":"10px 10px"}},[_c('flexbox',[_c('flexbox-item',[_c('x-button',{attrs:{"type":"default"},nativeOn:{"click":function($event){_vm.replace()}}},[_vm._v("确认")])],1),_vm._v(" "),_c('flexbox-item',[_c('x-button',{attrs:{"type":"default"},nativeOn:{"click":function($event){_vm.bck()}}},[_vm._v("返回(回传参数)")])],1)],1)],1),_vm._v(" "),_c('form-preview',{attrs:{"header-label":"参数栈回显","body-items":_vm.stackList}}),_vm._v(" "),_c('cell-box',[_c('pre',{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[_c('code',{staticClass:"javascript"},[_vm._v("\nimport demoMixin from '../demo-mixin'\nimport { paramsStack } from 'vue-viewplus'\nimport { XInput, FormPreview, Flexbox, FlexboxItem } from 'vux'\n\nexport default {\n  mixins: [paramsStack, demoMixin],\n  components: {\n    FormPreview,\n    Flexbox,\n    FlexboxItem,\n    XInput\n  },\n  data() {\n    return {\n      list: [\n        {\n          label: '手机号',\n          value: ''\n        }\n      ],\n      stackList: [\n        {\n          label: 'params',\n          value: {}\n        },\n        {\n          label: 'backParams',\n          value: {}\n        }\n      ],\n      dataParams: {\n        phoneNumb: '',\n        amount: '50元'\n      }\n    }\n  },\n  methods: {\n    showStackList() {\n      console.log('this.params', this.params)\n      console.log('this.backParams', JSON.stringify(this.backParams))\n      this.stackList[0].value = this.params\n      this.stackList[1].value = this.backParams\n    },\n    /**\n     * 如果需要下一个页面点击返回，任然要回显当前页面，就调用该方法\n     * /\n    next() {\n      // 推荐\n      this.$vp.psPageNext('/Demo/PageStack/Page4', { params: this.dataParams })\n    },\n    /**\n     * 一般确认页面都无需被“保留”，故这里使用`this.$vp.psPageReplace`接口完成跳转，底层将会使用\n     * `router.replace({location})`完成跳转\n     */\n    replace() {\n      console.log('充值确认数据：', JSON.stringify(this.dataParams))\n      this.$vp.psPageReplace('/Demo/PageStack/Page4', {params: this.dataParams})\n    },\n    bck() {\n      this.$vp.psPageGoBack({\n        backParams: {\n          phoneNumb: '13222222222'\n        }\n      })\n    }\n  },\n  created() {\n    this.showStackList()\n    this.list[0].value = this.params.phoneNumb\n    this.dataParams.phoneNumb = this.params.phoneNumb\n  }\n}\n      ")])])])],1)}
var Page2_staticRenderFns = []

// CONCATENATED MODULE: ./examples/components/Demo/PageStack/Page2.vue
function Page2_injectStyle (context) {
  __webpack_require__("VmBU")
}
/* script */


/* template */

/* template functional */
var Page2___vue_template_functional__ = false
/* styles */
var Page2___vue_styles__ = Page2_injectStyle
/* scopeId */
var Page2___vue_scopeId__ = "data-v-643d5aa1"
/* moduleIdentifier (server only) */
var Page2___vue_module_identifier__ = null

var Page2_Component = Object(component_normalizer["a" /* default */])(
  PageStack_Page2,
  Page2_render,
  Page2_staticRenderFns,
  Page2___vue_template_functional__,
  Page2___vue_styles__,
  Page2___vue_scopeId__,
  Page2___vue_module_identifier__
)

/* harmony default export */ var Demo_PageStack_Page2 = __webpack_exports__["default"] = (Page2_Component.exports);


/***/ }),

/***/ "y1vT":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "zMue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8eXq");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("df0c0ed2", content, true, {});

/***/ })

});