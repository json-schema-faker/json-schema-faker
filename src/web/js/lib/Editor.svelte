<script>
  import { router } from 'yrv';
  import Ace from './Ace.svelte';
  import { loadFrom } from './gists';

  let data;
  let input;
  let buffer;
  let current;
  let isAdding;
  let selected;
  let schemas = [];
  let pending = true;
  let editInput = '{\n  "type": "string"\n}';
  let jsonOutput = '{}';

  function select(e) {
    current = e;
    isAdding = false;
  }

  function remove(e) {
    if (!confirm('Are you sure?')) return;

    const offset = schemas.indexOf(current);

    schemas = schemas.filter(x => x !== e);
    current = offset > 0 ? schemas[Math.max(0, offset - 1)] : current;
  }

  function submit(e) {
    const isValid = /^[a-zA-Z0-9_#$%][\w.]*?$/.test(e.target.value);

    if (isValid) {
      e.target.classList.remove('invalid');
    } else if (!e.target.classList.contains('invalid')) {
      e.target.classList.add('invalid');
    }

    if (isValid && e.keyCode === 13) {
      schemas = schemas.concat({ filename: e.target.value, content: buffer });
      current = schemas[schemas.length - 1];
      isAdding = false;
      e.target.value = '';
    }

    if (e.keyCode === 27) {
      current = selected;
      isAdding = false;
    }
  }

  function sync(e) {
    buffer = e.detail;

    if (current) {
      current.content = buffer;
    }
  }

  function add() {
    buffer = editInput = '';
    selected = current;
    isAdding = true;
    current = null;

    setTimeout(() => {
      input.focus();
    }, 60);
  }

  router.subscribe(async info => {
    if (window.location.hash) data = await loadFrom(info.path.substr(1));

    schemas = Object.keys(data.files).filter(x => data.files[x].type === 'text/plain')
      .reduce((prev, cur) => {
        prev.push(data.files[cur]);
        return prev;
      }, []);

    current = schemas[0];
    pending = false;
  });

  $: if (current) {
    try {
      editInput = JSON.stringify(JSON.parse(current.content), null, 2);
    } catch (e) {
      editInput = current.content;
    }
  }
</script>

<div class="nosl">
  {#if pending}
    Loading gist...
  {:else}
    <div class="flx Tabs">
      {#each schemas as info}
        {#if current === info}
          <span class="sel">
            <span>{info.filename}</span>
            <button class="a nb ml" on:click={() => remove(info)}>&times;</button>
          </span>
        {:else}
          <button class="a" on:click={() => select(info)}>{info.filename}</button>
        {/if}
      {/each}
        {#if isAdding}
          <span class="sel">
            <input class="nb" type="text" on:keyup={submit} bind:this={input} placeholder="Add ..." />
          </span>
        {:else}
          <span>
            <button class="a nb nbk" on:click={add}>Add ...</button>
          </span>
        {/if}
    </div>
    <div class="md-flx">
      <Ace mode="json" value={editInput} on:change={sync} />
      <Ace mode="json" value={jsonOutput} readonly />
    </div>
  {/if}
</div>
