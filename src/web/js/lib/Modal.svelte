<script>
  import { navigateTo } from 'yrv';
  import { In } from 'svql';
</script>
<In autofocus visible modal on:cancel={() => navigateTo('/')}>
  <slot />
</In>
