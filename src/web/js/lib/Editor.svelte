<script>
  import { router } from 'yrv';
  import Ace from './Ace.svelte';
  import { loadFrom } from './gists';

  let data;
  let schemas = [];
  let pending = true;
  let editInput = '{\n  "type": "string"\n}';
  let jsonOutput = '{}';

  router.subscribe(async info => {
    if (window.location.hash) data = await loadFrom(info.path.substr(1));
    pending = false;
  });

  $: if (data) {
    schemas = Object.keys(data.files).filter(x => data.files[x].type === 'text/plain')
      .reduce((prev, cur) => {
        prev.push(data.files[cur]);
        return prev;
      }, []);
  }
</script>

<div class="nosl">
  <div class="flx Tabs">
    <button>FILE 1</button>
    <span class="sel">
      FILE 2
      <button class="nb ml">&times;</button>
    </span>
    <button>FILE ...</button>
  </div>
  <div class="md-flx">
    <Ace mode="json" value={editInput} />
    <Ace mode="json" value={jsonOutput} readonly />
  </div>
</div>

{#if pending}
  Loading gist...
{:else}
  <pre>{JSON.stringify(schemas, null, 2)}</pre>
{/if}
