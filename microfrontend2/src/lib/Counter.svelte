<script lang="ts">
  let count: number = 0

  const onClick = () => {
    //console.log('svelte: counter onClick')
    count += 1
  }
</script>

<button class="svelte-button" on:click={onClick}>
  <img src="http://localhost:5002/svelte.svg" alt="Svelte Logo" style="width:1rem" />
  <span>Microfrontend2: Counter {count}</span>
</button>

<style>
.svelte-button {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  background: #ffffff;
  color: #000000;
  cursor: pointer;
}
.svelte-button *:not(:first-child) {
  margin-left: 0.25rem;
}
</style>
