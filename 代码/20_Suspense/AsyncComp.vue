<template>
  <div>
    <h2>AsyncComp</h2>
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
  name: 'AsyncComp',
  setup () {
    // 返回一个异步成功的promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ // 指定模板可以直接访问的数据
          msg: 'abc'
        })
      }, 2000)
    })
    // return {

    // }
  }
}
</script>
