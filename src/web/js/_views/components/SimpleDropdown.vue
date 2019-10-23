<template lang="pug">
  .Dropdown.f
    select.a(v-model='selectedValue' :tabindex='tabindex' @change='onChange')
      option(v-for='x in value') {{x}}

    .Dropdown--arrow
    .Dropdown--value.nosl
      span.db.tr {{selectedValue || placeholder}}
</template>

<script>
export default {
  props: [
    'value',
    'tabindex',
    'placeholder',
  ],
  data() {
    return {
      selectedValue: null,
    };
  },
  methods: {
    onChange() {
      this.$emit('change', this.selectedValue);
    },
  },
};
</script>
