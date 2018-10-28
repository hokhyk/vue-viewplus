# login-state-check.js

login-state-check.js 身份认证控制模块。

使用该模块可以让应用使用一个包含正则表达式的数组`LoginStateCheck#checkPaths`，来定义需要进行身份认证（登录）才能访问的页面资源（路由的path），这样做的好处就在于，我们不用向很多应用那些去修改路由组件中的mate字段来确认哪一个路由组件需要进行身份认证控制。

一般的应用在权限控制这一块，一般有两种需求，一种是基于`RBAC`权限模型的管理端应用，而大多数应用只需要控制那些页面需要用户登录才能访问；当前模块默认认为所有页面都是`公共资源`，如果要进行身份认证控制，可以这样定义：

```js
loginStateCheck: {
    checkPaths: [
      /User\/Manage/
    ],
    ...
```
这样所有用户管理资源就都需要登录才能进行访问了。

匹配规则：**如果在`LoginStateCheck#checkPaths`需要身份认证规则集中，那么就需要查看用户是否登录，如果没有登录就拒绝访问；**
当然插件内部还是依赖`router`的导航守卫来进行拦截控制；

注：

+ 该模块维护了一个vuex state `vplus#loginState`，来持有用户登录状态，在页面刷新的时候也通过缓存数据来对其进行恢复；
+ 这个状态建议配合`UtilHttp#accessRules.sessionTimeOut`和`UtilHttp#accessRules.onSessionTimeOut`，来使用，也就是一般应用都是后台来控制登录状态或者说会话的时长，你需要在`sessionTimeOut`中配置后台会话超时返回的错误码，这样插件就会自动将当期模块的`vplus#loginState`设置为false，这样就帮我们管理了这个**不可控**状态；
+ 如果没有配置在改列表里面的都被视为**公共交易**，即不需要身份认证就可以访问；

## 配置

### checkPaths

```js
  /**
     * 需要进行身份认证检查的路由path路径集合
     * {Array<Object>}
     * <p>
     * 数组中的item，必须要是一个**正则表达式字面量**，如`[/^((\/Interbus)(?!\/SubMenu)\/.+)$/]`
     * <p>
     * 匹配规则：如果在`LoginStateCheck#checkPaths`**需要身份认证规则集**中，那么就需要查看用户是否登录，如果没有登录就拒绝访问
     */
    checkPaths = []
```

### onLoginStateCheckFail
```js
  /**
     * [*] `$vp#onLoginStateCheckFail(to, from, next)`
     * <p>
	 * 身份认证检查失败时被回调
     */
    onLoginStateCheckFail = null
```

一般你可以需要这样实现该函数：

```js
onLoginStateCheckFail(to, from, next) {
  this.uiToast('您尚未登录，请先登录')
  next('/User/Login')
}
```

### isLogin

```js
  /**
     * 【可选】在初始化插件的时候，预制登录状态，如用户可能已经在原生客户端登录完毕，故可以通过此配置来初始化用户状态相关信息；
     */
    isLogin = false
```

## API接口

### isLogin

```js
/**
   * $vp.isLogin()
   * 获取用户登录状态
   * <p>
   * @return {boolean} 如果处于登录状态返回true，否则返回false，直接通过获取插件vuex state中对应`loginState`的值
   */
  isLogin()
```

### modifyLoginState

```js
/**
   * $vp.modifyLoginState(isLogin = false)
   * 修改登录状态
   * <p>
   * 会修改插件vuex state中对应`loginState`的值
   * <p>
   * 注意用户的登录状态前端只是一个`临时维护`，即在服务端设置的session或者token有效期到了之后，服务端一般会返回**会话超时**这样的错误，故我们在`util-http`模块还对此作了预留处理，详见`utilHttp#accessRules.onSessionTimeOut`配置
   * 所以在这里我们只用操作vuex中的状态即可
   * @param {Boolean} [isLogin=false]       插件使用vuex时候维护的登录状态
   */
  modifyLoginState(isLogin = false)
```

### restoreLoginState

```js
/**
   * $vp.restoreLoginState()
   * 恢复插件中对应`store#loginState`的登录相关状态，在当前模块重新安装的时候，一般对应就是页面刷新的时候
   */
  restoreLoginState()
```

