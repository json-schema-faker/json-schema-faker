<script>
  import Modal from './Modal.svelte';
  import { options } from './gists';

  /* global JSONSchemaFaker */
  const defaults = JSONSchemaFaker.option.getDefaults();
  const opts = Object.keys(defaults).map(key => getType(key, defaults[key]));
  const vals = [undefined, 0, -1, null, true, false, 'string', 'number', 'integer', 'boolean', 'object', 'array'];

  // FIXME: componentize options, subscribe to them and update global jsf options on change
  function getType(k, v) {
    const extraProps = {};
    let fixedType;

    if (typeof v === 'boolean') {
      fixedType = 'checkbox';
    }

    if (typeof v === 'number') {
      fixedType = 'number';
    }

    if (v === null || typeof v === 'function') {
      if (k === 'maxItems' || k === 'maxLength') {
        fixedType = 'number';
      }

      if (k === 'random' || k === 'optionalsProbability') {
        extraProps.step = k === 'random' ? '0.01' : '0.1';
        fixedType = 'number';
      }
    }

    if (Array.isArray(v)) {
      fixedType = 'text';
    }

    const result = ($options && $options[k]) || defaults[k];

    if (fixedType !== 'checkbox') {
      extraProps.class = 'f num';
      extraProps.value = result;
    } else {
      extraProps.checked = result;
    }

    if (fixedType) {
      extraProps.type = fixedType;
    }

    return {
      ...extraProps,
      name: k,
      id: k,
    };
  }

  function update(e, option) {
    if (!$options) $options = {};
    if (option.type === 'number') {
      $options[option.name] = parseFloat(e.target.value);
    } else if (option.type === 'checkbox') {
      $options[option.name] = e.target.checked;
    } else  {
      $options[option.name] = e.target.value;
    }
  }

  function reset() {
    $options = null;

    Object.keys(defaults).forEach(key => {
      const node = document.querySelector(`[name=${key}]`);
      const { type, value } = getType(key, defaults[key]);

      if (typeof value === 'number') {
        node.value = value;
      } else if (Array.isArray(value)) {
        node.value = value.join(',');
      } else {
        node.value = '';
      }
    });
  }
</script>

<Modal let:back>
  Reference: <a href="//github.com/json-schema-faker/json-schema-faker/tree/master/docs#available-options" target="_blank">available options</a>

  <hr />

  <form on:submit|preventDefault>
    <ul class="lr">
      {#each opts as option}
        <li class="nosl flx mb">
          <label for={option.id} class="cl-6">{option.name}</label>
          <span>
            {#if option.type}
              <input {...option} on:change={e => update(e, option)}>
            {:else}
              <select {...option} on:change={e => update(e, option)}>
                {#each vals as value}
                  <option {value} selected={value === option.value}>{typeof value !== 'undefined' ? JSON.stringify(value) : ''}</option>
                {/each}
              </select>
            {/if}
          </span>
        </li>
      {/each}
    </ul>
    <button class="bu" on:click={reset} disabled={$options === null}>Reset to defaults</button>
    <button class="bu" on:click={back}>Apply</button>
  </form>

  <hr />

  <a href="#gist/da0af4611cb5622b54aff57283560da3">boolean</a> |
  <a href="#gist/4199ca90fb5cd05337824b0695d17b5e">integer</a> |
  <a href="#gist/d9e27543d84157c1672f87e93ac250cc">inner-references</a> |
  <a href="#gist/5f81f118fbd4eac01ccacf23a061a8b9">external-references</a> |
  <a href="#gist/cbb4871d1d2f44760ddafdaa056e1926">enums</a> |
  <a href="#gist/1f1196844bead96e021ffbd597edcffa">fixed values</a> |
  <a href="#gist/f4ad1818735f0d0babdc1f12b92013f1">n-times repeated</a> |
  <a href="#gist/1902737e7bef9573af02a3fc49761c13">faker-properties</a> |
  <a href="#gist/1a7db173362b127a826a5c2fa7de7561">faker.fake()</a> |
  <a href="#gist/5dd364aad2d48729efff686c5f7c44b2">chance-guid</a> |
  <a href="#gist/682f97a2e28e230b51810c55b92f4cdc">chance-name</a> |
  <a href="#gist/426c2d177243cd2c52594f92c1a7862e">chance-properties</a> |
  <a href="#gist/d3e75b22ad33e4440df19e0cc060c9f3/0.5.0-rc3">remote-schemas (^0.5.x)</a>

  <hr />

  <a href="http://json-schema.org" target="_blank">JSON-Schema.org</a> |
  <a href="//github.com/json-schema-faker/json-schema-faker/" target="_blank">GitHub</a> / <a href="//travis-ci.org/json-schema-faker/json-schema-faker" target="_blank">CI</a> |
  <a href="//github.com/json-schema-faker/json-schema-faker/issues/new" target="_blank">Contribution</a> |
  <a href="//github.com/json-schema-faker/angular-jsf" target="_blank">AngularJS module</a> |
  <a href="//github.com/json-schema-faker/grunt-jsonschema-faker" target="_blank">Grunt plugin</a> |
  <a href="//github.com/json-schema-faker/json-schema-server" target="_blank">JSF Server</a>
</Modal>
