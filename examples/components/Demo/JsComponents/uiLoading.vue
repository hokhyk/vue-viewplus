<template>
  <div id="uiLoading">
    <m-scroll ref="scroll" :scrollbar="{fade: true}">
      <group title="使用" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiLoading">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
         this.$vp.uiLoading()
          // 这是为了能继续往下演示关闭loadin
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 2000)
      </code></pre>
        </cell-box>
      </group>
      <group title="自定义加载提示信息" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiLoadingText">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
         this.$vp.uiLoading('这是自定义加载提示信息...')
          // 这是为了能继续往下演示关闭loadin
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 2000)
      </code></pre>
        </cell-box>
      </group>
      <group title="定位方式，默认为fixed，在100%的布局下用absolute可以避免抖动" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiLoadingPosition('fixed')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
         this.$vp.uiLoading('加载中...', {position: `${postion}`})
          // 这是为了能继续往下演示关闭loadin
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 2000)
      </code></pre>
        </cell-box>
      </group>
      <group title="显示1s" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiLoadingTime">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
          this.$vp.uiLoading('加载中...', {time: 1000})
      </code></pre>
        </cell-box>
      </group>
      <group title="uiHideLoading使用" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiHideLoading">演示效果</x-button>
        </box>
        <cell-box align-items="flex-start">
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
        this.$vp.uiHideLoading()
      </code></pre>
        </cell-box>
      </group>
      <div style="height: 100px;">
      </div>
    </m-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    Group,
    Selector,
    Cell,
    CellBox,
    XButton,
    Box
  } from 'vux'
  import MScroll from '../../MScroll'

  export default {
    components: {
      Group,
      Selector,
      Cell,
      CellBox,
      XButton,
      Box,
      MScroll
    },
    data() {
      return {}
    },
    methods: {
      uiLoading() {
        this.$vp.uiLoading()
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 2000)
      },
      uiLoadingText() {
        this.$vp.uiLoading('这是自定义加载中提示信息...')
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 2000)
      },
      uiLoadingPosition(postion) {
        this.$vp.uiLoading('加载中...', {position: `${postion}`})
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 2000)
      },
      uiLoadingTime() {
        this.$vp.uiLoading('加载中...', {time: 1000})
      },
      uiHideLoading() {
        this.$vp.uiLoading('这是uiHideLoading使用')
        setTimeout(() => {
          this.$vp.uiHideLoading()
        }, 500)
      }
    }
  }
</script>

<style scoped>
</style>
