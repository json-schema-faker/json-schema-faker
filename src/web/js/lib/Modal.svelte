<script>
  import { navigateTo } from 'yrv';
  import { Fence } from 'smoo';

  function back() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigateTo('/');
  }
</script>
<Fence noform autofocus visible modal on:cancel={back}>
  <div class="formator p" slot="main">
    <slot {back} />
  </div>
</Fence>
