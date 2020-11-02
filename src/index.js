/* 
自定义shallowReactive
自定义Reactive
自定义readonly

自定义ref
自定义shallowRef
*/

const reactiveHandler = {
  get (target, prop) {
    const result = Reflect.get(target, prop)
    console.log('拦截到读取', prop, result)
    return result
  },

  set (target, prop, value) {
    const result = Reflect.set(target, prop, value)
    console.log('拦截到修改或添加属性, 准备更新界面', prop, value)
    return result
  },

  deleteProperty (target, prop) {
    const result = Reflect.deleteProperty(target, prop)
    console.log('拦截到删除属性, 准备更新界面', prop)
    return result
  }
}

/* 
自定义shallowReactive
1. target是对象或数组, 返回proxy对象
2. target是其它类型, 直接返回本身
*/
function shallowReactive(target) {
  // 1. target是对象或数组, 返回proxy对象
  if (target && typeof target==='object') {
    return new Proxy(target, reactiveHandler)
  } 
  // 2. target是其它类型, 直接返回本身
  return target
}


/* 
自定义reactive
1. target是对象或数组, 返回proxy对象
2. target是其它类型, 直接返回本身
3. 对内部包含的所有对象/数组创建对应的proxy对象
*/
function reactive(target) {
  // 1. target是对象或数组, 返回proxy对象
  if (target && typeof target==='object') {
    
    // 对对象或数组中所有数据进行reactive的递归处理

    // 如果target是数组
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = reactive(item)
      })
    } else { // 如果target是对象
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    
    return new Proxy(target, reactiveHandler)
  } 
  // 2. target是其它类型, 直接返回本身
  return target
}

