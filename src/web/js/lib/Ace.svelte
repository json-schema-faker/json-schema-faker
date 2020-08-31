<script>
  import { onMount, createEventDispatcher } from 'svelte';

  let cssClass = '';

  export let mode = 'javascript';
  export let theme = 'github';
  export let value = '';
  export let readonly = false;

  export { cssClass as class };

  let target;
  let targetElement;

  const dispatch = createEventDispatcher();

  /* global ace */
  onMount(() => {
    targetElement = ace.edit(target);
    targetElement.session.setTabSize(2);
    targetElement.setShowPrintMargin(false);
    targetElement.setOption('showLineNumbers', false);

    if (readonly) targetElement.setReadOnly(true);

    targetElement.session.on('change', () => {
      dispatch('change', targetElement.getValue());
    });

    return () => targetElement.destroy();
  });

  $: if (targetElement) {
    if (targetElement.getValue() !== value) {
      targetElement.setValue(value);
      targetElement.clearSelection();
    }

    targetElement.setTheme(`ace/theme/${theme}`);
    targetElement.session.setMode(`ace/mode/${mode}`);
  }
</script>

<div class="Ace-wrapper rel z1">
  <div class="Ace {cssClass}" bind:this={target} />
  <slot />
</div>
