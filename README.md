<p align="center">
  <a href="https://github.com/Jiiiiiin/vue-viewplus">
    <img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fwq8xk9nh9j305k05kdfs.jpg" width="175">
  </a>
</p>
<h4 align="center">vue-viewplus <br> <br> <img src="https://img.shields.io/badge/npm-0.9.8-orange.svg"/></h4>
<p align="center">一个简化Vue应用开发的工具库</p>

做这个插件的目的是为了：

+ 针对大多数应用都会用到的功能进行二次封装，减少样板代码，让开发人员更关注于业务本身
+ 用**一种方式解决一个问题**，在开发时候解决问题可以有多种方式，但是我们只需要一种

# 特性
+ [针对axios进行了二次封装的ajax模块](http://jiiiiiin.cn/vue-viewplus/#/util-http)
+ [身份认证权限控制模块](http://jiiiiiin.cn/vue-viewplus/#/login-state-check)
+ [参数栈模块](http://jiiiiiin.cn/vue-viewplus/#/params-stack)
+ [JSBridge桥接模块](http://jiiiiiin.cn/vue-viewplus/#/js-bridge-context)，用于简化前端和客户端（Android && IOS）直接的交互，配合[Jiiiiiin/android-viewplus 一个安卓混合客户端开发库](https://github.com/Jiiiiiin/android-viewplus)可以让hybrid开发易如反掌 ：）
+ [缓存模块](http://jiiiiiin.cn/vue-viewplus/#/util-cache)
+ [缓存用户（登录用户）信息模块](http://jiiiiiin.cn/vue-viewplus/#/cache-userinfo)
+ [支持自定义模块混合](http://jiiiiiin.cn/vue-viewplus/#/global_api?id=mixin-)
+ [自定义RBAC权限控制模块](http://jiiiiiin.cn/vue-viewplus/#/rbac)

# 文档
[点击查看文档](http://jiiiiiin.cn/vue-viewplus/)

# 例子

+ 线上demo

<p align="center"><img src="https://ws3.sinaimg.cn/large/006tNbRwgy1fwv0ejzauhj305k05kweb.jpg" width="175"></p>

<p align="center">扫码访问 | <a herf="http://vue_viewplus_demo.jiiiiiin.cn/Info">点击访问demo</a></p>
+ 自己运行demo

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
| 前端RBAC权限控制 | 90% | [自定义RBAC前端权限控制模块](https://github.com/Jiiiiiin/jiiiiiin-security/blob/master/jiiiiiin-client-manager/src/plugin/vue-viewplus/rbac.js#L124) |
| [jiiiiiin权限系统](https://github.com/Jiiiiiin/jiiiiiin-security) | 70% | 结合[d2-admin](https://gi]thub.com/d2-projects/d2-admin)做一个[一个前后端分离的内管基础项目](https://github.com/Jiiiiiin/jiiiiiin-security) |



