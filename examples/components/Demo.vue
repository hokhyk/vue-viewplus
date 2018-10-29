<template>
<div id="demo">

  <group>
    <group-title slot="title">预装模块<span style="float:right;">默认加载</span></group-title>
    <cell title="params-stack" link="/Demo/PageStack/PageStack">
      <i class="iconfont icon-icon_stack" slot="icon"></i>
      <badge text="✨✨✨✨✨"></badge>
    </cell>
    <cell title="util-http" link="/Demo/UtilHttp" @click.native="show = !show">
      <i class="iconfont icon-http" slot="icon" style="font-size: 20px"></i>
      <badge text="✨✨✨✨"></badge>
    </cell>
    <cell title="js-bridge-context" link="/Demo/JsBridgeContext">
      <i class="iconfont icon-bridge" slot="icon" style="font-size: 20px"></i>
      <badge text="✨✨✨✨"></badge>
    </cell>
    <cell title="login-state-check" link="/Demo/LoginStateCheck" value="安全相关">
      <i class="iconfont icon-loginlockrefresh" slot="icon" ></i>
      <badge text="✨✨✨"></badge>
    </cell>
    <cell title="cache-userinfo" link="/Demo/CacheUserInfo">
      <i class="iconfont icon-user" slot="icon"></i>
    </cell>
    <cell title="util-cache模块" link="/Demo/UtilCache">
      <i class="iconfont icon-baocun" slot="icon" style="font-size: 20px"></i>
    </cell>
  </group>

  <group>
    <group-title slot="title">其他</group-title>
    <cell title="ViewPlus.mixin" link="/Demo/mixin">
      <i class="iconfont icon-bus" slot="icon"></i>
    </cell>
  </group>

  <router-view class="demo-child-view"></router-view>
</div>
</template>

<script>
import {
  Cell,
  Group,
  GroupTitle,
  Badge,
  Divider
} from 'vux'

export default {
  components: {
    Cell,
    Group,
    GroupTitle,
    Badge,
    Divider
  },
  data() {
    return {
      show: true
    }
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
  .weui-cell {
    font-size: 14px;
  }
  .weui-cells__title {
    margin-top: 0px;
    padding-top: 0.77em;
  }
  .demo-child-view {
    position: fixed;
    top: 46px;
    height: 100%;
    overflow-x: auto;
    width: 100%;
    background-color: #fbf9fe;
    z-index: 1000;
  }
}
</style>
