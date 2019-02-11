<template>
  <div>
    <divider>交易2-page2</divider>
    <group>
      <cell title="上页面的姓名" v-model="preData.name"></cell>
    </group>
  </div>
</template>


<script type="text/ecmascript-6">
  import { paramsStack } from 'vue-viewplus'
  import { Divider, Group, Cell } from 'vux'

  export default {
    mixins: [paramsStack],
    components: {
      Cell,
      Group,
      Divider
    },
    data() {
      return {
        preData: {
          name: ''
        }
      }
    },
    methods: {
    },
    created() {
      this.preData = this.params
    }
  }
</script>

<style lang="less" scoped>

</style>
