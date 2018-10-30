<template>
  <group label-width="15em" class="bottom-group">
    <form-preview header-label="请确认订单信息" :body-items="list" ></form-preview>
    <x-input title="请输出充值金额" v-model="dataParams.amount" style="margin-top: 10px"></x-input>
    <box gap="10px 10px">
      <flexbox>
        <flexbox-item>
          <x-button type="default" @click.native="replace()">确认</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="default" @click.native="bck()">返回(回传参数)</x-button>
        </flexbox-item>
      </flexbox>
    </box>
    <form-preview header-label="参数栈回显" :body-items="stackList" ></form-preview>
    <cell-box>
      <pre v-highlightjs><code class="javascript">
import demoMixin from '../demo-mixin'
import { paramsStack } from 'vue-viewplus'
import { XInput, FormPreview, Flexbox, FlexboxItem } from 'vux'

export default {
  mixins: [paramsStack, demoMixin],
  components: {
    FormPreview,
    Flexbox,
    FlexboxItem,
    XInput
  },
  data() {
    return {
      list: [
        {
          label: '手机号',
          value: ''
        }
      ],
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
      dataParams: {
        phoneNumb: '',
        amount: '50元'
      }
    }
  },
  methods: {
    showStackList() {
      console.log('this.params', this.params)
      console.log('this.backParams', JSON.stringify(this.backParams))
      this.stackList[0].value = this.params
      this.stackList[1].value = this.backParams
    },
    /**
     * 如果需要下一个页面点击返回，任然要回显当前页面，就调用该方法
     * /
    next() {
      // 推荐
      this.$vp.psPageNext('/Demo/PageStack/Page4', { params: this.dataParams })
    },
    /**
     * 一般确认页面都无需被“保留”，故这里使用`this.$vp.psPageReplace`接口完成跳转，底层将会使用
     * `router.replace({location})`完成跳转
     */
    replace() {
      console.log('充值确认数据：', JSON.stringify(this.dataParams))
      this.$vp.psPageReplace('/Demo/PageStack/Page4', {params: this.dataParams})
    },
    bck() {
      this.$vp.psPageGoBack({
        backParams: {
          phoneNumb: '13222222222'
        }
      })
    }
  },
  created() {
    this.showStackList()
    this.list[0].value = this.params.phoneNumb
    this.dataParams.phoneNumb = this.params.phoneNumb
  }
}
      </code></pre>
    </cell-box>
  </group>
</template>

<script type="text/ecmascript-6">
import demoMixin from '../demo-mixin'
import { paramsStack } from 'vue-viewplus'
import { XInput, FormPreview, Flexbox, FlexboxItem } from 'vux'

export default {
  mixins: [paramsStack, demoMixin],
  components: {
    FormPreview,
    Flexbox,
    FlexboxItem,
    XInput
  },
  data() {
    return {
      list: [
        {
          label: '手机号',
          value: ''
        }
      ],
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
      dataParams: {
        phoneNumb: '',
        amount: '50元'
      }
    }
  },
  methods: {
    showStackList() {
      console.log('this.params', this.params)
      console.log('this.backParams', JSON.stringify(this.backParams))
      this.stackList[0].value = this.params
      this.stackList[1].value = this.backParams
    },
    /**
     * 如果需要下一个页面点击返回，任然要回显当前页面，就调用该方法
     * /
    next() {
      // 不推荐
      // this.setParams(this.dataParams)
      // this.$vp.pageNext('/Demo/PageStack/Page3')
      // 推荐
      this.$vp.psPageNext('/Demo/PageStack/Page4', { params: this.dataParams })
    },
    /**
     * 一般确认页面都无需被“保留”，故这里使用`this.$vp.psPageReplace`接口完成跳转，底层将会使用
     * `router.replace({location})`完成跳转
     */
    replace() {
      console.log('充值确认数据：', JSON.stringify(this.dataParams))
      this.$vp.psPageReplace('/Demo/PageStack/Page4', {params: this.dataParams})
    },
    bck() {
      this.$vp.psPageGoBack({
        backParams: {
          phoneNumb: '13222222222'
        }
      })
    }
  },
  created() {
    this.showStackList()
    this.list[0].value = this.params.phoneNumb
    this.dataParams.phoneNumb = this.params.phoneNumb
  }
}
</script>

<style lang="less" scoped>
</style>
