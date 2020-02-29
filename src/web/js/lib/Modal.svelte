<script>
  import { navigateTo } from 'yrv';
  import { In } from 'svql';
</script>
<In visible modal on:cancel={() => navigateTo('/')}>
  <slot />
</In>
