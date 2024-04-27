<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Spinner from './components/shared/Spinner.vue'
//import Menu from './components/menu/Menu.vue'
import { config } from './config'
import { useMicroFrontendLoader } from './core'
import { usePostbox } from './core'
const microFrontendLoader = useMicroFrontendLoader()

let postbox = usePostbox()

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
  await Promise.all([
    loadMicrofrontend('microfrontend1'),
    loadMicrofrontend('microfrontend2'),
    loadMicrofrontend('microfrontend3')
  ])

  postbox.pub('test', { action: 'all-loaded' })
})
</script>

<template>
  <div class="container-app grid grid-rows-4 gap-2" style="height: calc(100vh - 1rem)">
    <!-- first row: -->
    <div class="row-span-3 grid grid-cols-12 gap-2 flex-grow">
      <div class="col-span-2">
        <!-- <Menu /> -->
        Menu will go here
      </div>
      <div class="col-span-8 outline-dashed outline-1 outline-green-500">
        <Spinner v-show="loadersState.microfrontend3" color="green"/>
        <div id="microfrontend3-container"></div>
      </div>
      <div class="col-span-2 outline-dashed outline-1 outline-blue-500">
        <Spinner v-show="loadersState.microfrontend1" color="blue"/>
        <div id="microfrontend1-container"></div>
      </div>
    </div>
    
    <!-- second row: -->
    <div class="outline-dashed outline-1 outline-red-500 flex-grow">
      <Spinner v-show="loadersState.microfrontend2" color="red"/>
      <div id="microfrontend2-container"></div>
    </div>
  </div>
</template>

