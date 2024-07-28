<script setup lang="ts">
//import { ref } from 'vue'
import Counter from './components/Counter.vue'

// retrieve our postbox instance from window using the usePostbox hook
const postbox = window.usePostbox()
// subscribe to a topic
postbox.sub('all-modules-loaded', (data) =>
  console.log(`microfrontend3 (vue): received event "all-modules-loaded" with data:`, data),
)
</script>

<template>
  <div class="flex flex-col space-y-2">
    <Counter />
  </div>
</template>
