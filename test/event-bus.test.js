import EventBus from '../src/vp/event-bus'
import Vue from 'vue'
import { PLUGIN_VM_PREFIX_EVENTBUS } from '../src/gloabl-dict'

/* eslint-disable no-undef */
beforeAll(() => {
  process.env.NODE_ENV = 'production'
})

afterAll(function () {
  process.env.NODE_ENV = 'test'
})

describe('event-bus 测试套件', () => {
  it('安装测试测试', () => {
    Vue.use(EventBus, {
      eventBus: {
        installed() {
          const bus = Vue.prototype[PLUGIN_VM_PREFIX_EVENTBUS]
          expect(!!bus).toBe(true)
          spyOn(bus, '$on')
          bus.$on('id-selected', function (id) {
            console.log(`slected ${id}`)
          })
          expect(bus.$on).toHaveBeenCalled()
          spyOn(bus, '$emit')
          bus.$emit('id-selected', 1)
          expect(bus.$emit).toHaveBeenCalled()
        }
      }
    })
  })
})
