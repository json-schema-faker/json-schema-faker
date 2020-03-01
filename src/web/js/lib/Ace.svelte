<script>
  import { onMount } from 'svelte';

  let cssClass = '';

  export let mode = 'javascript';
  export let theme = 'github';
  export let value = '';
  export let readonly = false;

  export { cssClass as class };

  let target;
  let targetElement;

  /* global ace */
  onMount(() => {
    targetElement = ace.edit(target);
    targetElement.session.setTabSize(2);
    targetElement.setShowPrintMargin(false);
    if (readonly) targetElement.setReadOnly(true);
    return () => targetElement.destroy();
  });

  $: if (targetElement) {
    targetElement.setValue(value);
    targetElement.setTheme(`ace/theme/${theme}`);
    targetElement.session.setMode(`ace/mode/${mode}`);
  }
</script>

<div class="Ace {cssClass}" bind:this={target} />
