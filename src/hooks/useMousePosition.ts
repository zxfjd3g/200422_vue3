import {
  onBeforeUnmount,
  onMounted,
  ref
} from "vue"

/* 
自定义hook函数: 使用组合API来封装可复用的功能
*/
export default function useMousePosition() {
  const x = ref(-1)
  const y = ref(-1)

  const handleClick = (event: MouseEvent)=> {
      x.value = event.pageX
      y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('click', handleClick)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClick)
  })

  return  {
    x,
    y
  }
}
