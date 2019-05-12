<template>
  <div>
    <divider>交易1-page1</divider>
    <group>
      <x-input title="交易1-姓名" v-model="name" placeholder="请输入姓名"></x-input>
    </group>
    <box gap="15px">
      <x-button plain @click.native="submit">提交</x-button>
    </box>
  </div>
</template>


<script type="text/ecmascript-6">
import { paramsStack } from 'vue-viewplus'
import { Divider, XInput, Group, XButton, Box } from 'vux'
import { mapGetters, mapMutations } from 'vuex'

export default {
  mixins: [paramsStack],
  components: {
    XButton,
    Group,
    XInput,
    Divider,
    Box
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
      curPages[0] = 'Trans1-Page2'
      this.updateActivePages(curPages)
      this.$vp.psPageNext('Trans1-Page2', {params: {name: this.name}})
    }
  },
  created() {
  }
}
</script>

<style lang="less" scoped>
</style>
