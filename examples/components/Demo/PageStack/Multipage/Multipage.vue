<template>
  <div>
    <div>

    <!--<button-tab v-model="index">-->
      <!--<button-tab-item v-for="(item, index) in MenuList" :key="item.id" @on-item-click="onItemClick(item, index)">{{item.name}}</button-tab-item>-->
    <!--</button-tab>-->
    <tab>
      <tab-item :selected="isSelected()" @on-item-click="onItemClick">交易1</tab-item>
      <tab-item :selected="!isSelected()"@on-item-click="onItemClick">交易2</tab-item>
    </tab>
    <div style="padding: 15px">
      <router-view></router-view>
    </div>
      <!--<tabbar class="vux-demo-tabbar" icon-class="vux-center">-->
      <!--<tabbar-item :selected="isSelected" :link="activePages[0].url">-->
        <!--<i class="iconfont icon-zhuye" slot="icon"></i>-->
        <!--<span slot="label">交易1</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item :selected="!isSelected" :link="activePages[1].url">-->
        <!--<i class="iconfont icon-zhuye" slot="icon"></i>-->
        <!--<span slot="label">交易2</span>-->
      <!--</tabbar-item>-->
    <!--</tabbar>-->
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import { paramsStack } from 'vue-viewplus'
import { Tab, TabItem, XButton, Tabbar, TabbarItem } from 'vux'
import { mapGetters, mapMutations } from 'vuex'

export default {

  mixins: [paramsStack],
  components: {
    Tab,
    TabItem,
    XButton,
    Tabbar,
    TabbarItem
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'activePages'
    ])
  },
  methods: {
    isSelected() {
      return this.$router.currentRoute.path.indexOf('Trans1') > -1
    },
    ...mapMutations(['updateActivePages']),
    onItemClick(index) {
      console.log('onItemClick')
      let url = this.activePages[0]
      if (index === 1) {
        url = this.activePages[1]
      }
      this.$vp.psPageNext(url)
    }
  },
  created() {
    console.log('created')
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave ')
    next()
  },
  destroy() {
    console.log('destroy')
  },
  watch: {
    '$route'(to, from) {
      if (this.backState) {
        let curPages = Object.assign(this.activePages)
        if (to.meta.trsName === from.meta.trsName) {
          if (to.path.indexOf('Trans1') > -1) {
            curPages[0] = to.path
          } else {
            curPages[1] = to.path
          }
        } else {
          if (from.path.indexOf('Trans1') > -1) {
            curPages[0] = from.path
          } else {
            curPages[1] = from.path
          }
        }
        this.updateActivePages(curPages)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #multipage {
    padding: 10px 15px
  }
</style>
