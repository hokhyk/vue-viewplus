<template>
  <div id="uiToasts">
    <m-scroll ref="scroll" :scrollbar="{fade: true}">
      <group title="默认消息" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastDefult">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
        this.$vp.uiToast()
      </code></pre>
        </cell-box>
      </group>

      <group title="自定义消息内容" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastText">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiToast('这是自定义的消息内容哦!')
      </code></pre>
        </cell-box>
      </group>

      <group title="Top" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastPosition('top')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiToast('默认消息！', {position: 'top'})
      </code></pre>
        </cell-box>
      </group>
      <group title="Middle" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastPosition('middle')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiToast('默认消息！', {position: 'middle'})
      </code></pre>
        </cell-box>
      </group>
      <group title="type为text" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastType('text')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiToast('type为text', {type: 'text'})
      </code></pre>
        </cell-box>
      </group>
      <group title="type为cancel" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastType('cancel')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiToast('type为cancel', {type: 'cancel'})
      </code></pre>
        </cell-box>
      </group>
      <group title="type为警告" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastType('warn')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
 this.$vp.uiToast('type为警告', {type: 'warn'})
      </code></pre>
        </cell-box>
      </group>
      <group title="type为success" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastType('success')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
 this.$vp.uiToast('type为success', {type: 'success'})
      </code></pre>
        </cell-box>
      </group>
      <group title="显示时间1s" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToast1s">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiToast('显示时间为1s', {time: 1000})
      </code></pre>
        </cell-box>
      </group>
      <group title="设置宽度" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiToastidth">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
 this.$vp.uiToast('设置宽度为200px', {width: '200px'})
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
      return {
        ajaxAllBtnState: false,
        doGetBtnState: false,
        doPostBtnState: false
      }
    },
    methods: {
      uiToastDefult() {
        this.$vp.uiToast()
      },
      uiToastText() {
        this.$vp.uiToast('这是自定义的消息内容哦!')
      },
      uiToastPosition(position) {
        this.$vp.uiToast('默认消息！', {position: position})
      },
      uiToastType(type) {
        this.$vp.uiToast(`type为${type}`, {type: type})
      },
      uiToast1s() {
        this.$vp.uiToast('显示时间为1s', {time: 1000})
      },
      uiToastidth() {
        this.$vp.uiToast('设置宽度为200px', {width: '200px'})
      }
    }
  }
</script>

<style scoped>
</style>
