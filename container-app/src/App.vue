<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Spinner from './components/shared/Spinner.vue'
import Menu from './components/menu/Menu.vue'
import { config } from './config'
import { IEventAction } from './types'
import { useDebounce } from '@builtwithjavascript/debounce'
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

const onMenuAction = (actionInfo: IEventAction) => {
  console.log('onMenuAction', actionInfo)
}

onMounted(async () => {
  // begin: code block will only be included during development, not build
  if (import.meta.hot) {
    console.log('import.meta.hot', import.meta.hot)
    const moduleKeys = ['microfrontend1', 'microfrontend2', 'microfrontend3']
    // listen to module-change event fired by our custom "watch-builds-and-notify" vite plugin
    const debouncedFn = useDebounce(async (data) => {
      console.log('module file change detected:', data)
      // react to the file change
      const key = data.key
      if (moduleKeys.indexOf(key) > -1) {
        unloadMicrofrontend(key)
        await loadMicrofrontend(key)
      }
    }, 1000)
    import.meta.hot.on('module-change', debouncedFn)
  }
  // end

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
  <div class="container-app grid grid-rows-12 gap-2" style="height: calc(100vh - 1rem)">
    <!-- first row: -->
    <div class="row-span-8 grid grid-cols-12 gap-2">
      <div class="col-span-2">
        <Menu @action="onMenuAction" />

        <div v-show="false" class="flex flex-col">
          <button @click="unloadMicrofrontend('microfrontend1')">Test unload 1</button>
          <button @click="unloadMicrofrontend('microfrontend2')">Test unload 2</button>
          <button @click="unloadMicrofrontend('microfrontend3')">Test unload 3</button>
          <br />

          <button @click="loadMicrofrontend('microfrontend1')">Test load 1</button>
          <button @click="loadMicrofrontend('microfrontend2')">Test load 2</button>
          <button @click="loadMicrofrontend('microfrontend3')">Test load 3</button>
        </div>
      </div>
      <div class="col-span-7 outline-dashed outline-1 outline-green-500 overflow-hidden">
        <Spinner v-show="loadersState.microfrontend3" color="green" />
        <div id="microfrontend3-container"></div>
      </div>
      <div class="col-span-3 outline-dashed outline-1 outline-blue-500">
        <Spinner v-show="loadersState.microfrontend1" color="blue" />
        <div id="microfrontend1-container"></div>
      </div>
    </div>

    <!-- second row: -->
    <div class="row-span-4 outline-dashed outline-1 outline-red-500 flex-grow">
      <Spinner v-show="loadersState.microfrontend2" color="red" />
      <div id="microfrontend2-container"></div>
    </div>
  </div>
</template>
