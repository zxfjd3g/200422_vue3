<template>
<h2>{{data}}</h2>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  // setup() {
  //   return axios.get('/data/address.json').then(response => {
  //     return {
  //       data: response.data
  //     }
  //   })
  // }

  async setup() {

    const response = await axios.get('/data/address.json')
    return {
      data: response.data
    }
  }
}
</script>