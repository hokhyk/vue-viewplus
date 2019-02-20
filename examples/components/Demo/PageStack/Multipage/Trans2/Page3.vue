<template>
  <div>
    <divider>交易2-page1</divider>
    <group>
      <x-input title="交易2-姓名" v-model="name"  placeholder="请输入姓名"></x-input>
    </group>
    <group>
      <x-button plain @click.native="submit">提交</x-button>
    </group>
  </div>
</template>


<script type="text/ecmascript-6">
import { paramsStack } from 'vue-viewplus'
import { Divider, XInput, Group, XButton } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
export default {
  mixins: [paramsStack],
  components: {
    XButton,
    Group,
    XInput,
    Divider
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'activePages'
    ])
  },
  methods: {
    ...mapMutations(['updateActivePages']),
    submit() {
      let curPages = Object.assign(this.activePages)
      curPages[1] = 'Trans2-Page2'
      this.updateActivePages(curPages)
      this.$vp.psPageNext('Trans2-Page2', {params: {name: this.name}})
    }
  }
}
</script>

<style lang="less" scoped>

</style>
