<p align="center">vue-viewplus <img src="https://img.shields.io/badge/npm-0.9.77-orange.svg"/></p>
<p align="center">一个简化Vue应用开发的工具库</p>
做这个插件的目的是为了：
+ 针对大多数应用都会用到的功能进行二次封装，减少样板代码，让开发人员更关注于业务本身
+ 用**一种方式解决一个问题**，在开发时候解决问题可以有多种方式，但是我们只需要一种



# 特性

+ util-http.js 针对axios进行了二次封装的ajax模块。
+ login-state-check.js 身份认证权限控制模块。
+ params-stack.js 参数栈模块。
+ js-bridge-context.js JSBridge桥接模块，用于简化前端和客户端（Android && IOS）直接的交互，配合[Jiiiiiin/android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)可以让hybrid开发易如反掌 ：）
+ util-cache.js 缓存模块。
+ cache-userinfo.js 缓存用户（登录用户）信息模块。
+ 支持[自定义模块混合](http://jiiiiiin.cn/vue-viewplus/#/global_api?id=mixin-)



# 例子

- 线上demo

[点击访问demo](http://vue_viewplus_demo.jiiiiiin.cn/Info)

<p align="center"><img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fwv0ejzauhj305k05kweb.jpg" width="175"></p>

<p align="center">扫码访问</p>

- 自己运行demo

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

+ [云南农信手机银行 一个企业级金融app](http://sj.qq.com/myapp/detail.htm?apkName=com.csii.mobilebank)



# 计划

+ 变打包插件方式为rollup
+ 计划做一个RBAC权限控制，目前login-state-check.js 身份认证权限控制模块不足以满足后台管理端的RBAC权限控制
+ 结合[d2-admin](https://gi]thub.com/d2-projects/d2-admin)做一个管理端模板
  <a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>

