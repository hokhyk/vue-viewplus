<template>
  <div id="uiConfirm">
    <m-scroll ref="scroll" :scrollbar="{fade: true}">
      <group title="默认使用" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmDefult">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
        this.$vp.uiConfirm()
      </code></pre>
        </cell-box>
      </group>

      <group title="自定义弹窗内容" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmContent">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiConfirm('这是自定义弹窗内容哦!')
      </code></pre>
        </cell-box>
      </group>

      <group title="设置弹窗标题" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmTitle('top')">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiConfirm('确认消息!', {title: '设置弹窗标题'})
      </code></pre>
        </cell-box>
      </group>
      <group title="确认按钮/取消按钮的显示文字" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmButtonText">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
this.$vp.uiConfirm('这是确认按钮/取消按钮的显示文字的实例!', {confirmText: 'confirmText', cancelText: 'cancelText'})
      </code></pre>
        </cell-box>
      </group>
      <group title="点击遮罩时自动关闭弹窗" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmHideOnBlur">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiConfirm('这是点击遮罩时自动关闭弹窗实例', {hideOnBlur: true})
      </code></pre>
        </cell-box>
      </group>
      <group title="点击确定按钮时时导航是否可以回退的配置" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmCanBeBack">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiConfirm('这是点击确定按钮时时导航是否可以回退的配置', {canBeBack: true})
      </code></pre>
        </cell-box>
      </group>
      <group title="设置弹窗风格，可以是ios或android" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmTheme">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
    this.$vp.uiConfirm('这是设置提示框主流样式（android）的配置', {theme: 'android'})
      </code></pre>
        </cell-box>
      </group>
      <group title="点击取消按钮时触发(注意this 指向)" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmCancel">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
   this.$vp.uiConfirm('这是点击取消按钮时触发(注意this 指向)', {
          onCancel: this::function () {
              alert('this.cancel=' + this.cancel)
          }
        })
      </code></pre>
        </cell-box>
      </group>
      <group title="点击确定按钮时触发(注意this 指向)" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiConfirmConfirm">演示效果</x-button>
        </box>
        <cell-box >
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
  this.$vp.uiConfirm('这是点击确定按钮时触发(注意this 指向)', {
          onConfirm: this::function () {
              alert('this.confirm=' + this.confirm)
          }
        })
      </code></pre>
        </cell-box>
      </group>
      <group title="uiHideConfirm使用" label-width="15em">
        <box gap="10px 10px">
          <x-button @click.native="uiHideConfirm">演示效果</x-button>
        </box>
        <cell-box align-items="flex-start">
        <pre v-highlightjs><code class="javascript">
        // 执行代码：
        this.$vp.uiHideConfirm()
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
        confirm: true,
        cancel: true
      }
    },
    methods: {
      uiConfirmDefult() {
        this.$vp.uiConfirm()
      },
      uiConfirmContent() {
        this.$vp.uiConfirm('这是自定义的消息内容哦!')
      },
      uiConfirmTitle() {
        this.$vp.uiConfirm('提示信息', {title: '设置提示标题'})
      },
      uiConfirmButtonText() {
        // 执行代码：
        this.$vp.uiConfirm('提示信息', {confirmText: 'confirmText', cancelText: 'cancelText'})
      },
      uiConfirmHideOnBlur() {
        this.$vp.uiConfirm('这是点击遮罩关闭提示实例', {hideOnBlur: true})
      },
      uiConfirmCanBeBack() {
        this.$vp.uiConfirm('这是当提示框显示时导航是否可以回退的配置', {canBeBack: true})
      },
      uiConfirmTheme() {
        this.$vp.uiConfirm('这是设置提示框主流样式（android）的配置', {theme: 'android'})
      },
      uiConfirmCancel() {
        this.$vp.uiConfirm('这是点击取消按钮时触发(注意this 指向)', {
          onCancel: this::function () {
            alert('this.cancel=' + this.cancel)
          }
        })
      },
      uiConfirmConfirm() {
        this.$vp.uiConfirm('这是点击确定按钮时触发(注意this 指向)', {
          onConfirm: this::function () {
            alert('this.confirm=' + this.confirm)
          }
        })
      },
      uiHideConfirm() {
        this.$vp.uiConfirm('这是uiHideConfirm使用')
        setTimeout(() => {
          this.$vp.uiHideConfirm()
        }, 500)
      }
    }
  }
</script>

<style scoped>
</style>
