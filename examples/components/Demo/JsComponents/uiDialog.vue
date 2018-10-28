<template>
  <div id="uiDialog">
    <m-scroll ref="scroll" :scrollbar="{fade: true}">
      <group title="默认使用" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogDefult">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
        this.$vp.uiDialog()
      </code></pre>
        </cell-box>
      </group>

      <group title="自定义消息内容" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogContent">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiDialog('这是自定义的消息内容哦!')
      </code></pre>
        </cell-box>
      </group>

      <group title="设置提示标题" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogTitle('top')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiDialog('提示信息', {title: '设置提示标题'})
      </code></pre>
        </cell-box>
      </group>
      <group title="buttonText" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogButtonText">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiDialog('提示信息', {buttonText: 'buttonText'})
      </code></pre>
        </cell-box>
      </group>
      <group title="点击遮罩关闭提示" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogHideOnBlur">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiDialog('这是点击遮罩关闭提示实例', {hideOnBlur: true})
      </code></pre>
        </cell-box>
      </group>
      <group title="点击提示框button时导航是否可以回退的配置" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogCanBeBack">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiDialog('这是点击提示框button时导航是否可以回退的配置', {canBeBack: true})
      </code></pre>
        </cell-box>
      </group>
      <group title="点击提示框button的回调事件配置(注意this 指向)" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiDialogAction">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
   this.$vp.uiDialog('这是点击提示框button的回调事件配置(注意this 指向)', {
          action: this::function () {
            alert(this.uiDialog)
          }
        })
      </code></pre>
        </cell-box>
      </group>
      <group title="uiHideDialog使用" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiHideDialog">演示效果</x-button>
        </box>
        <cell-box align-items="flex-start">
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
        this.$vp.uiHideDialog()
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
        uiDialog: false
      }
    },
    methods: {
      uiDialogDefult() {
        this.$vp.uiDialog()
      },
      uiDialogContent() {
        this.$vp.uiDialog('这是自定义的消息内容哦!')
      },
      uiDialogTitle() {
        this.$vp.uiDialog('提示信息', {title: '设置提示标题'})
      },
      uiDialogButtonText() {
        this.$vp.uiDialog('提示信息', {buttonText: 'buttonText'})
      },
      uiDialogHideOnBlur() {
        this.$vp.uiDialog('这是点击遮罩关闭提示实例', {hideOnBlur: true})
      },
      uiDialogCanBeBack() {
        this.$vp.uiDialog('这是当提示框显示时导航是否可以回退的配置', {canBeBack: true})
      },
      uiDialogAction() {
        this.$vp.uiDialog('这是点击提示框button的回调事件配置(注意this 指向)', {
          action: this::function () {
            alert(this.uiDialog)
          }
        })
      },
      uiHideDialog() {
        this.$vp.uiDialog('这是uiHideDialog使用')
        setTimeout(() => {
          this.$vp.uiHideDialog()
        }, 500)
      }
    }
  }
</script>

<style scoped>
</style>
