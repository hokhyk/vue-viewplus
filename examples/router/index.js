import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Info'
    },
    {
      path: '/Info',
      component: (resolve) => import('../components/Info').then(module => resolve(module)),
      meta: {
        title: 'vue-viewplus'
      }
    },
    {
      path: '/Demo',
      component: (resolve) => import('../components/Demo').then(module => resolve(module)),
      meta: {
        title: '示例'
      },
      children: [
        {
          path: 'PageStack',
          component: (resolve) => import('../components/EmptyTmpl').then(module => resolve(module)),
          children: [
            {
              path: 'PageStack',
              component: (resolve) => import('../components/Demo/PageStack').then(module => resolve(module)),
              meta: {
                title: 'params-stack'
              }
            },
            {
              path: 'Page1',
              component: (resolve) => import('../components/Demo/PageStack/Page1').then(module => resolve(module)),
              meta: {
                title: 'Page1',
                subRoot: true
              }
            },
            {
              path: 'Page2',
              component: (resolve) => import('../components/Demo/PageStack/Page2').then(module => resolve(module)),
              meta: {
                title: 'Page2'
              }
            },
            {
              path: 'Page4',
              component: (resolve) => import('../components/Demo/PageStack/Page4').then(module => resolve(module)),
              meta: {
                title: 'Page4'
              }
            },
            {
              path: 'Multipage',
              component: (resolve) => import('../components/Demo/PageStack/Multipage/Multipage').then(module => resolve(module)),
              children: [
                {
                  path: 'Trans1-Page1',
                  name: 'Trans1-Page1',
                  component: (resolve) => import('../components/Demo/PageStack/Multipage/Trans1/Page1').then(module => resolve(module)),
                  meta: {
                    title: 'Trans1-Page1',
                    trsName: 'Trans1'
                  }
                },
                {
                  path: 'Trans1-Page2',
                  name: 'Trans1-Page2',
                  component: (resolve) => import('../components/Demo/PageStack/Multipage/Trans1/Page2').then(module => resolve(module)),
                  meta: {
                    title: 'Trans1-Page2',
                    trsName: 'Trans1'
                  }
                },
                {
                  path: 'Trans2-Page1',
                  name: 'Trans2-Page1',
                  component: (resolve) => import('../components/Demo/PageStack/Multipage/Trans2/Page3').then(module => resolve(module)),
                  meta: {
                    title: 'Trans2-Page1',
                    trsName: 'Trans2'
                  }
                },
                {
                  path: 'Trans2-Page2',
                  name: 'Trans2-Page2',
                  component: (resolve) => import('../components/Demo/PageStack/Multipage/Trans2/Page4').then(module => resolve(module)),
                  meta: {
                    title: 'Trans2-Page2',
                    trsName: 'Trans2'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'Manage',
          component: (resolve) => import('../components/EmptyTmpl').then(module => resolve(module)),
          meta: {
            title: '模拟管理模块，测试login-state-check模块'
          },
          children: [
            {
              path: 'User',
              component: (resolve) => import('../components/Demo/Manage/User').then(module => resolve(module)),
              meta: {
                title: '模拟用户中心'
              }
            }
          ]
        },
        {
          path: 'UtilHttp',
          component: (resolve) => import('../components/Demo/UtilHttp').then(module => resolve(module)),
          meta: {
            title: 'util-http'
          }
        },
        {
          path: 'JsBridgeContext',
          component: (resolve) => import('../components/Demo/JsBridgeContext').then(module => resolve(module)),
          meta: {
            title: 'js-bridge-context'
          }
        },
        {
          path: 'LoginStateCheck',
          component: (resolve) => import('../components/Demo/LoginStateCheck').then(module => resolve(module)),
          meta: {
            title: 'login-state-check'
          }
        },
        {
          path: 'UtilCache',
          component: (resolve) => import('../components/Demo/UtilCache').then(module => resolve(module)),
          meta: {
            title: 'util-cache'
          }
        },
        {
          path: 'CacheUserInfo',
          component: (resolve) => import('../components/Demo/CacheUserInfo').then(module => resolve(module)),
          meta: {
            title: 'cache-userinfo'
          }
        },
        {
          path: 'mixin',
          component: (resolve) => import('../components/Demo/mixin').then(module => resolve(module)),
          meta: {
            title: 'ViewPlus.mixin'
          }
        }
      ]
    }
  ]
})
