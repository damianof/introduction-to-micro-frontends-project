<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const onClick = () => count.value += 1
</script>
<template>
  <button class="p-2 flex space-x-2 items-center rounded-md bg-slate-700" @click="onClick">
    <img style="width: 1rem" src="http://localhost:5003/vue.svg" class="logo vue" alt="Vue logo" />
    <span>microfrontend3: Counter{{ count }}</span>
  </button>
</template>
