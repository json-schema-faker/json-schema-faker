<template lang="pug">
  .Dropdown.f
    .Dropdown--arrow

    select.a(v-model='selectedValue' tabindex=-1)
      option(v-for='x in value') {{x}}

    .Dropdown--value.nosl
      input(
        @input='inputValue'
        @keydown='submitValue'
        :class='shouldUpdate && { "-new": isNew, "-edit": hasChanged, "-remove": canBeDeleted }'
        :tabindex='tabindex'
        :placeholder='placeholder'
        ref='input')
    .Dropdown--actions.nosl(v-bind:class='{ "-show": shouldUpdate }')
      a.a.tdn.sp.pd(tabindex=-1 @click='addValue' v-if='isNew') Add
      a.a.tdn.sp.pd(tabindex=-1 @click='updateValue' v-if='hasChanged') Update
      a.a.tdn.sp.pd(tabindex=-1 @click='removeValue' v-if='canBeDeleted') Delete
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
      label: '',
      isNew: false,
      hasChanged: false,
      shouldUpdate: false,
      canBeDeleted: false,
      selectedValue: null,
    };
  },
  methods: {
    change() {
      this.$emit('change', { setValues: this.value });
    },
    reset() {
      this.shouldUpdate = true;
      this.canBeDeleted = true;
      this.hasChanged = false;
      this.isNew = false;

      this.$refs.input.focus();
    },
    update(value) {
      if (value) {
        this.selectedValue = value;
      }
    },
    inputValue(e) {
      const _value = e.target.value;

      if (!_value) {
        this.shouldUpdate = false;
        return;
      }

      const _new = this.value.indexOf(_value) === -1;
      const _actual = this.selectedValue;
      const _changed = _value !== _actual;

      this.isNew = _new;
      this.hasChanged = _actual !== null && _changed;
      this.shouldUpdate = _new || _changed === false;
      this.canBeDeleted = !_new && _actual !== null;
    },
    submitValue(e) {
      switch (e.key) {
        case 'Enter':
          this.addValue();
        break;

        case 'ArrowUp':
          if (!this.hasChanged) {
            const val = this.value;
            const dec = val.indexOf(this.selectedValue);

            if (dec > 0) {
              this.update(val[dec - 1]);
            } else {
              this.update(val[val.length - 1]);
            }
          }
        break;

        case 'ArrowDown':
          if (!this.hasChanged) {
            const val = this.value;
            const inc = val.indexOf(this.selectedValue);

            if (inc < (val.length - 1)) {
              this.update(val[inc + 1]);
            } else {
              this.update(val[0]);
            }
          }
        break;
      }
    },
    addValue() {
      if (this.$refs.input.value && this.value.indexOf(this.$refs.input.value) === -1) {
        this.$emit('change', { addValue: this.$refs.input.value });
        this.selectedValue = this.$refs.input.value;
        this.value.push(this.$refs.input.value);
        this.reset();
        this.change();
      }
    },
    updateValue() {
      const _actual = this.selectedValue;
      const _value = this.$refs.input.value;

      this.value.forEach((value, i) => {
        if (value === _actual) {
          this.$emit('change', { updateValue: _value, oldValue: _actual });
          this.value[i] = _value;
        }
      });

      this.reset();
      this.change();
    },
    removeValue() {
      const val = this.value;
      const key = val.indexOf(this.selectedValue);

      this.$emit('change', { removeValue: this.value.splice(key, 1) });
      this.reset();
      this.change();

      if (!val.length) {
        this.shouldUpdate = false;
        this.selectedValue = null;
        this.$refs.input.value = '';

        return false;
      }

      if (key > 0) {
        this.update(val[key - 1]);
      } else {
        this.update(val[0]);
      }
    },
  },
  watch: {
    value(newValue) {
      this.canBeDeleted = newValue.length > 0;
      this.shouldUpdate = newValue.length > 0;

      if (newValue.length && !this.$refs.input.value) {
        this.$refs.input.value = newValue[newValue.length - 1];
        this.$refs.input.focus();
      }

      if (!newValue.length) {
        this.$refs.input.value = '';
      }
    },
    selectedValue(newValue) {
      if (newValue) {
        this.$emit('change', { selectedValue: newValue });
        this.$refs.input.value = newValue;
        this.$refs.input.focus();
      } else {
        this.$refs.input.value = '';
      }
    },
  },
};
</script>
