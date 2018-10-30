<template>
  <group title="模拟手机号充值 - 堆栈底-第一页" label-width="5em" class="bottom-group">
    <box gap="10px 10px">
      <x-input title="手机号" v-model="dataParams.phoneNumb"></x-input>
    </box>
    <box gap="10px 10px">
      <x-button plain @click.native="submit()">点击充值</x-button>
      <x-button plain @click.native="modify()">修改参数栈内参数对象</x-button>
    </box>
    <form-preview header-label="参数栈回显" :body-items="stackList" ></form-preview>
    <cell-box>
    <pre v-highlightjs><code class="javascript">
import demoMixin from '../demo-mixin'
import { XInput, FormPreview } from 'vux'
import { paramsStack } from 'vue-viewplus'
import _ from 'lodash'

export default {
  mixins: [paramsStack, demoMixin],
  components: {
    XInput,
    FormPreview
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
      isStackBottom: true,
      dataParams: {
        phoneNumb: ''
      }
    }
  },
  methods: {
    showStackList() {
      this.stackList[0].value = JSON.stringify(this.params, null, 2)
      if (_.has(this.params, 'phoneNumb')) {
        this.dataParams.phoneNumb = this.params.phoneNumb
      }
      this.stackList[1].value = JSON.stringify(this.backParams, null, 2)
      if (!_.isEmpty(this.backParams)) {
        this.dataParams.phoneNumb = this.backParams.phoneNumb
        this.$vp.toast(`通过 backParams.phoneNumb 预填写页面`)
      }
    },
    submit() {
      console.log('充值录入数据：', JSON.stringify(this.dataParams))
      this.$vp.psPageNext('/Demo/PageStack/Page2', {
        params: this.dataParams
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      // 由于该页面被复用，故如果需要获取到`Page2`设置的`this.backParams.phoneNumb`需要定义当前路由守卫来捕获该时机
      // 但是在当前实例中，`this.backParams`其实已经被赋值为`phoneNumb: '18888888888'`
      vm.showStackList()
    })
  },
  created() {
    console.log('this.params', this.params)
    this.showStackList()
    // 声明该页面是栈底部
    this.isStackBottom = true
  }
}
  </code></pre>
    </cell-box>
  </group>
</template>


<script type="text/ecmascript-6">
import demoMixin from '../demo-mixin'
import { XInput, FormPreview } from 'vux'
import { paramsStack } from 'vue-viewplus'
import _ from 'lodash'

export default {
  mixins: [paramsStack, demoMixin],
  components: {
    XInput,
    FormPreview
  },
  data() {
    return {
      isStackBottom: true,
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
        phoneNumb: ''
      }
    }
  },
  methods: {
    showStackList() {
      this.stackList[0].value = this.params
      if (_.has(this.params, 'phoneNumb')) {
        this.dataParams.phoneNumb = this.params.phoneNumb
      }
      if (!_.isEmpty(this.backParams)) {
        this.stackList[1].value = this.backParams
        this.dataParams.phoneNumb = this.backParams.phoneNumb
        this.$vp.dialog(`回传号码：${this.dataParams.phoneNumb}`, {
          title: '检测到回传参数'
        })
      }
    },
    submit() {
      this.$vp.psPageNext('/Demo/PageStack/Page2', {
        params: this.dataParams
      })
    },
    modify() {
      this.modifyParams({
        phoneNumb: '15111111111'
      })
      // 注:修改参数栈顶参数为响应式，但是针对下面这个方法获取和设置参数的方式，就需要重新调用才能生效
      this.showStackList()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      // 由于该页面被复用，故如果需要获取到`Page2`设置的`this.backParams.phoneNumb`需要定义当前路由守卫来捕获该时机
      // 但是在当前实例中，`this.backParams`其实已经被赋值为`phoneNumb: '13222222222'`
      vm.showStackList()
    })
  },
  created() {
    console.log('this.params', this.params)
    this.showStackList()
    // 声明该页面是栈底部
    this.isStackBottom = true
  }
}
</script>

<style lang="less" scoped>
</style>
