import { info } from './warn'
import _ from 'lodash'

export function callFunc(action, ...args) {
  if (_.isFunction(action)) {
    return this::action(...args)
  }
}

export function callFunc2(action, defMsg = `待调用的action:[${action}]是一个无效函数！`, ...args) {
  if (_.isFunction(action)) {
    return this::action(...args)
  } else {
    info(defMsg)
  }
}
