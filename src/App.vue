<template>
<div>
  <h2>x: {{x}}, y: {{y}}</h2>

  <hr>

  <h3 v-if="loading">正在加载中...</h3>
  <h3 v-else-if="errorMsg">{{errorMsg}}</h3>
  <!-- <ul v-else>
    <li>{{data.id}}</li>
    <li>{{data.name}}</li>
    <li>{{data.distance}}</li>
  </ul> -->
  <ul v-for="item in data" :key="item.id">
    <li>{{item.id}}</li>
    <li>{{item.title}}</li>
    <li>{{item.price}}</li>
  </ul>
</div>
</template>

<script lang="ts">

/* 
在组件中引入并使用自定义hook
自定义hook的作用类似于vue2中的mixin技术
自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
*/

import useMousePosition from './hooks/useMousePosition'
import request from './hooks/request'
import { watch } from 'vue'


interface AddressData {
  id: number;
  name: string;
  distance: string;
}

interface PrductData {
  id: number;
  title: string;
  price: number;
}

export default {
  setup() {

    const {x, y} = useMousePosition()

    // const proxy = reactive({x2:1, y2:2})
    // const {x2, y2} = proxy

    // const {loading, data, errorMsg} = request<AddressData>('/data/address.json')
    const {loading, data, errorMsg} = request<PrductData[]>('/data/products.json')

    watch(data, () => {
      if (data.value) {
        // console.log('---', data.value.name)
        console.log('---', data.value[1].title)
      }
    })
    
    return {
      x,
      y,
      loading, 
      data, 
      errorMsg
    }
  }
}
</script>