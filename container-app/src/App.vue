<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Spinner from './components/shared/Spinner.vue'
import Menu from './components/menu/Menu.vue'
import { config } from './config'
import { useMicroFrontendLoader } from './core'
const microFrontendLoader = useMicroFrontendLoader()

const loadersState: Record<string, boolean> = reactive({
  microfrontend1: true,
  microfrontend2: true,
  microfrontend3: true
})

const loadMicrofrontend = async (moduleKey: string) => {
  try {
  const url = config.appModules[moduleKey]
  const containerId = `${moduleKey}-container`
  await microFrontendLoader.loadAndMount(moduleKey, url, containerId)
  loadersState[moduleKey] = false
  } catch (e) {
    console.error('loadMicrofrontend', e)
  }
}

onMounted(async () => {
  Promise.all([
    loadMicrofrontend('microfrontend1'),
    loadMicrofrontend('microfrontend2'),
    loadMicrofrontend('microfrontend3')
  ])
})


</script>

<template>
  <div class="container-app">
    <h1>Container app</h1>
    <div class="grid grid-cols-4 gap-2">
      <div class="p-4 border-2 border-slate-500">
        <Menu />
      </div>
      <div class="p-4 border-2 border-blue-500">
        <Spinner v-show="loadersState.microfrontend1" color="blue"/>
        <div id="microfrontend1-container"></div>
      </div>
      <div class="p-4 border-2 border-red-500">
        <Spinner v-show="loadersState.microfrontend2" color="red"/>
        <div id="microfrontend2-container"></div>
      </div>
      <div class="p-4 border-2 border-green-500">
        <Spinner v-show="loadersState.microfrontend3" color="green"/>
        <div id="microfrontend3-container"></div>
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
