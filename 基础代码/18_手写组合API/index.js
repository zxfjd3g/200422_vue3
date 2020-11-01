/* 
自定义shallowReactive
自定义Reactive
自定义readonly

自定义ref
自定义shallowRef
*/

const reactiveHandler = {
  get (target, prop) {
    if (prop==='_is_reactive') {
      return true
    }

    const value = Reflect.get(target, prop)
    console.log('读取数据1', prop, value)
    return value
  },

  set (target, prop, value) {
    const result = Reflect.set(target, prop, value) 
    console.log('数据已更新, 去更新界面', prop, value)
    return result
  },

  deleteProperty (target, prop) {
    const result = Reflect.deleteProperty(target, prop)
    console.log('数据已删除, 去更新界面', prop)
    return result
  }
}
const readonlyHandler = {
  get (target, prop) {

    if (prop==='_is_readonly') {
      return true
    }

    const value = Reflect.get(target, prop)
    console.log('读取数据2', prop, value)
    return value
  },

  set (target, prop, value) {
    console.warn('只读的, 不能修改')
    return true
  },

  deleteProperty (target, prop) {
    console.warn('只读的, 不能删除')
    return true
  }
}

function shallowReactive (target) {
  if (target && typeof target==='object') {
    return new Proxy(target, reactiveHandler)
  }
  return target
}

function reactive(target) {
  if (target && typeof target==='object') {
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = reactive(item)
      })
    } else {
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target, reactiveHandler)
  }

  // 如果不是对象或数组, 直接返回
  return target
}

function shallowReadonly (target) {
  if (target && typeof target==='object') {
    return new Proxy(target, readonlyHandler)
  }
  // 如果不是对象或数组, 直接返回
  return target
}


function readonly(target) {
  if (target && typeof target==='object') {
    if (Array.isArray(target)) {
      // 递归处理数组中所有元素
      target.forEach((item, index) => {
        target[index] = readonly(item)
      })
    } else {
      // 递归处理对象中所有属性
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }
    return new Proxy(target, readonlyHandler)
  }
  // 如果不是对象或数组, 直接返回
  return target
}


function shallowRef (target) {

  return {
    _value: target,
    _is_ref: true, // 是ref对象
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
      console.log('set value 数据已更新, 去更新界面')
    }
  }
}


function ref (target) {
  if (target && typeof target==='object') {
    target = reactive(target)
  }

  return {
    _value: target,
    _is_ref: true, // 是ref对象
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
      console.log('set value 数据已更新, 去更新界面')
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