<script setup lang="ts">
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
  <div>
    Container app
    <div>
      <div id="microfrontend1-container"></div>
      <div id="microfrontend2-container"></div>
      <div id="microfrontend3-container"></div>
      <button @click="loadMicrofrontend('microfrontend1')">Load Micro-Frontend 1</button>
      <button @click="loadMicrofrontend('microfrontend2')">Load Micro-Frontend 2</button>
      <button @click="loadMicrofrontend('microfrontend3')">Load Micro-Frontend 3</button>
    </div>
  </div>
</template>
