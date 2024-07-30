<script setup lang="ts">
import { TEmitsAction } from '../../types'

const emits = defineEmits<TEmitsAction>()

const menuItemCss = `cursor-pointer hover:text-pink-500 hover:outline hover:outline-pink-500`
const menuItemTextCss = `p-2 text-sm leading-6 font-semibold`

const emitAction = (type: string) => {
  emits('action', { type })
}
</script>
<template>
  <nav class="p-2 flex flex-col w-full bg-transparent text-white">
    <ul role="list" class="space-y-1 flex flex-col w-full">
      <li :class="menuItemCss" @click="emitAction('test-action1')">
        <span :class="menuItemTextCss">Dashboard</span>
      </li>
      <li :class="menuItemCss" @click="emitAction('test-action2')">
        <span :class="menuItemTextCss">Calendar</span>
      </li>
      <li :class="menuItemCss" @click="emitAction('test-action3')">
        <span :class="menuItemTextCss">Documents</span>
      </li>
    </ul>
  </nav>
</template>
