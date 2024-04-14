<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

const onClick = () => {
  count.value += 1
  console.log('vue: counter onClick')
}
</script>
<template>
  <button class="vue-button" @click="onClick">
    <img style="width:1rem" src="http://localhost:5003/vue.svg" class="logo vue" alt="Vue logo" />
    <span>microfrontend3: Counter{{ count }}</span>
  </button>
</template>

<style>
.vue-button {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  background: #ffffff;
  color: #000000;
  cursor: pointer;
}
.vue-button *:not(:first-child) {
  margin-left: 0.25rem;
}
</style>
