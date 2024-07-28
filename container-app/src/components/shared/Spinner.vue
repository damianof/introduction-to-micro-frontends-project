<script setup lang="ts">
import { computed } from 'vue'
type IProps = {
  color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  color: 'blue',
})

const cssClass = computed(() => {
  const result = ['w-12 h-12 -m-1 rounded-full animate-spin border-y border-solid border-t-transparent shadow-md']
  result.push(`border-${props.color}-500`)
  return result.join(' ').trim()
})
</script>

<template>
  <div class="w-12 h-12 rounded-full border-2 border-slate-500 border-opacity-30">
    <div :class="cssClass"></div>
  </div>
</template>
