<template>
<div id="js-components">
  <grid :cols="3">
    <grid-item link="/Demo/JsComponents/uiToasts" label="uiToasts">
      <i class="iconfont icon-cafe" slot="icon"></i>
    </grid-item>
    <grid-item link="/Demo/JsComponents/uiDialog" label="uiDialog">
      <i class="iconfont icon-cafe" slot="icon"></i>
    </grid-item>
    <grid-item link="/Demo/JsComponents/uiConfirm" label="uiConfirm">
      <i class="iconfont icon-cafe" slot="icon"></i>
    </grid-item>
    <grid-item link="/Demo/JsComponents/uiLoading" label="uiLoading">
      <i class="iconfont icon-cafe" slot="icon"></i>
    </grid-item>
  </grid>
  <router-view class="jscompinents-child-view">
  </router-view>
</div>
</template>

<script>
import {
  Cell,
  Group,
  GroupTitle,
  Grid,
  GridItem,
  Badge,
  Divider
} from 'vux'

export default {
  components: {
    Grid,
    GridItem,
    Cell,
    Group,
    GroupTitle,
    Badge,
    Divider
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.weui-grid__label {
    line-height: 22px;
}
#js-components {
    .iconfont {
        margin-right: 15px;
        line-height: 24px;
        font-size: 22px;
    }
  .jscompinents-child-view {
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
