<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Spinner from './components/shared/Spinner.vue'
//import Menu from './components/menu/Menu.vue'
import { config } from './config'
import { useMicroFrontendLoader } from './core'
const microFrontendLoader = useMicroFrontendLoader()

// retrieve our postbox instance from window using the usePostbox hook
const postbox = window.usePostbox()

const loadersState: Record<string, boolean> = reactive({
  microfrontend1: true,
  microfrontend2: true,
  microfrontend3: true,
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

const unloadMicrofrontend = (moduleKey: string) => {
  try {
    const containerId = `${moduleKey}-container`
    microFrontendLoader.unmount(moduleKey, containerId)
    loadersState[moduleKey] = true
  } catch (e) {
    console.error('loadMicrofrontend', e)
  }
}

onMounted(async () => {
  await Promise.all([
    loadMicrofrontend('microfrontend1'),
    loadMicrofrontend('microfrontend2'),
    loadMicrofrontend('microfrontend3'),
  ])

  // send a message
  await postbox.pub('all-modules-loaded', { action: 'none', params: 'some data etc' })
})
</script>

<template>
  <div class="container-app grid grid-rows-4 gap-2" style="height: calc(100vh - 1rem)">
    <!-- first row: -->
    <div class="row-span-3 grid grid-cols-12 gap-2 flex-grow">
      <div class="col-span-2">
        <!-- <Menu /> -->
        Menu will go here

        <div class="flex flex-col">
          <button @click="unloadMicrofrontend('microfrontend1')">Test unload 1</button>
          <button @click="unloadMicrofrontend('microfrontend2')">Test unload 2</button>
          <button @click="unloadMicrofrontend('microfrontend3')">Test unload 3</button>
          <br />

          <button @click="loadMicrofrontend('microfrontend1')">Test load 1</button>
          <button @click="loadMicrofrontend('microfrontend2')">Test load 2</button>
          <button @click="loadMicrofrontend('microfrontend3')">Test load 3</button>
        </div>
      </div>
      <div class="col-span-8 outline-dashed outline-1 outline-green-500">
        <Spinner v-show="loadersState.microfrontend3" color="green" />
        <div id="microfrontend3-container"></div>
      </div>
      <div class="col-span-2 outline-dashed outline-1 outline-blue-500">
        <Spinner v-show="loadersState.microfrontend1" color="blue" />
        <div id="microfrontend1-container"></div>
      </div>
    </div>

    <!-- second row: -->
    <div class="outline-dashed outline-1 outline-red-500 flex-grow">
      <Spinner v-show="loadersState.microfrontend2" color="red" />
      <div id="microfrontend2-container"></div>
    </div>
  </div>
</template>
