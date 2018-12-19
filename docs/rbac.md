# rbac.js

rabc.js 自定义RBAC权限控制模块，为前端应用提供rbac权限控制帮助。

[RBAC](https://zh.wikipedia.org/zh/以角色為基礎的存取控制)基于角色的访问控制，一般只会在管理端应用使用，故这个模块不作为默认模块，[点击下载](https://github.com/Jiiiiiin/jiiiiiin-security/blob/master/jiiiiiin-client-manager/src/plugin/vue-viewplus/rbac.js)。

其和[login-state-check.js 身份认证权限控制模块](http://jiiiiiin.cn/vue-viewplus/#/login-state-check)不同之处在于，该模块提供了一下两种权限控制手段：

+ 实现前端页面可访问性控制，即通过路由拦截，判断用户待访问页面是否已经授权
+ 实现可见页面的局部UI组件的**可使用性或可见性**控制，即基于自定义`v-access`指令，对比声明的接口或资源别是否已经授权

而login-state-check.js 身份认证权限控制模块，则提供的是对**非公共页面**的身份认证校验检查，其中维护了用户的身份认证即登录状态，这种权限控制，更适合大多数应用，即给**用户使用**的客户端应用。

而当前模块也依赖了**登录状态**，故可以一起复用；

实际案例：

| 名称 | 渠道 | 简介 |
| ------ | ------ | ------ |
| [jiiiiiin权限系统](https://github.com/Jiiiiiin/jiiiiiin-security) | PC端 | 一个前后端分离的内管基础项目，并基于当前插件完成了[RBAC前端权限控制](https://github.com/Jiiiiiin/jiiiiiin-security/blob/master/jiiiiiin-client-manager/src/plugin/vue-viewplus/rbac.js#L124) |

效果如下：
|  |  |  |  |
| ------ | ------ | ------ | ------ |
| ![](https://user-gold-cdn.xitu.io/2018/12/19/167c4284909a210e?w=1920&h=1080&f=jpeg&s=85075) | ![](https://user-gold-cdn.xitu.io/2018/12/19/167c4286378ca846?w=1728&h=1080&f=jpeg&s=78121) | ![](https://user-gold-cdn.xitu.io/2018/12/19/167c42968b5600a8?w=1920&h=1080&f=jpeg&s=196559) | ![](https://user-gold-cdn.xitu.io/2018/12/19/167c429962878279?w=1920&h=1080&f=jpeg&s=156734) |

使用方法：

1. 其[基于vue-viewplus，实现了一个自定义模块](http://jiiiiiin.cn/vue-viewplus/#/global_api?id=mixin-) ，非标准模块，需要手动配置：

main.js入口文件：

```js
import router from './router'
import ViewPlus from 'vue-viewplus'
import rbacModule from '@/plugin/vue-viewplus/rbac.js'
import viewPlusOptions from '@/plugin/vue-viewplus'

Vue.use(ViewPlus, viewPlusOptions)

ViewPlus.mixin(Vue, rbacModule, {
    debug: true,
    errorHandler(err) {
        console.error(err)
    },
    moduleName: '自定义RBAC',
    router,
    publicPaths: ['/login'],
    onLoginStateCheckFail(to, from, next) {
        this.dialog(`您无权访问【${to.path}】页面`)
            .then(() => {
            // 防止用户被踢出之后，被权限拦截导致访问不了任何页面，故这里进行登录状态监测
            if (this.isLogin()) {
                next(false);
            } else {
                next('/login');
            }
        })
    }
})
```

2. 在登录成功之后，**需要设置插件的登录状态，和rabc模块相应权限集合**，即后端返回的当前登录用户拥有的：

+ [*] 登录用户拥有访问权限的路由path路径集合

  完成该配置，则**页面可访问性**控制就可以正常工作

+ [*] 登录用户拥有访问权限的后台接口集合

+ [可选] 登录用户拥有访问权限的资源别名集合

  完成以上配置，则**自定义v-access**指令就可以支持对应模式的配置

+ [可选] 是否是超级用户

   有些系统存在一个超级用户角色，其可以访问任何资源、页面，故如果设置，针对这个登录用户将不会做任何权限校验，以便节省前端资源
```js
 // 开始请求登录接口
      AccountLogin(vm.$vp, {
        username,
        password,
        imageCode
      })
        .then(async res => {
          // 修改用户登录状态
          vm.$vp.modifyLoginState(true)
          const menus = _delEmptyChildren(res.principal.admin.menus);
          const authorizeResources = _parseAuthorizePaths(res.principal.admin.authorizeResources);
          vm.$vp.rabcUpdateAuthorizedPaths(authorizeResources)
          const authorizeInterfaces = _parseAuthorizeInterfaces(res.principal.admin.authorizeInterfaces);
          vm.$vp.rabcUpdateAuthorizeInterfaces(authorizeInterfaces)
          const isSuperAdminStatus = _parseUserRoleIsSuperAdminStatus(res.principal.admin.roles);
          vm.$vp.rabcUpdateSuperAdminStatus(isSuperAdminStatus)
```

针对需要设置的权限集合，其都是**扁平化**的一维数组，格式类似：

`authorizedPaths`和`publicPaths`:

```json
["/mngauth/admin", "/index", "/mngauth"]
```

`authorizeInterfaces`:

```json
["admin/dels/*", "admin/search/*/*/*", "admin/*/*/*", "role/list/*", "admin/*"]
```

```authorizeResourceAlias```:

```json
["MNG_USERMNG", "MNG_ROLEMNG"]
```

注意以上数组的值除了可以配置为字符串还可以配置为正则表达式：

```json
[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]
```



3. 实现可见页面的局部UI组件的**可使用性或可见性**配置示例:

```html
<el-form v-access="['admin/search/*/*/*']" slot="search-inner-box" :inline="true" :model="searchForm" :rules="searchRules" ref="ruleSearchForm" class="demo-form-inline">
...
	<el-form-item class="search-inner-btn-box">
        <el-button size="small" type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="onCancelSubmit">重置</el-button>
      </el-form-item>
</el-form>
```

完成以上配置即可让正常使用当前模块提供的权限控制服务，当然如`$vp.modifyLoginState|$vp#isLogin`涉及到[`login-state-check.js 身份认证权限控制模块`](http://jiiiiiin.cn/vue-viewplus/#/login-state-check)



## 计划

针对`authorizeInterfaces`，后期将会用于在发送ajax请求之前，对待请求的接口和当前集合进行匹配，如果匹配失败说明用户就没有请求权限，则直接不发送后台请求，减少后端不必要的资源浪费，在完成这个权限匹配，前端基础的权限规则就完整了。



## 配置

`debug|errorHandler|router|installed`配置，可以查看全局通用配置

### publicPaths

```js
/**
     * [*] 系统公共路由path路径集合，即可以让任何人访问的页面路径
     * {Array<Object>}
     * <p>
     *   比如登录页面的path，因为登录之前我们是无法判断用户是否可以访问某个页面的，故需要这个配置，当然如果需要这个配置也可以在初始化插件之前从服务器端获取，这样前后端动态性就更高，但是一般没有这种需求：）
     * <p>
     * 数组中的item，可以是一个**正则表达式字面量**，如`[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]`，也可以是一个字符串
     * <p>
     * 匹配规则：如果在`LoginStateCheck#publicPaths`**系统公共路由path路径集合**中，那么就直接跳过权限校验
     */
publicPaths = []
```

### authorizedPaths

```js
/**
     * [*] 登录用户拥有访问权限的路由path路径集合
     * {Array<Object>}
     * <p>
     * 数组中的item，可以是一个**正则表达式字面量**，如`[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]`，也可以是一个字符串
     * <p>
     * 匹配规则：如果在`LoginStateCheck#authorizedPaths`**需要身份认证规则集**中，那么就需要查看用户是否登录，如果没有登录就拒绝访问
     */
authorizedPaths = []
```

### authorizeInterfaces

```js
 /**
     * [*] 登录用户拥有访问权限的后台接口集合
     * {Array<Object>}
     * <p>
     *   1.在`v-access`指令配置为url（默认）校验格式时，将会使用该集合和指令声明的待审查授权接口列表进行匹配，如果匹配成功，则指令校验通过，否则校验不通过，会将对应dom元素进行处理
     *   2.TODO 将会用于在发送ajax请求之前，对待请求的接口和当前集合进行匹配，如果匹配失败说明用户就没有请求权限，则直接不发送后台请求，减少后端不必要的资源浪费
     * <p>
     * 数组中的item，可以是一个**正则表达式字面量**，如`[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]`，也可以是一个字符串
     * <p>
     * 匹配规则：将会用于在发送ajax请求之前，对待请求的接口和当前集合进行匹配，如果匹配失败说明用户就没有请求权限，则直接不发送后台请求，减少后端不必要的资源浪费
     */
    authorizeInterfaces = []
```

### authorizeResourceAlias

```js
/**
     * [可选] 登录用户拥有访问权限的资源别名集合
     * {Array<Object>}
     * <p>
     * 数组中的item，可以是一个**正则表达式字面量**，如`[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]`，也可以是一个字符串
     * <p>
     * 匹配规则：因为如果都用`LoginStateCheck#authorizeInterfaces`接口进行匹配，可能有一种情况，访问一个资源，其需要n个接口，那么我们在配置配置权限指令：v-access="[n, n....]"的时候就需要声明所有需要的接口，就会需要对比多次，
     * 当我们系统的接口集合很大的时候，势必会成为一个瓶颈，故我们可以为资源声明一个别名，这个别名则可以代表这n个接口，这样的话就从n+减少到n次匹配；
     */
authorizeResourceAlias = []
```

### onLoginStateCheckFail

```js
/**
     * [*] `$vp::onLoginStateCheckFail(to, from, next)`
     * <p>
     * 权限检查失败时被回调
     */
onLoginStateCheckFail = null
```

### 


## API接口

### modifyLoginState

```js
 /**
   * 代理`$vp#login-state-check`模块的同名方法，以实现在登出、会话超时踢出的时候清理本模块维护的登录之后设置的状态
   * @param status
   */
  modifyLoginState(status = false)
```

### rabcUpdateSuperAdminStatus

```js
  /**
   * 【可选】有些系统存在一个超级用户角色，其可以访问任何资源、页面，故如果设置，针对这个登录用户将不会做任何权限校验，以便节省前端资源
   * @param status
   */
  rabcUpdateSuperAdminStatus(status)
```

### rabcAddAuthorizedPaths

```js
 /**
   * 添加授权路径集合
   * 如：登录完成之后，将用户被授权可以访问的页面`paths`添加到`LoginStateCheck#authorizedPaths`中
   * @param paths
   */
  rabcAddAuthorizedPaths(paths)
```

### rabcUpdateAuthorizedPaths

```js
/**
   * 更新授权路径集合
   * @param paths
   */
  rabcUpdateAuthorizedPaths(paths)
```

### rabcUpdateAuthorizeResourceAlias

```js
/**
   * 更新资源别名集合
   * @param alias
   */
  rabcUpdateAuthorizeResourceAlias(alias)
```

### rabcAddAuthorizeResourceAlias

```js
/**
   * 添加资源别名集合
   * @param alias
   */
  rabcAddAuthorizeResourceAlias(alias)
```

### rabcUpdatePublicPaths

```js
 /**
   * 更新公共路径集合
   * @param paths
   */
  rabcUpdatePublicPaths(paths)
```

### rabcAddPublicPaths

```js
/**
   * 添加公共路径集合
   * @param paths
   */
  rabcAddPublicPaths(paths)
```

