<script>
  import { router } from 'yrv';
  import { loadFrom } from './gists';

  let data = null;
  let schemas = [];
  let pending = true;

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

{#if pending}
  Loading gist...
{:else}
  <pre>{JSON.stringify(schemas, null, 2)}</pre>
{/if}
