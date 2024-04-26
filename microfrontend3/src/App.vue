<script setup lang="ts">
import { ref } from 'vue'
import Counter from './components/Counter.vue'
import { FileUploadComponent, DefaultFileValidatorOptions } from '@builtwithjavascript/vue-file-upload-tailwind' 
import type { 
  IFileInfo,
  IFileValidatorOptions
} from '@builtwithjavascript/vue-file-upload-tailwind' 

const fileValidatorOptions: IFileValidatorOptions = {
  ...DefaultFileValidatorOptions,
  allowedTypes: ['csv', 'json', 'txt'],
  maxSize: 3, // in MB
  maxNameLength: 60, // max name length in chars
  nameTruncateMaxLength: 35, // will truncate the display of the name
  propertiesToValidate: ['name', 'type', 'size']
}

const onUploadClicked = (model: IFileInfo): any => {
  console.log('onUploadClicked', model)
}

const refFileUploadComp = ref<InstanceType<typeof FileUploadComponent> | null>()
const reset = () => {
  refFileUploadComp.value?.reset()
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <Counter />

    <FileUploadComponent 
      id="file-input" 
      uploadLabel="Import File"
      ref="refFileUploadComp"
      :validatorOptions="fileValidatorOptions"
      :roundedCorners="true"
      :showOnlyErrors="true"
      successClass="success bg-pink-500"
      errorClass = "error bg-gray-500"
      inputCssClass = "border border-slate-500"
      @uploadClicked="onUploadClicked" />

    <button @click="reset">Reset</button>
  </div>
</template>
