<script>
  import { createEventDispatcher } from 'svelte';

  export let value = false;
  export let off = 'Off';
  export let on = 'On';

  const dispatch = createEventDispatcher();

  function set(v) {
    dispatch('change', v);
    value = v;
  }
</script>

<ul class="lr ln flx">
  <li class="sp">
    <a href="#{off}" class="a" class:-on={!value} on:click|preventDefault={() => set(false)}>{off}</a>
  </li>
  <li class="sp">
    <a href="#{on}" class="a" class:-on={value} on:click|preventDefault={() => set(true)}>{on}</a>
  </li>
</ul>
