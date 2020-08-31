<script>
  import { navigateTo } from 'yrv';
  import { In } from 'svql';

  function back() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigateTo('/');
  }
</script>
<In autofocus visible modal on:cancel={back}>
  <slot {back} />
</In>
