# vue-viewplus

一个简化Vue应用构建的工具库

做这个插件的目的是为了：
+ 针对大多数应用都会用到的功能进行二次封装，减少样板代码，让开发人员更关注于业务本身
+ 用**一种方式解决一个问题**，在开发时候解决问题可以有多种方式，但是我们只需要一种

# 特性
+ util-http.js 模块对axios进行了一次封装，目的是为了减少开发人员的工作量，简化和服务器端、客户端（配合login-state-check.js模块完成代理请求）的交互，配合login-state-check.js模块进行身份认证控制。
+ login-state-check.js 身份认证控制模块。
+ params-stack.js 参数栈模块。
+ js-bridge-context.js JSBridge桥接模块，用于简化前端和客户端（Android && IOS）直接的交互，配合[Jiiiiiin/android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)可以让hybrid开发易如反掌 ：）
+ util-cache.js 缓存模块，为插件的其他模块提供缓存支持。
+ cache-userinfo.js 缓存用户（登录用户）信息模块。一般应用都需要在前端缓存登录用户的信息，以便在开发过程中使用，当前模块目前提供了一组将用户缓存到【localStorage|sessionStorage】的独立接口。

# 文档
[文档](http://jiiiiiin.cn/vue-viewplus/)

# 例子

```bash
├── examples 插件demo
├── mock 插件demo mock服务器接口
├── src 插件源码
```

可启动项目里的`examples`示例应用，就可以了解插件的各个模块的演示；
如果需要测试`util-http.js模块`需要启动项目里的`examples`一个简单的本地mock server；

```bash
# 首先启动mock server，使得本地提供一个express的简单返回测试json数据的服务
npm run mock
# 启动examples
npm run dev
```

# 案例

+ [云南农信手机银行](http://sj.qq.com/myapp/detail.htm?apkName=com.csii.mobilebank)

![云南农信手机银行](http://a.app.qq.com/o/image/microQr.png?pkgName=com.csii.mobilebank)
