<template>
  <div>
    <msg title="操作成功" :description="description" :buttons="buttons"></msg>
    <group title="堆栈-第三页" label-width="15em">
      <form-preview header-label="参数栈回显" :body-items="stackList" ></form-preview>
      <cell-box>
    <pre v-highlightjs><code class="javascript">
    </code></pre>
      </cell-box>
    </group>
  </div>

</template>

<script type="text/ecmascript-6">
  import demoMixin from '../demo-mixin'
  import { paramsStack } from 'vue-viewplus'
  import { FormPreview, Msg } from 'vux'

  export default {
    mixins: [paramsStack, demoMixin],
    components: {
      FormPreview,
      Msg
    },
    data() {
      return {
        stackList: [
          {
            label: 'params',
            value: {}
          },
          {
            label: 'backParams',
            value: {}
          }
        ],
        description: '',
        buttons: [{
          type: 'primary',
          text: '在做一笔',
          onClick: ((that) => {
            return () => {
              that.next()
            }
          })(this)
        }, {
          type: 'default',
          text: '完成',
          onClick: ((that) => {
            return () => {
              // 返回指定页面，并清空参数栈
              // that.$vp.psPageGoBack({
              //   backPopPageNumbs: -2,
              //   clearParamsStack: true
              // })
              that.$vp.psPageNext('/Demo', {
                clearParamsStack: true,
                backState: true
              })
            }
          })(this)
        }]
      }
    },
    methods: {
      showStackList() {
        this.stackList[0].value = this.params
        this.stackList[1].value = this.backParams
      },
      /**
       * 返回栈顶页面
       */
      next(backPopPageNumbs = -1) {
        this.$vp.psPageGoBack({
          backPopPageNumbs,
          backParams: {
            phoneNumb: '13444444444'
          }
        })
      }
    },
    created() {
      this.showStackList()
      this.description = `${this.params.phoneNumb} 成功充值 ${this.params.amount}`
      // 推荐使用this.$vp.psGoBack写法
      // this.bckNumbs = -2 // -> page1
      // this.bckNumbs = -1 // -> page2
    }
  }
</script>

<style lang="less" scoped>
</style>
