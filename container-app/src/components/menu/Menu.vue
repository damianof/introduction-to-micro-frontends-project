<script setup lang="ts">
import { TEmitsAction } from '../../types'

const emits = defineEmits<TEmitsAction>()

const emitAction = (type: string) => {
  emits('action', { type })
}
</script>
<template>
  <nav class="p-4 flex flex-1 flex-col bg-transparent text-white">
    <ul role="list" class="space-y-1">
      <li class="cursor-pointer hover:text-red-500 hover:outline outline-red-500" @click="emitAction('test-action1')">
        <span class="py-2 pr-2 pl-10 text-sm leading-6 font-semibold">Dashboard</span>
      </li>
      <li class="cursor-pointer hover:text-blue-500" @click="emitAction('test-action2')">
        <span class="py-2 pr-2 pl-10 text-sm leading-6 font-semibold">Calendar</span>
      </li>
      <li class="cursor-pointer" @click="emitAction('test-action3')">
        <span class="py-2 pr-2 pl-10 text-sm leading-6 font-semibold">Documents</span>
      </li>
    </ul>
  </nav>
</template>
