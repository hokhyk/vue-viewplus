<template>
  <div id="app">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header class="border-1px app-header-bar" :left-options="leftOptions" :title="appTitle"
                @on-click-back="onHeaderBarTapBck">
      </x-header>

      <transition :name="transitionName">
        <navigation>
          <!-- <keep-alive> -->
          <router-view class="child-view" :style="{ height: mheight + 'px' }"></router-view>
          <!-- </keep-alive>   -->
        </navigation>
      </transition>

      <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
        <tabbar-item :link="{path:'/Info', replace: true}" :selected="path === '/Info'" @click.native="onHomeBarClick">
          <i class="iconfont icon-zhuye" slot="icon"></i>
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/Demo'}" :selected="isDemo" @click.native="onDemoBarClick">
          <i class="iconfont icon-test-case-secondary" slot="icon"
             style="font-size: 20px; margin-top: 3px; display: inline-block"></i>
          <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span
            v-else>示例</span></span>
        </tabbar-item>
      </tabbar>

    </view-box>
  </div>
</template>

<script type="text/ecmascript-6">
  import {vueTopprogress} from 'vue-top-progress'
  import {mapState, mapMutations} from 'vuex'
  import {Loading, XHeader, Tabbar, TabbarItem, Icon, ViewBox} from 'vux'
  import {PLUGIN_VUEX_DEF_MODULE_NAME as MODULE_NAME} from '../src/gloabl-dict'

  export default {
    name: 'app',
    components: {
      vueTopprogress,
      Loading,
      XHeader,
      Tabbar,
      TabbarItem,
      Icon,
      ViewBox
    },
    data() {
      return {
        transitionName: 'slide-left',
        mheight: 200
      }
    },
    computed: {
      backState() {
        return this.$store.state[MODULE_NAME].backState
      },
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      }),
      ...mapState(['isLoading', 'appTitle', 'appTitleBarBackBtnVisible']),
      isDemo() {
        return /Components|Demo/.test(this.path)
      },
      componentName() {
        if (/Components|Demo\/./.test(this.path)) {
          return this.appTitle
        }
      },
      leftOptions() {
        return {
          showBack: !/.[/Info]./.test(this.path) || /.[/Demo]./.test(this.path),
          backText: '',
          preventGoBack: true
        }
      }
    },
    watch: {
      backState(state) {
        if (state) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      },
      isLoading(val) {
        if (val) {
          this.$refs.topProgress.start()
        } else {
          this.$refs.topProgress.done()
        }
      },
      path(path) {
        if (/Info/.test(this.path)) {
          this.$vp.psModifyBackState(true)
        } else if (/Demo/.test(this.path)) {
          // TODO 将scroll上移
        }
      }
    },
    methods: {
      ...mapMutations(['updateBackStatus', 'updateLoadingStatus']),
      onHomeBarClick() {
        if (this.backState) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      },
      onHeaderBarTapBck() {
        this.$vp.psPageGoBack()
      },
      onDemoBarClick() {
        this.updateBackStatus(false)
      }
    },
    created() {
      this.$navigation.on('refresh', () => {
        this.$refs.topProgress.done()
      })
      this.mheight = document.documentElement.offsetHeight - 100
    }
  }
</script>

<style lang="less" scoped>
  @import "./styles/variable";

  #app {
    // 参考：https://vux.li/#/zh-CN/components?id=viewbox
    height: 100%;

    .child-view {
      width: 100%;
      position: fixed;
      top: 46px;
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(50px, 0);
      transform: translate(50px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-50px, 0);
      transform: translate(-50px, 0);
    }

    .vux-header {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
    }

    .vux-demo-tabbar {
      .weui-tabbar__label span {
        color: @color-text;
      }
      .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span {
        color: @color-a;
      }
      .iconfont {
        color: #000000;
      }
    }

  }
</style>
