<script lang="ts">
  let count: number = 0

  const onClick = () => {
    //console.log('svelte: counter onClick')
    count += 1
  }
</script>

<button class="p-2 flex space-x-2 items-center rounded-md bg-slate-700" on:click={onClick}>
  <img src="http://localhost:5002/svelte.svg" alt="Svelte Logo" style="width:1rem" />
  <span>Microfrontend2: Counter {count}</span>
</button>
