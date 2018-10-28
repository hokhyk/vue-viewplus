<template>
<div id="demo">
  <group>
    <group-title slot="title">用户中心</group-title>
    <box gap="10px 10px">
      <h1>登录成功了才能看到这里哦 ：）</h1>
    </box>
  </group>
</div>
</template>

<script>
import {
  Group,
  GroupTitle,
  Box
} from 'vux'

export default {
  components: {
    Group,
    GroupTitle,
    Box
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
#demo {
    .iconfont {
        margin-right: 15px;
        line-height: 24px;
        font-size: 18px;
    }
}
</style>
