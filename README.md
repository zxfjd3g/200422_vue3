## 1. 认识Vue3

### 1) 了解相关信息

- 2年多开发, 100+位贡献者, 2600+次提交, 600+次PR
- ***Vue3支持vue2的大多数特性***
- ***更好的支持Typescript***



### 2) 性能提升:

- 打包大小减少41%
- 初次渲染快55%, 更新渲染快133%
- 内存减少54%
- ***使用Proxy代替defineProperty实现数据响应式***
- ***重写虚拟DOM的实现和Tree-Shaking***



### 3) *Composition(组合) API*    Option API

- setup
- ref 和 reactive
- computed 和 watch
- 新的生命周期函数
- provide与inject
- ...



### 4) 其它新增特性

-  Fragment - 文档碎片
-  Teleport - 瞬移组件的位置
-  Suspense - 异步加载组件的loading界面
-  全局API的修改



## 2. 创建vue3项目

### 1) 使用 vue-cli 创建

文档: https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project
```

然后的步骤

- Please pick a preset - 选择 ***Manually select features***
- Check the features needed for your project - 多选择上 ***TypeScript*** ，特别注意点空格是选择，点回车是下一步
- Choose a version of Vue.js that you want to start the project with - 选择 ***3.x (Preview)***
- Use class-style component syntax - 直接回车
- Use Babel alongside TypeScript - 直接回车
- Pick a linter / formatter config - 直接回车
-  Use history mode for router? - 直接回车
- Pick a linter / formatter config - 直接回车
- Pick additional lint features - 直接回车
- Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
- Save this as a preset for future projects? - 直接回车

### 2) 使用 vite 创建

- 文档: https://v3.cn.vuejs.org/guide/installation.html

- vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，
- 它做到了***本地快速开发启动***, 在生产环境下基于 Rollup 打包。
  - 快速的冷启动，不需要等待打包操作；
  - 即时的热模块更新，替换性能和模块数量的解耦让更新飞起；
  - 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```



## 3. Composition API(常用部分)

文档: 

​	https://composition-api.vuejs.org/zh/api.html

### 1) setup

- 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
- 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

### 2) ref

- 作用: 定义一个数据的响应式
- 语法: const xxx = ref(initValue): 
  - 创建一个包含响应式数据的引用(reference)对象
  - js中操作数据: xxx.value
  - 模板中操作数据: 不需要.value
-  一般用来定义一个基本类型的响应式数据



```vue
<template>
  <h2>{{count}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
import {
  ref
} from 'vue'
export default {

  /* 在Vue3中依然可以使用data和methods配置, 但建议使用其新语法实现 */
  // data () {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   update () {
  //     this.count++
  //   }
  // }

  /* 使用vue3的composition API */
  setup () {

    // 定义响应式数据 ref对象
    const count = ref(1)
    console.log(count)

    // 更新响应式数据的函数
    function update () {
      // alert('update')
      count.value = count.value + 1
    }

    return {
      count,
      update
    }
  }
}
</script>
```

### 3) reactive

- 作用: 定义多个数据的响应式
- const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
- 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

```vue
<template>
  <h2>name: {{state.name}}</h2>
  <h2>age: {{state.age}}</h2>
  <h2>wife: {{state.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
/* 
reactive: 
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
import {
  reactive,
} from 'vue'
export default {
  setup () {
    /* 
    定义响应式数据对象
    */
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    console.log(state, state.wife)

    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }

    return {
      state,
      update,
    }
  }
}
</script>
```



### 4) 比较Vue2与Vue3的响应式(重要)

#### vue2的响应式

- 核心: 
  - 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

```js
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```

- 问题
  - 对象直接新添加的属性或删除已有属性, 界面不会自动更新
  - 直接通过下标替换元素或更新length, 界面不会自动更新   arr[1] = {}

#### Vue3的响应式

- 核心: 
  - 通过Proxy(代理):  拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
  - 通过 Reflect(反射):  动态对被代理对象的相应属性进行特定的操作
  - 文档:
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

```js
new Proxy(data, {
	// 拦截读取属性值
    get (target, prop) {
    	return Reflect.get(target, prop)
    },
    // 拦截设置属性值或添加新属性
    set (target, prop, value) {
    	return Reflect.set(target, prop, value)
    },
    // 拦截删除属性
    deleteProperty (target, prop) {
    	return Reflect.deleteProperty(target, prop)
    }
})

proxy.name = 'tom'   
```



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxy 与 Reflect</title>
</head>
<body>
  <script>
    
    const user = {
      name: "John",
      age: 12
    };

    /* 
    proxyUser是代理对象, user是被代理对象
    后面所有的操作都是通过代理对象来操作被代理对象内部属性
    */
    const proxyUser = new Proxy(user, {

      get(target, prop) {
        console.log('劫持get()', prop)
        return Reflect.get(target, prop)
      },

      set(target, prop, val) {
        console.log('劫持set()', prop, val)
        return Reflect.set(target, prop, val); // (2)
      },

      deleteProperty (target, prop) {
        console.log('劫持delete属性', prop)
        return Reflect.deleteProperty(target, prop)
      }
    });
    // 读取属性值
    console.log(proxyUser===user)
    console.log(proxyUser.name, proxyUser.age)
    // 设置属性值
    proxyUser.name = 'bob'
    proxyUser.age = 13
    console.log(user)
    // 添加属性
    proxyUser.sex = '男'
    console.log(user)
    // 删除属性
    delete proxyUser.sex
    console.log(user)
  </script>
</body>
</html>
```



### 5) setup细节

- setup执行的时机
  - 在beforeCreate之前执行(一次), 此时组件对象还没有创建
  - this是undefined, 不能通过this来访问data/computed/methods / props
  - 其实所有的composition API相关回调函数中也都不可以

- setup的返回值
  - 一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
  - 返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
  - 返回对象中的方法会与methods中的方法合并成功组件对象的方法
  - 如果有重名, setup优先
  -  注意: 
    -  一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
    - setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据

- setup的参数
  - setup(props, context) / setup(props, {attrs, slots, emit})
  - props: 包含props配置声明且传入了的所有属性的对象
  - attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
  - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
  - emit: 用来分发自定义事件的函数, 相当于 this.$emit

```vue
<template>
  <h2>App</h2>
  <p>msg: {{msg}}</p>
  <button @click="fn('--')">更新</button>

  <child :msg="msg" msg2="cba" @fn="fn"/>
</template>

<script lang="ts">
import {
  reactive,
  ref,
} from 'vue'
import child from './child.vue'

export default {

  components: {
    child
  },

  setup () {
    const msg = ref('abc')

    function fn (content: string) {
      msg.value += content
    }
    return {
      msg,
      fn
    }
  }
}
</script>
```

```vue
<template>
  <div>
    <h3>{{n}}</h3>
    <h3>{{m}}</h3>

    <h3>msg: {{msg}}</h3>
    <h3>msg2: {{$attrs.msg2}}</h3>

    <slot name="xxx"></slot>

    <button @click="update">更新</button>
  </div>
</template>

<script lang="ts">

import {
  ref,
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'child',

  props: ['msg'],

  emits: ['fn'], // 可选的, 声明了更利于程序员阅读, 且可以对分发的事件数据进行校验

  data () {
    console.log('data', this)
    return {
      // n: 1
    }
  },

  beforeCreate () {
    console.log('beforeCreate', this)
  },

  methods: {
    // update () {
    //   this.n++
    //   this.m++
    // }
  },

  // setup (props, context) {
  setup (props, {attrs, emit, slots}) {

    console.log('setup', this)
    console.log(props.msg, attrs.msg2, slots, emit)

    const m = ref(2)
    const n = ref(3)

    function update () {
      // console.log('--', this)
      // this.n += 2 
      // this.m += 2

      m.value += 2
      n.value += 2

      // 分发自定义事件
      emit('fn', '++')
    }

    return {
      m,
      n,
      update,
    }
  },
})
</script>
```



### 6) reactive与ref-细节

-  是Vue3的 composition API中2个最重要的响应式API
-  ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
-  如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
-  ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
-  reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
-  ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

```vue
<template>
  <h2>App</h2>
  <p>m1: {{m1}}</p>
  <p>m2: {{m2}}</p>
  <p>m3: {{m3}}</p>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import {
  reactive,
  ref
} from 'vue'

export default {

  setup () {
    const m1 = ref('abc')
    const m2 = reactive({x: 1, y: {z: 'abc'}})

    // 使用ref处理对象  ==> 对象会被自动reactive为proxy对象
    const m3 = ref({a1: 2, a2: {a3: 'abc'}})
    console.log(m1, m2, m3)
    console.log(m3.value.a2) // 也是一个proxy对象

    function update() {
      m1.value += '--'
      m2.x += 1
      m2.y.z += '++'

      m3.value = {a1: 3, a2: {a3: 'abc---'}}
      m3.value.a2.a3 += '==' // reactive对对象进行了深度数据劫持
      console.log(m3.value.a2)
    }

    return {
      m1,
      m2,
      m3,
      update
    }
  }
}
</script>

```




### 7) 计算属性与监视

- computed函数: 
  - 与computed配置功能一致
  - 只有getter
  - 有getter和setter

- watch函数
  -  与watch配置功能一致
  -  监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
  -  默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
  -  通过配置deep为true, 来指定深度监视

- watchEffect函数
  - 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
  - 监视数据发生变化时回调

```vue
<template>
  <h2>App</h2>
  fistName: <input v-model="user.firstName"/><br>
  lastName: <input v-model="user.lastName"/><br>
  fullName1: <input v-model="fullName1"/><br>
  fullName2: <input v-model="fullName2"><br>
  fullName3: <input v-model="fullName3"><br>

</template>

<script lang="ts">
/*
计算属性与监视
1. computed函数: 
  与computed配置功能一致
  只有getter
  有getter和setter
2. watch函数
  与watch配置功能一致
  监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
  默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
  通过配置deep为true, 来指定深度监视
3. watchEffect函数
  不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  默认初始时就会执行第一次, 从而可以收集需要监视的数据
  监视数据发生变化时回调
*/

import {
  reactive,
  ref,
  computed,
  watch,
  watchEffect
} from 'vue'

export default {

  setup () {
    const user = reactive({
      firstName: 'A',
      lastName: 'B'
    })

    // 只有getter的计算属性
    const fullName1 = computed(() => {
      console.log('fullName1')
      return user.firstName + '-' + user.lastName
    })

    // 有getter与setter的计算属性
    const fullName2 = computed({
      get () {
        console.log('fullName2 get')
        return user.firstName + '-' + user.lastName
      },

      set (value: string) {
        console.log('fullName2 set')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })

    const fullName3 = ref('')

    /* 
    watchEffect: 监视所有回调中使用的数据
    */
    /* 
    watchEffect(() => {
      console.log('watchEffect')
      fullName3.value = user.firstName + '-' + user.lastName
    }) 
    */

    /* 
    使用watch的2个特性:
      深度监视
      初始化立即执行
    */
    watch(user, () => {
      fullName3.value = user.firstName + '-' + user.lastName
    }, {
      immediate: true,  // 是否初始化立即执行一次, 默认是false
      deep: true, // 是否是深度监视, 默认是false
    })

    /* 
    watch一个数据
      默认在数据发生改变时执行回调
    */
    watch(fullName3, (value) => {
      console.log('watch')
      const names = value.split('-')
      user.firstName = names[0]
      user.lastName = names[1]
    })

    /* 
    watch多个数据: 
      使用数组来指定
      如果是ref对象, 直接指定
      如果是reactive对象中的属性,  必须通过函数来指定
    */
    watch([() => user.firstName, () => user.lastName, fullName3], (values) => {
      console.log('监视多个数据', values)
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
}
</script>

```



### 8) 生命周期

#### vue2.x的生命周期

![lifecycle_2](.\images\lifecycle_2.png)

#### vue3的生命周期

![lifecycle_3](.\images\lifecycle_3.png)

**与 2.x 版本生命周期相对应的组合式 API**

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

**新增的钩子函数**

组合式 API 还提供了以下调试钩子函数：

- onRenderTracked
- onRenderTriggered

```vue
<template>
<div class="about">
  <h2>msg: {{msg}}</h2>
  <hr>
  <button @click="update">更新</button>
</div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted, 
  onBeforeMount, 
  onBeforeUpdate,
  onBeforeUnmount
} from "vue"

export default {
  beforeCreate () {
    console.log('beforeCreate()')
  },

  created () {
    console.log('created')
  },

  beforeMount () {
    console.log('beforeMount')
  },

  mounted () {
    console.log('mounted')
  },

  beforeUpdate () {
    console.log('beforeUpdate')
  },

  updated () {
    console.log('updated')
  },

  beforeUnmount () {
    console.log('beforeUnmount')
  },

  unmounted () {
     console.log('unmounted')
  },
  

  setup() {
    
    const msg = ref('abc')

    const update = () => {
      msg.value += '--'
    }

    onBeforeMount(() => {
      console.log('--onBeforeMount')
    })

    onMounted(() => {
      console.log('--onMounted')
    })

    onBeforeUpdate(() => {
      console.log('--onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('--onUpdated')
    })

    onBeforeUnmount(() => {
      console.log('--onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('--onUnmounted')
    })
    
    return {
      msg,
      update
    }
  }
}
</script>

```

```vue
<template>
  <h2>App</h2>
  <button @click="isShow=!isShow">切换</button>
  <hr>
  <Child v-if="isShow"/>
</template>

<script lang="ts">
import Child from './Child.vue'
export default {

  data () {
    return {
      isShow: true
    }
  },

  components: {
    Child
  }
}
</script>

```



### 09) 自定义hook函数



- 使用Vue3的组合API封装的可复用的功能函数

- 自定义hook的作用类似于vue2中的mixin技术

- 自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂

- 需求1: 收集用户鼠标点击的页面坐标

  hooks/useMousePosition.ts

```js
import { ref, onMounted, onUnmounted } from 'vue'
/* 
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition () {
  // 初始化坐标数据
  const x = ref(-1)
  const y = ref(-1)

  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })

  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })

  return {x, y}
}
```



```vue
<template>
<div>
  <h2>x: {{x}}, y: {{y}}</h2>
</div>
</template>

<script>

import {
  ref
} from "vue"
/* 
在组件中引入并使用自定义hook
自定义hook的作用类似于vue2中的mixin技术
自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
*/
import useMousePosition from './hooks/useMousePosition'

export default {
  setup() {

    const {x, y} = useMousePosition()

    return {
      x,
      y,
    }
  }
}
</script>
```



- 利用TS泛型强化类型检查

- 需求2: 封装发ajax请求的hook函数 

  hooks/useRequest.ts

```ts
import { ref } from 'vue'
import axios from 'axios'

/* 
使用axios发送异步ajax请求
*/
export default function useUrlLoader<T>(url: string) {

  const result = ref<T | null>(null)
  const loading = ref(true)
  const errorMsg = ref(null)

  axios.get(url)
    .then(response => {
      loading.value = false
      result.value = response.data
    })
    .catch(e => {
      loading.value = false
      errorMsg.value = e.message || '未知错误'
    })

  return {
    loading,
    result,
    errorMsg,
  }
}
```



```vue
<template>
<div class="about">
  <h2 v-if="loading">LOADING...</h2>
  <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
  <!-- <ul v-else>
    <li>id: {{result.id}}</li>
    <li>name: {{result.name}}</li>
    <li>distance: {{result.distance}}</li>
  </ul> -->

  <ul v-for="p in result" :key="p.id">
    <li>id: {{p.id}}</li>
    <li>title: {{p.title}}</li>
    <li>price: {{p.price}}</li>
  </ul>
  <!-- <img v-if="result" :src="result[0].url" alt=""> -->
</div>
</template>

<script lang="ts">
import {
  watch
} from "vue"
import useRequest from './hooks/useRequest'

// 地址数据接口
interface AddressResult {
  id: number;
  name: string;
  distance: string;
}

// 产品数据接口
interface ProductResult {
  id: string;
  title: string;
  price: number;
}

export default {
  setup() {

    // const {loading, result, errorMsg} = useRequest<AddressResult>('/data/address.json')
    const {loading, result, errorMsg} = useRequest<ProductResult[]>('/data/products.json')

    watch(result, () => {
      if (result.value) {
        console.log(result.value.length) // 有提示
      }
    })

    return {
      loading,
      result, 
      errorMsg
    }
  }
}
</script>

```



### 10) toRefs

 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref 

 应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

问题: reactive 对象取出的所有属性值都是非响应式的

解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性

```vue
<template>
  <h2>App</h2>
  <p>{{foo}}</p>
  <p>{{bar}}</p>

  <p>{{foo2}}</p>
  <p>{{bar2}}</p>
</template>

<script lang="ts">
/*
toRefs:
  将响应式对象中所有属性包装为ref对象, 并返回包含这些ref对象的普通对象
  应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
*/

import {
  reactive,
  toRefs,
} from 'vue'

export default {

  setup () {

    const state = reactive({
      foo: 1,
      bar: 2
    })

    const stateAsRefs = toRefs(state)

    // ref 和 原始property “链接”
    state.foo++
    console.log(stateAsRefs.foo.value) // 2

    stateAsRefs.foo.value++
    console.log(state.foo) // 3

    // 直接解构出的每个变量都是ref响应式数据
    const {foo2, bar2} = useFeatureX()

    
    return {
      // ...state,
      ...stateAsRefs,
      foo2, 
      bar2
    }
  },
}

function useFeatureX() {
  const state = reactive({
    foo2: 1,
    bar2: 2
  })

  // 逻辑运行状态
  setTimeout(() => {
    state.foo2++
    state.bar2++
  }, 2000);

  // 返回时转换为ref
  return toRefs(state)
}

</script>

```



### 11) ref获取元素

利用ref函数获取组件中的标签元素

功能需求: 让输入框自动获取焦点

```vue
<template>
  <h2>App</h2>
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
/* 
ref获取元素: 利用ref函数获取组件中的标签元素
功能需求: 让输入框自动获取焦点
*/
import {
  ref,
  onMounted
} from 'vue'

export default {
  setup() {
    const inputRef = ref<HTMLElement|null>(null)

    onMounted(() => {
      inputRef.value && inputRef.value.focus()
    })

    return {
      inputRef
    }
  },
}
</script>

```



## 4. Composition API(其它部分)

### 1) readonly 与 shallowReadonly

- readonly: 
  - 深度只读数据
  -  获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  -  只读代理是深层的：访问的任何嵌套 property 也是只读的。
- shallowReadonly
  - 浅只读数据
  - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 
- 应用场景: 
  - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

```vue
<template>
  <h2>App</h2>
  <p>{{count1}}</p>
  <p>{{copy}}</p>

  <p>{{state}}</p>
  <p>{{copy2}}</p>

  <p>{{copy3}}</p>

  <p>{{state3}}</p>

</template>

<script lang="ts">
/*
readonly: 深度只读数据
  获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  只读代理是深层的：访问的任何嵌套 property 也是只读的。
shallowReadonly: 浅只读数据
  创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 
应用场景: 
  在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
*/

import {
  reactive,
  ref,
  readonly,
  shallowReadonly,
  isReadonly,
} from 'vue'

export default {

  setup () {
    const count1 = ref(1)
    const copy = readonly(count1)
    // console.log(count1, copy)

    const state = reactive({a: {b: 2}})
    const copy2 = readonly(state)
    console.log(state, copy2)

    const copy3 = readonly({x: {y: 3}})
    console.log(copy3)

    setTimeout(() => {
      // count1.value += 1
      // copy.value += 2 //警告: Set operation on key "value" failed: target is readonly
      // delete copy.value // 警告: Delete operation on key "value" failed: target is readonly

      // state.a.b++
      // copy2.a.b++ // 警告: Set operation on key "count" failed: target is readonly

      // copy3.x.y++ // 警告: Set operation on key "count" failed: target is readonly

    }, 2000)


    const state3 = shallowReadonly({
      foo: 1,
      nested: {
        bar: 2
      }
    })

    // 改变状态本身的property将失败
    // state3.foo++ // 警告: Set operation on key "foo" failed: target is readonly

    // 适用于嵌套对象
    isReadonly(state3.nested) // false
    state3.nested.bar++ // 适用
    
    return {
      count1,
      copy,

      state,
      copy2,

      copy3,

      state3
    }
  }
}
</script>

```



### 2) shallowReactive 与 shallowRef

- shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)
- shallowRef: 只处理了value的响应式, 不进行对象的reactive处理

-  什么时候用浅响应式呢?
  -  一般情况下使用ref和reactive即可
  -  如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
  -  如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

```vue
<template>
  <h2>App</h2>
  <p>m1: {{m1}}</p>
  <p>m2: {{m2}}</p>
  <p>m3: {{m3}}</p>
  <p>m4: {{m4}}</p>
  <button @click="update">更新</button>
</template>

<script lang="ts">
/* 
shallowReactive与shallowRef
  shallowReactive: 只处理了对象内最外层属性的响应式(也就是浅响应式)
  shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
总结:
  reactive与ref实现的是深度响应式, 而shallowReactive与shallowRef是浅响应式
  什么时候用浅响应式呢?
    一般情况下使用ref和reactive即可,
    如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
    如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
*/

import {
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  isReactive
} from 'vue'

export default {

  setup () {
    const m1 = reactive({x: 1, y: {z: 'abc'}})
    const m2 = shallowReactive({x: 1, y: {z: 'abc'}})
    const m3 = ref({a1: 2, a2: {a3: 'abc'}})
    const m4: any = shallowRef({a1: 2, a2: {a3: 'abc'}})
    console.log(isReactive(m1.y))
    console.log(isReactive(m2.y))
    console.log(isReactive(m3.value.a2))
    console.log(isReactive(m4.value.a2))


    function update() {
      // m2.y = {z: 'abc--'}  // 界面会更新
      // m2.y.z = 'abc--' // 界面不会更新
      // m1.y.z = 'abc--' // 界面会更新

      m4.value.a1 += 1 // 界面不会更新
      m4.value = {} // 界面会更新
    }

    return {
      m1,
      m2,
      m3,
      m4,
      update
    }
  }
}
</script>

```



### 3) toRaw 与 markRaw

- toRaw
  - 返回由 `reactive` 或 `readonly` 方法转换成响应式代理的普通对象。
  - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
- markRaw
  - 标记一个对象，使其永远不会转换为代理。返回对象本身
  - 应用场景:
    - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

```vue
<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
/* 
toRaw: 得到reactive代理对象的目标数据对象
*/
import {
  markRaw,
  reactive, toRaw,
} from 'vue'
export default {
  setup () {
    const state = reactive<any>({
      name: 'tom',
      age: 25,
    })

    const testToRaw = () => {
      const user = toRaw(state)
      user.age++  // 界面不会更新

    }

    const testMarkRaw = () => {
      const likes = ['a', 'b']
      // state.likes = likes
      state.likes = markRaw(likes) // likes数组就不再是响应式的了
      setTimeout(() => {
        state.likes[0] += '--'
      }, 1000)
    }

    return {
      state,
      testToRaw,
      testMarkRaw,
    }
  }
}
</script>
```



### 4) toRef

- 为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
- 区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
- 应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用

```vue
<template>
  <h2>App</h2>
  <p>{{state}}</p>
  <p>{{fooRef}}</p>
  <p>{{foo}}</p>

  <button @click="foo += '==='">更新</button>

  <Child :foo="foo"/>
</template>

<script lang="ts">
/*
toRef:
  为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
  区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
  应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用
*/

import {
  reactive,
  toRef,
  ref,
} from 'vue'
import Child from './Child.vue'

export default {

  setup () {

    const state = reactive({
      foo: 1,
      bar: 2
    })

    // fooRef的value与state中的foo是关联的
    const fooRef = toRef(state, 'foo')

    setTimeout(() => {
      fooRef.value++
      console.log(state.foo) // 2
      state.foo++
      console.log(fooRef.value) // 3
    }, 2000)

    const foo = ref('xxx')


    return {
      state,
      fooRef,
      foo
    }
  },

  components: {
    Child
  }
}
</script>

```

```vue
<template>
  <h3>{{foo}}</h3>
  <h3>{{fooRef}}</h3>
  <h3>{{length}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  toRef
} from 'vue'
export default defineComponent({
  name: 'Child',

  props: {
    foo: {
      type: String,
      required: true
    }
  },

  mounted () {
    console.log(this, this.foo)
  },

  setup (props) {
    console.log('---', props)
    const fooRef = toRef(props, 'foo')
    console.log('fooRef', fooRef)

    const update = () => {
      // props.foo += '----' // error
    }

    const {length} = useFoo(toRef(props, 'foo'))

    return {
      fooRef,
      update,
      length
    }
  }
})

function useFoo(fooRef: Ref) {
  
  const length = computed(() => {
    return fooRef.value.length
  })
  return {
    length
  }
}
</script>

```



### 5) customRef

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
- 需求: 自定义 ref 实现 debounce

```vue
<template>
  <h2>App</h2>
  <input v-model="text" placeholder="搜索关键字"/>
  <p>{{text}}</p>
</template>

<script lang="ts">
/*
customRef:
  创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制

需求: 自定义 ref 实现 debounce
*/

import {
  ref,
  customRef
} from 'vue'

export default {

  setup () {
    const text = useDebouncedRef('')
    
    return {
      text
    }
  },
}

/* 
实现函数防抖的自定义ref
*/
function useDebouncedRef(value: any, delay = 200) {
  let timeout: number
  return customRef((track, trigger) => {
    return {
      get() {
        console.log('get()')
        // 告诉Vue追踪数据
        track()
        return value
      },
      set(newValue) {
        console.log('set', newValue)
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          // 告诉vue去触发界面更新
          trigger()
        }, delay)
      }
    }
  })
}

</script>

```




### 6) provide 与 inject

- provide` 和 `inject` 提供依赖注入，功能类似 2.x 的 `provide/inject

- 实现跨层级组件(祖孙)间通信

```vue
<template>
  <h1>父组件</h1>
  <button @click="colorRef='red'">红</button>
  <button @click="setColor('yellow')">黄</button>
  <button @click="setColor('blue')">蓝</button>
  <hr>
  
  <Son />
</template>

<script lang="ts">
import Son from './Son.vue'
import { provide, ref } from 'vue'
export default {
  name: 'ProvideInject',
  components: {
    Son
  },
  setup() {
    
    // 向后代传递普通数据
    provide('color',3)
    
    // 传递响应式数据
    const colorRef = ref('red')
    provide('colorRef',colorRef)

    function setColor (color: string) {
      colorRef.value = color
    }

    return {
      colorRef,
      setColor
    }
  }
}
</script>

```

```vue
<template>
  <div>
    <h2>子组件</h2>
    <hr>
    <GrandSon />
  </div>
</template>

<script lang="ts">
import GrandSon from './GrandSon.vue'
export default {
  components: {
    GrandSon
  },
  setup() {
    
  }
}
</script>
```

```vue
<template>
  <div>
    <h3 :style="{color:color}">孙子组件: {{color}}</h3>
    <h3 :style="{color:colorRef}">ref</h3>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
export default {
  setup() {
    const color = inject('color')
    console.log(color);
    const colorRef = inject('colorRef')
    return {
      color,
      colorRef
    }
  }
}
</script>
```



### 7) 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理



## 5. 手写组合API

### 1) shallowReactive 与 reactive

```js
const reactiveHandler = {
  get (target, key) {

    if (key==='_is_reactive') return true

    return Reflect.get(target, key)
  },

  set (target, key, value) {
    const result = Reflect.set(target, key, value)
    console.log('数据已更新, 去更新界面')
    return result
  },

  deleteProperty (target, key) {
    const result = Reflect.deleteProperty(target, key)
    console.log('数据已删除, 去更新界面')
    return result
  },
}

/* 
自定义shallowReactive
*/
function shallowReactive(obj) {
  return new Proxy(obj, reactiveHandler)
}

/* 
自定义reactive
*/
function reactive (target) {
  if (target && typeof target==='object') {
    if (target instanceof Array) { // 数组
      target.forEach((item, index) => {
        target[index] = reactive(item)
      })
    } else { // 对象
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }

    const proxy = new Proxy(target, reactiveHandler)
    return proxy
  }

  return target
}


/* 测试自定义shallowReactive */
const proxy = shallowReactive({
  a: {
    b: 3
  }
})

proxy.a = {b: 4} // 劫持到了
proxy.a.b = 5 // 没有劫持到


/* 测试自定义reactive */
const obj = {
  a: 'abc',
  b: [{x: 1}],
  c: {x: [11]},
}

const proxy = reactive(obj)
console.log(proxy)
proxy.b[0].x += 1
proxy.c.x[0] += 1
```



### 2) shallowRef 与 ref

```js
/*
自定义shallowRef
*/
function shallowRef(target) {
  const result = {
    _value: target, // 用来保存数据的内部属性
    _is_ref: true, // 用来标识是ref对象
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
      console.log('set value 数据已更新, 去更新界面')
    }
  }

  return result
}

/* 
自定义ref
*/
function ref(target) {
  if (target && typeof target==='object') {
    target = reactive(target)
  }

  const result = {
    _value: target, // 用来保存数据的内部属性
    _is_ref: true, // 用来标识是ref对象
    get value () {
      return this._value
    },
    set value (val) {
      this._value = val
      console.log('set value 数据已更新, 去更新界面')
    }
  }

  return result
}

/* 测试自定义shallowRef */
const ref3 = shallowRef({
  a: 'abc',
})
ref3.value = 'xxx'
ref3.value.a = 'yyy'


/* 测试自定义ref */
const ref1 = ref(0)
const ref2 = ref({
  a: 'abc',
  b: [{x: 1}],
  c: {x: [11]},
})
ref1.value++
ref2.value.b[0].x++
console.log(ref1, ref2)
```



### 3) shallowReadonly 与 readonly

```js
const readonlyHandler = {
  get (target, key) {
    if (key==='_is_readonly') return true

    return Reflect.get(target, key)
  },

  set () {
    console.warn('只读的, 不能修改')
    return true
  },

  deleteProperty () {
    console.warn('只读的, 不能删除')
    return true
  },
}

/* 
自定义shallowReadonly
*/
function shallowReadonly(obj) {
  return new Proxy(obj, readonlyHandler)
}

/* 
自定义readonly
*/
function readonly(target) {
  if (target && typeof target==='object') {
    if (target instanceof Array) { // 数组
      target.forEach((item, index) => {
        target[index] = readonly(item)
      })
    } else { // 对象
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }
    const proxy = new Proxy(target, readonlyHandler)

    return proxy 
  }

  return target
}

/* 测试自定义readonly */
/* 测试自定义shallowReadonly */
const objReadOnly = readonly({
  a: {
    b: 1
  }
})
const objReadOnly2 = shallowReadonly({
  a: {
    b: 1
  }
})

objReadOnly.a = 1
objReadOnly.a.b = 2
objReadOnly2.a = 1
objReadOnly2.a.b = 2
```



### 4) isRef, isReactive 与 isReadonly

```js
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


/* 测试判断函数 */
console.log(isReactive(reactive({})))
console.log(isRef(ref({})))
console.log(isReadonly(readonly({})))
console.log(isProxy(reactive({})))
console.log(isProxy(readonly({})))
```



## 6.  新组件

### 1) Fragment(片断)

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

```vue
<template>
    <h2>aaaa</h2>
    <h2>aaaa</h2>
</template>
```



### 2) Teleport(瞬移)

- Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签(很可能是body)下插入显示

ModalButton.vue

```vue
<template>
  <button @click="modalOpen = true">
      Open full screen modal! (With teleport!)
  </button>

  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a teleported modal! 
        (My parent is "body")
        <button @click="modalOpen = false">
          Close
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'modal-button',
  setup () {
    const modalOpen = ref(false)
    return {
      modalOpen
    }
  }
}
</script>


<style>
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
```

App.vue

```vue
<template>
  <h2>App</h2>
  <modal-button></modal-button>
</template>

<script lang="ts">
import ModalButton from './ModalButton.vue'

export default {
  setup() {
    return {
    }
  },

  components: {
    ModalButton
  }
}
</script>
```



### 3) Suspense(不确定的)

- 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验

```vue
<template>
  <Suspense>
    <template v-slot:default>
      <AsyncComp/>
      <!-- <AsyncAddress/> -->
    </template>

    <template v-slot:fallback>
      <h1>LOADING...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
/* 
异步组件 + Suspense组件
*/
// import AsyncComp from './AsyncComp.vue'
import AsyncAddress from './AsyncAddress.vue'
import { defineAsyncComponent } from 'vue'
const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'))
export default {
  setup() {
    return {
     
    }
  },

  components: {
    AsyncComp,
    AsyncAddress
  }
}
</script>
```

- AsyncComp.vue

```vue
<template>
  <h2>AsyncComp22</h2>
  <p>{{msg}}</p>
</template>

<script lang="ts">

export default {
  name: 'AsyncComp',
  setup () {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       msg: 'abc'
    //     })
    //   }, 2000)
    // })
    return {
      msg: 'abc'
    }
  }
}
</script>
```

- AsyncAddress.vue

```vue
<template>
<h2>{{data}}</h2>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  async setup() {
    const result = await axios.get('/data/address.json')
    return {
      data: result.data
    }
  }
}
</script>
```



