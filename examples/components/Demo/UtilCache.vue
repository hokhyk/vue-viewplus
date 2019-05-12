<template>
  <div id="UtilCache">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">util-cache.js 缓存模块。</p>
        <p class="hint-a"><a href="https://github.com/Jiiiiiin/vue-viewplus/blob/9861d0139e39fccb29c1d0a856e0e28d003ca716/examples/components/Demo/UtilCache.vue">源码</a> | <a href="http://jiiiiiin.cn/vue-viewplus/#/util-cache">文档</a></p>
        <ul class="hint-msg">
          <li>1. 如防止页面在刷新之后vuex数据状态不能保持，有了缓存模块，我们就可以从缓存中恢复state中的值；</li>
          <li>2. 时间有限，以下示例只写了针对`cacheXXXLocalStorage`的个别常用方法，针对Session Storage也具有相同的方法，这里就不再写了。</li>
        </ul>
      </box>
    </group>

    <group title="使用$vp#cacheSaveToLocalStore将数据存储到中：" label-width="15em">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheSaveToLocalStore() {
  this.$vp.cacheSaveToLocalStore('user', {name: 'admin'}, {
    exp: 5
  })
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheSaveToLocalStore" class="fl-right">运行</x-button>
      </box>
    </group>

    <group title="使用$vp#cacheLoadFromLocalStore获取缓存数据：" label-width="15em">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheLoadFromLocalStore() {
  const data = this.$vp.cacheLoadFromLocalStore('user', { name: 'tourist' })
  this.$vp.dialog(data, {
    showCode: true
  })
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheLoadFromLocalStore" class="fl-right">运行</x-button>
      </box>
    </group>

    <group title="使用$vp#cacheModifyExpFromLocalStore更新对应缓存的`exp`超时时间：" label-width="15em">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheModifyExpFromLocalStore() {
  this.$vp.cacheSaveToLocalStore(
    'test',
    'exp',
    {
      exp: 30
    }
  )
  setTimeout(() => {
    this.$vp.cacheModifyExpFromLocalStore('test', 1)
    setTimeout(() => {
      const data = this.$vp.cacheLoadFromLocalStore('test', '数据已经被更新之后，过期了')
      this.$vp.dialog(data)
    }, 3000)
  }, 3000)
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheModifyExpFromLocalStore" class="fl-right">运行</x-button>
      </box>
    </group>

    <group title="使用$vp#cacheModifyExpFromLocalStore更新对应缓存的`exp`超时时间：" label-width="15em">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheSaveToLocalStore() {
  this.$vp.cacheModifyExpFromLocalStore('user', 30)
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheModifyExpFromLocalStore" class="fl-right">运行</x-button>
      </box>
    </group>

    <group title="使用$vp#cacheDeleteToLocalStore根据key删除缓存中的值。：" label-width="15em" class="bottom-group">
      <cell-box class="code-box">
        <pre v-highlightjs><code class="javascript">
doCacheDeleteToLocalStore() {
  this.$vp.cacheSaveToLocalStore(
    'test-del',
    'delete'
  )
  this.$vp.toast(`缓存的值: ${this.$vp.cacheLoadFromLocalStore('test-del')}`)
  setTimeout(() => {
    this.$vp.cacheDeleteToLocalStore('test-del')
    const data = this.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了')
    this.$vp.dialog(data, {
      showCode: true
    })
  }, 1000)
}
      </code></pre>
      </cell-box>
      <box gap="10px 10px">
        <x-button mini plain @click.native="doCacheDeleteToLocalStore" class="fl-right">运行</x-button>
      </box>
    </group>

  </div>
</template>

<script type="text/ecmascript-6">
import demoMixin from './demo-mixin'
// import _ from 'lodash'

export default {
  mixins: [demoMixin],
  data() {
    return {}
  },
  methods: {
    doCacheSaveToLocalStore() {
      this.$vp.cacheSaveToLocalStore(
        'user',
        { name: 'admin' },
        {
          exp: 5
        }
      )
    },
    doCacheModifyExpFromLocalStore() {
      this.$vp.cacheSaveToLocalStore(
        'test-exp',
        'exp',
        {
          exp: 30
        }
      )
      setTimeout(() => {
        this.$vp.cacheModifyExpFromLocalStore('test-exp', 1)
        setTimeout(() => {
          const data = this.$vp.cacheLoadFromLocalStore('test-exp', '数据已经被更新之后，过期了')
          this.$vp.dialog(data)
        }, 3000)
      }, 3000)
    },
    doCacheLoadFromLocalStore() {
      const data = this.$vp.cacheLoadFromLocalStore('user', { name: 'tourist' })
      this.$vp.dialog(data, {
        showCode: true
      })
    },
    doCacheDeleteToLocalStore() {
      this.$vp.cacheSaveToLocalStore(
        'test-del',
        'delete'
      )
      this.$vp.toast(`缓存的值: ${this.$vp.cacheLoadFromLocalStore('test-del')}`)
      setTimeout(() => {
        this.$vp.cacheDeleteToLocalStore('test-del')
        const data = this.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了')
        this.$vp.dialog(data, {
          showCode: true
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
