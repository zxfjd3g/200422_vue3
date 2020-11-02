/* 
自定义shallowReactive
自定义Reactive
自定义shallowReadonly
自定义readonly

自定义shallowRef
自定义ref
*/

const reactiveHandler = {
  get (target, prop) {
    if (prop==='_is_reactive') return true

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

const readonlyHandler = {
  get (target, prop) {

    if (prop==='_is_readonly') return true

    const result = Reflect.get(target, prop)
    console.log('拦截到读取', prop, result)
    return result
  },

  set () {
    console.warn('只读的, 不能修改')
    return true
  },

  deleteProperty () {
    console.warn('只读的, 不能删除')
    return true
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

/* 
自定义readonly
自定义shallowReadonly
1. 本质是只读的reactive
*/
function shallowReadonly(target) {
  if (target && typeof target==='object') {
    return new Proxy(target, readonlyHandler)
  } 
  return target
}

function readonly(target) {
  // 1. target是对象或数组, 返回proxy对象
  if (target && typeof target==='object') {
    
    // 对对象或数组中所有数据进行reactive的递归处理

    // 如果target是数组
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = readonly(item)
      })
    } else { // 如果target是对象
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }
    
    return new Proxy(target, readonlyHandler)
  } 
  // 2. target是其它类型, 直接返回本身
  return target
}

/* 
自定义shallowRef
自定义ref
*/
function shallowRef(target) {
  return {
    _value: target, // 内部保存数据的属性
    _is_ref: true,  // 标识当前对象是一个ref对象

    get value () {
      console.log('劫持到读取数据')
      return this._value  // 返回内部保存的数据
    },

    set value (val) {
      this._value = val
      console.log('劫持到了设置新的value值, 准备去更新界面', val)
    }
  }
}

function ref(target) {

  // 先对目标数据进行reactive处理, 如果是对象或者数组返回的是proxy对象
  target = reactive(target)

  return {
    _value: target, // 内部保存数据的属性
    _is_ref: true,  // 标识当前对象是一个ref对象
    get value () {
      console.log('劫持到读取数据')
      return this._value  // 返回内部保存的数据
    },

    set value (val) {
      this._value = val
      console.log('劫持到了设置新的value值, 准备去更新界面', val)
    }
  }
}



/* 
判断是否是ref对象
*/
function isRef(obj) {
  return obj && obj._is_ref
}

/* 
判断是否是reactive对象
*/
function isReactive(obj) {
  return obj && obj._is_reactive
}

/* 
判断是否是readonly对象
*/
function isReadonly(obj) {
  return obj && obj._is_readonly
}

/* 
是否是reactive或readonly产生的代理对象
*/
function isProxy (obj) {
  return isReactive(obj) || isReadonly(obj)
}
