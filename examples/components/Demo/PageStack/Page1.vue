<template>
<group title="堆栈底-第一页" label-width="15em" class="bottom-group">
  <box gap="10px 10px">
    <h2 v-if="!isEmpty(params)">初始化页面参数【params】: {{ params}}</h2>
    <h2 v-if="!isEmpty(backParams)">是个页面回传的参数【backParams】: {{backParams}}</h2>
    <x-button @click.native="next()">传递参数{{dataParams}}到下一个页面</x-button>
  </box>
  <cell-box>
    <pre v-highlightjs><code class="javascript">
// 执行代码：
import {
  paramsStack
} from 'vue-viewplus'

export default {
  mixins: [paramsStack],
  components: {
    Group,
    XButton,
    Box,
    CellBox
  },
  data() {
    return {
      stackBootom: true,
      dataParams: {
        from: 'Page1'
      }
    }
  },
  methods: {
    next() {
      this.$vp.psPageNext('/Demo/PageStack/Page2', {
        params: this.dataParams
      })
    }
  },
  created() {
    // 声明该页面是栈底部
    this.stackBootom = true
  }
}
  </code></pre>
  </cell-box>
</group>
</template>

<script type="text/ecmascript-6">
import {
  Group,
  XButton,
  Box,
  CellBox
} from 'vux'
import {
  paramsStack
} from 'vue-viewplus'
import _ from 'lodash'

export default {
  mixins: [paramsStack],
  components: {
    Group,
    XButton,
    Box,
    CellBox
  },
  data() {
    return {
      stackBootom: true,
      dataParams: {
        from: 'Page1'
      }
    }
  },
  methods: {
    next() {
      this.$vp.psPageNext('/Demo/PageStack/Page2', {
        params: this.dataParams
      })
    },
    isEmpty(params) {
      return _.isEmpty(params)
    }
  },
  created() {
    // 声明该页面是栈底部
    this.stackBootom = true
  }
}
</script>

<style lang="less" scoped>
</style>
