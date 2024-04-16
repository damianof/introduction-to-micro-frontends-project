<script setup lang="ts">
import Spinner from './components/shared/Spinner.vue'
import { config } from './config'
import { useMicroFrontendLoader } from './core'
const microFrontendLoader = useMicroFrontendLoader()

const loadMicrofrontend = (moduleKey: string) => {
  const url = config.appModules[moduleKey]
  const containerId = `${moduleKey}-container`
  microFrontendLoader.loadAndMount(moduleKey, url, containerId).catch(console.error)
}

</script>

<template>
  <div class="container-app">
    <h1>Container app</h1>
    <div class="grid grid-cols-3 gap-2">
      <div class="p-4 border-2 border-blue-500" id="microfrontend1-container">
        <Spinner color="blue"/>
      </div>
      <div class="p-4 border-2 border-red-500" id="microfrontend2-container">
        <Spinner color="red"/>
      </div>
      <div class="p-4 border-2 border-green-500" id="microfrontend3-container">
        <Spinner color="green"/>
      </div>
    </div>
    <div class="buttons">
      <button @click="loadMicrofrontend('microfrontend1')">Load Micro-Frontend 1</button>
      <button @click="loadMicrofrontend('microfrontend2')">Load Micro-Frontend 2</button>
      <button @click="loadMicrofrontend('microfrontend3')">Load Micro-Frontend 3</button>
    </div>
  </div>
</template>

<style>
.container-app {
  padding: 1rem;
}
.container-app h1 {
  margin: 0;
}
.container-app > *:not(:first-child) {
  margin-top: 1rem;
}
.buttons {
  display: flex;
  align-items: center;
}
.buttons > *:not(:first-child) {
  margin-left: 0.5rem;
}
</style>
