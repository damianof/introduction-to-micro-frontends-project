<script lang="ts">
import Counter from './lib/Counter.svelte'

//// retrieve our postbox instance from window using the usePostbox hook
//const postbox = window.usePostbox()
//// subscribe to a topic
//postbox.sub('all-modules-loaded', (data) => console.log(`microfrontend2 (svelte): received event`, data))
</script>

<main>
  <div class="flex flex-col space-y-2">
    <Counter />
  </div>
</main>
