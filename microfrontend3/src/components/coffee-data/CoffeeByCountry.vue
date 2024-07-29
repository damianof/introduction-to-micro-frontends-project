<script lang="ts" setup>
import { reactive, watchEffect, onMounted } from 'vue'
import { useDebounce } from '@builtwithjavascript/debounce'
import { ICountryCoffeeData } from 'postbox'

const state = reactive<{ 
  allCountries: ICountryCoffeeData[]
  filteredCountries: ICountryCoffeeData[]
  sortBy: string,
  sortDir: 1 | -1
}>({
  allCountries: [],
  filteredCountries: [],
  sortBy: 'country',
  sortDir: 1
})

const gridRowCss = 'grid grid-cols-3 gap-2'
const headerCss = 'font-bold cursor-pointer hover:text-red-500'

const sortAndFilter = (items: ICountryCoffeeData[], propName: string, dir: number, defValue: string | number) => {
  return (items || []).sort((a: any, b: any) => {
    let av = a[propName] || defValue
    let bv = b[propName] || defValue
    if (typeof defValue === 'number') {
      av = Number(av)
      bv = Number(bv)
    }
    return av > bv ? (1 * dir) : (-1 * dir)
  })
}

const debouncedWatchFn = useDebounce((allCountries, sortBy, sortDir, defValue) => {
  state.filteredCountries = sortAndFilter(allCountries, sortBy, sortDir, defValue)
}, 110)

watchEffect(() => {
  const { allCountries, sortBy, sortDir } = state
  const defValue: string | number = sortBy === 'country' ? '' : 0
  debouncedWatchFn(allCountries, sortBy, sortDir, defValue)
})

const headerClicked = (header: string) => {
  let newDir: 1 | -1 = 1
  if (state.sortBy === header) {
    newDir = state.sortDir === 1 ? -1 : 1
  }
  state.sortBy = header
  state.sortDir = newDir
}

onMounted(async () => {
  const fetchRequest = await fetch('http://localhost:3031/coffee')
  const response = await fetchRequest.json()
  console.log('response', response)
  state.allCountries = ((response?.countries || []) as ICountryCoffeeData[]).map(x => {
    return {
      ...x,
      _tot_imports: Number(Object.values(x.imports).reduce((a, v) => a + v, 0).toFixed(2)),
      _tot_exports: Number(Object.values(x.exports).reduce((a, v) => a + v, 0).toFixed(2))
    }
  })
})
</script>

<template>
  <div class="p-4 overflow-y-scroll">
    Coffe by Country
    <div>
      <div :class="gridRowCss">
        <span :class="headerCss" @click="headerClicked('country')">Country</span>
        <span :class="headerCss" @click="headerClicked('_tot_imports')">Imports</span>
        <span :class="headerCss" @click="headerClicked('_tot_exports')">Exports</span>
      </div>
      <div :class="gridRowCss" 
        v-for="item in state.filteredCountries" 
        :key="item.country">
        <span>{{ item.country }}</span>
        <span>{{ item._tot_imports }}</span>
        <span>{{ item._tot_exports }}</span>
      </div>
    </div>
  </div>
</template>