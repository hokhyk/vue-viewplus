<template>
  <div id="UtilCache">
    <group class="desc-group">
      <box gap="10px 10px">
        <p class="title">util-cache.js缓存模块，为插件的其他模块提供缓存支持</p>
        <span class="hint-msg">使用<a href="https://github.com/WQTeam/web-storage-cache">web-storage-cache</a>做底层支持，从而支持在缓存的时候设置被缓存对象的超时时间</span>
        <ul class="hint-msg">
          <li>1. 如防止页面在刷新之后vuex数据状态不能保持，有了缓存模块，我们就可以从缓存中恢复state中的值；</li>
          <li>2. 注意关于超时控制，你可能去控制台查看数据的时候发现，设置了exp的数据在超时的时候还存在，那是因为`web-storage-cache`底层是将判断放在程序中控制的，也就是说如果你load出来的是一个程序判断依据超时的数据，那么`web-storage-cache`才会将其delete</li>
          <li>3. 时间有限，以下示例只写了针对`cacheXXXLocalStorage`的个别常用方法，针对Session Storage也具有相同的方法，这里就不再写了，每个对应的接口定义都是一样的，如果你在使用中遇到问题，欢迎拍砖。</li>
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
  this.$vp.uiDialog(data, {
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
      this.$vp.uiDialog(data)
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
  this.$vp.uiToast(`缓存的值: ${this.$vp.cacheLoadFromLocalStore('test-del')}`)
  setTimeout(() => {
    this.$vp.cacheDeleteToLocalStore('test-del')
    const data = this.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了')
    this.$vp.uiDialog(data, {
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
          this.$vp.uiDialog(data)
        }, 3000)
      }, 3000)
    },
    doCacheLoadFromLocalStore() {
      const data = this.$vp.cacheLoadFromLocalStore('user', { name: 'tourist' })
      this.$vp.uiDialog(data, {
        showCode: true
      })
    },
    doCacheDeleteToLocalStore() {
      this.$vp.cacheSaveToLocalStore(
        'test-del',
        'delete'
      )
      this.$vp.uiToast(`缓存的值: ${this.$vp.cacheLoadFromLocalStore('test-del')}`)
      setTimeout(() => {
        this.$vp.cacheDeleteToLocalStore('test-del')
        const data = this.$vp.cacheLoadFromLocalStore('test-del', '数据已经删除了')
        this.$vp.uiDialog(data, {
          showCode: true
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
