<p align="center">
  <a href="https://github.com/Jiiiiiin/vue-viewplus">
    <img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fwq8xk9nh9j305k05kdfs.jpg" width="175">
  </a>
</p>
<h4 align="center">vue-viewplus <br> <br> <img src="https://img.shields.io/badge/npm-0.9.14-orange.svg"/></h4>
<p align="center">一个简化Vue应用开发的工具库</p>

做这个插件的目的是为了：

+ 针对大多数应用都会用到的功能进行二次封装，减少样板代码，让开发人员更关注于业务本身
+ 只用**一种方式解决一个问题**，在开发时候解决问题可以有多种方式，但是我们只需要一种

# 特性
| 内置功能模块                                                 | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [util-http.js](http://jiiiiiin.cn/vue-viewplus/#/util-http)  | 简化和服务器端、客户端的交互|
| [login-state-check.js](http://jiiiiiin.cn/vue-viewplus/#/login-state-check) | 简化身份认证权限控制 |
| [params-stack.js](http://jiiiiiin.cn/vue-viewplus/#/params-stack) | 给Vue来开发移动客户端一个视图栈的概念 |
| [js-bridge-context.js](http://jiiiiiin.cn/vue-viewplus/#/js-bridge-context) | 桥接并帮助前端和客户端人员磨平双方的通讯，简化hybrid开发|
| [util-cache.js](http://jiiiiiin.cn/vue-viewplus/#/util-cache) | 提供缓存支持 |
| [cache-userinfo.js](http://jiiiiiin.cn/vue-viewplus/#/cache-userinfo) | 提供用户状态缓存支持 |



> 关于自定义模块: [mixin](http://jiiiiiin.cn/vue-viewplus/#/global_api?id=mixin-)

| 自定义模块                                        | 作用                                                     |
| ------------------------------------------------- | -------------------------------------------------------- |
| [rbac.js](http://jiiiiiin.cn/vue-viewplus/#/rbac) | 为前端应用提供rbac权限控制方案 |
| [js-bridge-electron.js](http://jiiiiiin.cn/vue-viewplus/#/js-bridge-electron)| 桥接并帮助前端和客户端人员磨平双方的通讯，简化hybrid开发  |



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
| 桥接electron | 100% | [js-bridge-electron.js 【自定义模块】](https://github.com/Jiiiiiin/vue-viewplus/blob/master/custom-module/js-bridge-electron.js) |



