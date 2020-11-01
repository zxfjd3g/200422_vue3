import axios from 'axios'
import { reactive, ref } from 'vue'

export default function request<T>(url: string) {
  // const state = reactive({
  //   loading: true,
  //   data: null,
  //   errorMsg: ''
  // })

  const loading = ref(true)
  const data = ref<T|null>(null)
  const errorMsg = ref('')

  axios.get(url).then(response => {
    loading.value = false
    data.value = response.data
  }).catch(error => {
    loading.value = false
    errorMsg.value = error.message || '未知错误'
  })

  return {
    loading,
    data,
    errorMsg
  }
}