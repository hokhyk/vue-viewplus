<template>
<div>
  <div class="center">
    <icon name="logo" scale="10"></icon>
    <p class="vux-notice">v{{version}}</p>
  </div>
  <group>
    <cell title="示例" link="/Demo">
      <i class="iconfont icon-demoon" slot="icon"></i>
    </cell>
    <cell title="Github" link="https://gitee.com/zhaojinos/vue-viewplus" value="去点个赞！">
      <i class="iconfont icon-github" slot="icon"></i>
    </cell>
  </group>
  <br>
  <p class="vue-version">current vue version: {{ vueVersion }}</p>
</div>
</template>

<script>
import {
  Cell,
  Group,
  Badge,
  Divider
} from 'vux'

const pkg = require('../../package.json')
const version = pkg.version
const vueVersion = pkg.devDependencies.vue

export default {
  components: {
    Cell,
    Group,
    Badge,
    Divider
  },
  data() {
    return {
      version,
      vueVersion
    }
  }
}
</script>

<style scoped>
.vue-version {
  text-align: center;
  font-size: 12px;
  color: #ccc;
}

.center {
  margin-top: 15px;
  text-align: center;
}

.vux-notice {
  color: #666;
  line-height: 40px;
}

.iconfont {
  margin-right: 15px;
  line-height: 24px;
  font-size: 18px;
}

.weui-cell {
  font-size: 14px;
}
</style>
