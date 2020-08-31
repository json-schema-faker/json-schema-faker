<script>
  import { router } from 'yrv';
  import Ace from './Ace.svelte';
  import Toggle from './Toggle.svelte';
  import { schemas, current, loadFrom } from './gists';

  let data;
  let input;
  let buffer;
  let isAdding;
  let isEditing;
  let selected;

  let value = null;
  let isYAML = false;
  let Encoder = JSON;
  let pending = true;
  let editInput = '{}';
  let outputMode = 'json';
  let objectOutput = '{}';

  function select(e, edit) {
    $current = e;
    isAdding = false;
    isEditing = !!edit;

    if (edit) {
      setTimeout(() => {
        input.focus();
      }, 60);
    }
  }

  function remove(e) {
    if (!confirm('Are you sure?')) return;

    const offset = $schemas.indexOf($current);

    buffer = editInput = '';
    $schemas = $schemas.filter(x => x !== e);
    $current = null;
  }

  function validate(e) {
    const isValid = /^[a-zA-Z0-9_#$%][\w.]*?$/.test(e.target.value);

    if (isValid) {
      e.target.classList.remove('invalid');
      return true;
    }

    if (!e.target.classList.contains('invalid')) {
      e.target.classList.add('invalid');
      return false;
    }
  }

  function update(e) {
    if (validate(e) && e.keyCode === 13) {
      $current.filename = e.target.value;
      isEditing = false;
      e.target.value = '';
    }

    if (e.keyCode === 27) {
      isEditing = false;
    }
  }

  function submit(e) {
    if (validate(e) && e.keyCode === 13) {
      $schemas = $schemas.concat({ filename: e.target.value, content: buffer });
      $current = $schemas[$schemas.length - 1];
      isAdding = false;
      e.target.value = '';
    }

    if (e.keyCode === 27) {
      $current = selected;
      isAdding = false;
    }
  }

  // FIXME: how formatting should work?
  // it should not affect current state, just formatting!
  function refresh() {
    try {
      editInput = JSON.stringify(JSON.parse($current.content), null, 2);
      // if (isYAML) {
      //   // outputMode = 'yaml';
      //   // Encoder = YAML;
      // } else {
      //   editInput = JSON.stringify(value, null, 2);
      //   // outputMode = 'json';
      //   // Encoder = JSON;
      // }
    } catch (e) {
      editInput = $current.content;
      // outputMode = 'json';
      // Encoder = JSON;
    }
  }

  function format(e) {
    value = Encoder.parse($current.content);
    isYAML = e.detail;
    refresh();
  }

  function sync(e) {
    buffer = e.detail;

    if ($current) {
      $current.content = buffer;
    }
  }

  function add() {
    buffer = editInput = '';
    selected = $current;
    isAdding = true;
    $current = null;

    setTimeout(() => {
      input.focus();
    }, 60);
  }

  function gen() {
    const opts = JSON.parse(window.localStorage._OPTS);
    const value = opts.random;

    opts.random = value
      ? (() => value)
      : Math.random;

    let schema = {};
    let refs = [];

    try {
      schema = Encoder.parse($current.content);
      refs = $schemas.map(x => Encoder.parse(x.content));
    } catch (e) {
      // do nothing
    }

    JSONSchemaFaker.option(opts);
    JSONSchemaFaker.resolve(schema, refs)
      .then(result => { objectOutput = Encoder.stringify(result, null, 2); });
  }

  router.subscribe(async info => {
    if (!window.location.hash) {
      pending = false;
      return;
    }

    data = await loadFrom(info.path.substr(1));
    buffer = editInput = '';
    pending = false;
    isAdding = false;
    isEditing = false;

    $schemas = Object.keys(data.files)
      .filter(x => ['text/plain', 'application/json'].includes(data.files[x].type))
      .reduce((prev, cur) => {
        prev.push(data.files[cur]);
        return prev;
      }, []);

    $current = $schemas[0];
  });

  $: if ($current) {
    refresh();
  } else {
    objectOutput = '{}';
    buffer = editInput = '';
    $current = { content: '' };
  }
</script>

<div class="nosl">
  {#if pending}
    Loading gist...
  {:else}
    <div class="flx Tabs">
      {#each $schemas as info}
        {#if $current === info}
          <span class="sel">
            {#if isEditing}
              <input
                class="nb"
                on:keyup={update}
                bind:this={input}
                type="text"
                spellcheck="false"
                placeholder={info.filename}
              />
            {:else}
              <span on:dblclick={() => select(info, true)}>{info.filename}</span>
            {/if}
            <button class="a nb ml" on:click={() => remove(info)}>&times;</button>
          </span>
        {:else}
          <button class="a" on:click={() => select(info)}>{info.filename}</button>
        {/if}
      {/each}
        {#if isAdding}
          <span class="sel">
            <input
              class="nb"
              on:keyup={submit}
              bind:this={input}
              type="text"
              spellcheck="false"
              placeholder="Add ..."
            />
          </span>
        {:else}
          <span>
            <button class="a nb nbk" on:click={add}>Add ...</button>
          </span>
        {/if}
    </div>
    <div class="md-flx">
      <Ace mode={outputMode} value={editInput} on:change={sync}>
        <!--<div class="abs r0 t0 z1">
          <Toggle on="YAML" off="JSON" on:change={format} value={isYAML} />
        </div>-->
      </Ace>
      <Ace mode={outputMode} value={objectOutput} readonly>
        <span class="abs r0 t0 z1">
          <button class="bu" on:click={gen}>Generate</button>
        </span>
      </Ace>
    </div>
  {/if}
</div>
