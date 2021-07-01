<script>
  export let name = null;
  export let size = 16;
</script>

<svg width={size} height={size}>
  <use xlink:href="#icon-{name}" />
</svg>
