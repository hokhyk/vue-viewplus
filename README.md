<p align="center">
  <a href="https://github.com/Jiiiiiin/vue-viewplus">
    <img src="http://qiniu.jiiiiiin.cn/68747470733a2f2f7773332e73696e61696d672e636e2f6c617267652f303036744e62527767793166777138786b396e68396a3330356b30356b6466732e6a7067.jpeg" width="175">
  </a>
</p>
<h4 align="center">vue-viewplus <br> <br> <img src="https://img.shields.io/badge/npm-0.9.12-orange.svg"/></h4>
<p align="center">一个简化Vue应用开发的工具库</p>

做这个插件的目的是为了：

+ 针对大多数应用都会用到的功能进行二次封装，减少样板代码，让开发人员更关注于业务本身
+ 只用**一种方式解决一个问题**，在开发时候解决问题可以有多种方式，但是我们只需要一种

# 特性
| 内置功能模块                                                 | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [util-http.js](http://jiiiiiin.cn/vue-viewplus/#/util-http)  | 模块对axios进行了一次封装，目的是为了减少开发人员的工作量，简化和服务器端、客户端（JSBridge 代理请求）的交互，配合`login-state-check.js`模块进行身份认证权限控制。 |
| [login-state-check.js](http://jiiiiiin.cn/vue-viewplus/#/login-state-check) | 使用该模块可以让应用使用一个包含正则表达式的数组`LoginStateCheck#checkPaths`，来定义需要进行身份认证（登录）才能访问的页面资源（路由的path），这样做的好处就在于，我们不用向很多应用那些去修改路由组件中的mate字段来确认哪一个路由组件需要进行身份认证权限控制。 |
| [params-stack.js](http://jiiiiiin.cn/vue-viewplus/#/params-stack) | 提供一个**栈**来管理栈内所有页面的参数，方便页面在回退的时候，拿到对应页面的**缓存参数**；即一般我们使用vue router的时候每个页面的参数（除了使用url参数），在做统一返回键处理的时候，都不太方便进行页面状态恢复，而如果我们提供了一个栈，在页面入栈的时候，将当前页面的参数存储，在下一个页面点击返回按钮回到当前页面的时候我们再从参数栈恢复参数，这样就能实现客户端开发中具有的这一特性； |
| [js-bridge-context.js](http://jiiiiiin.cn/vue-viewplus/#/js-bridge-context) | 使用该模块，用于简化前端和客户端（Android && IOS&&Electron）直接的交互，配合[Jiiiiiin/android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)可以让hybrid开发易如反掌 ：） |
| [util-cache.js](http://jiiiiiin.cn/vue-viewplus/#/util-cache) | 使用该模块，为插件的其他模块提供缓存支持。                   |
| [cache-userinfo.js](http://jiiiiiin.cn/vue-viewplus/#/cache-userinfo) | 一般应用都需要在前端缓存登录用户的信息，以便在开发过程中使用，当前模块目前提供了一组用户信息缓存接口 |



> 关于自定义模块: [mixin](http://jiiiiiin.cn/vue-viewplus/#/global_api?id=mixin-)

| 自定义模块                                        | 作用                                                     |
| ------------------------------------------------- | -------------------------------------------------------- |
| [rbac.js](http://jiiiiiin.cn/vue-viewplus/#/rbac) | 自定义RBAC权限控制模块，为前端应用提供rbac权限控制帮助。 |




# 文档
[点击查看文档](http://jiiiiiin.cn/vue-viewplus/)

# 例子

+ 运行demo

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

| 名称 | 渠道 | 简介 |
| ------ | ------ | ------ |
| [云南农信手机银行](http://sj.qq.com/myapp/detail.htm?apkName=com.csii.mobilebank) | 移动端 | [2018区域性商业银行“最佳手机银行奖”](https://mp.weixin.qq.com/s/n0QMYGBSdatmkXTfS9p6HA)，整个手机银行80%的界面都基于Vue开发，完整使用了当前插件 |
| [jiiiiiin权限系统](https://github.com/Jiiiiiin/jiiiiiin-security) | PC端 | 一个前后端分离的内管基础项目，并基于当前插件完成了[RBAC前端权限控制](https://github.com/Jiiiiiin/jiiiiiin-security/blob/master/jiiiiiin-client-manager/src/plugin/vue-viewplus/rbac.js#L124) |



# 计划
| 功能 | 完成状态 | 简介 |
| ------ | ------ | ------ |
| 变打包插件方式为rollup | 0% | |
| 前端RBAC权限控制 | 100% | [自定义RBAC前端权限控制模块](https://github.com/Jiiiiiin/jiiiiiin-security/blob/master/jiiiiiin-client-manager/src/plugin/vue-viewplus/rbac.js#L124) |
| [jiiiiiin权限系统](https://github.com/Jiiiiiin/jiiiiiin-security) | 100% | 结合[d2-admin](https://gi]thub.com/d2-projects/d2-admin)做一个[一个前后端分离的内管基础项目](https://github.com/Jiiiiiin/jiiiiiin-security) |
| 桥接electron | 100% | [js-bridge-electron.js 【自定义模块】]() |



