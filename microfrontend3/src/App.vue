<script setup lang="ts">
import { onMounted } from 'vue'
import Counter from './components/Counter.vue'
import CoffeeByCountry from './components/coffee-data/CoffeeByCountry.vue'
import { IFileInfo, IFileValidatorOptions, FileUploadComponent 

} from '../../../builtwithjavascript/vue-file-upload/src'

// retrieve our postbox instance from window using the usePostbox hook
const postbox = window.usePostbox()

onMounted(() => {
  // subscribe to a topic
  postbox.sub('all-modules-loaded', (data) =>
    console.log(`microfrontend3 (vue): received event "all-modules-loaded" with data:`, data),
  )
})

const fileValidatorOptions: IFileValidatorOptions = {
  allowedTypes: ['csv', 'json', 'txt'],
  maxSize: 3, // in MB
  maxNameLength: 60, // max name length in chars
  nameTruncateMaxLength: 35, // will truncate the display of the name
  propertiesToValidate: ['name', 'type', 'size']
}

const onUploadClicked = async (fileInfo: IFileInfo) => {
  // do what you need to do with fileInfo.file
  // i.e. create form data and post it to an API endpoint
  const file = new FormData()
  file.append('file', fileInfo.file as Blob)
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <FileUploadComponent id="123" uploadLabel="Testing" 
      :fileValidatorOptions="fileValidatorOptions"
      @uploadClicked="onUploadClicked"/>
    <!-- <Counter />
    <CoffeeByCountry v-show="true"/> -->
  </div>
</template>
