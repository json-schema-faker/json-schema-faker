<script>
  import { onMount } from 'svelte';
  import { navigateTo } from 'yrv';
  import { all, loggedIn } from './gists';

  let term = '';
  let data = [];
  let pending = true;

  onMount(async () => {
    if ($loggedIn) data = await all();
    pending = false;
  });

  $: filtered = data.filter(x =>
    !term
    || x.description.toLowerCase().includes(term.toLowerCase())
    || Object.keys(x.files).some(k => k.toLowerCase().includes(term.toLowerCase())));
</script>
<label class="mb flx flx-c nosl">
  <span>Filter gists:</span>
  <input class="f txt ml flx-a" type="search" bind:value={term} />
</label>
{#if $loggedIn}
  {#if pending}
    Loading gists...
  {:else}
    <ol class="lr zb max">
      {#each filtered as item}
        <li class="mb ni">
          <div class="flx flx-c">
            <a class="tdn flx-a" target="_blank" href="{item.html_url}">{item.description || item.id}</a>
            <button class="bu ml nosl" on:click={() => navigateTo(`/#gist/${item.id}`)}>Load gist</button>
          </div>
          <ul class="ml lr">
            {#each Object.entries(item.files) as [file, info]}
              <li class="ni">
                <a class="bl" title="Type: {info.type}" target="_blank" href="{info.raw_url}">{file} &mdash; {(info.size / 1024).toFixed(2)}KB</a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ol>
  {/if}
{/if}
