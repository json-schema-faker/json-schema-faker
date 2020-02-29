<template lang="pug">
  .rel
    .AceEditor.nosl.f.b(ref='editor')
    .abs.t0.r0.z1.nosl(v-if='!readonly')
      ul.lr.ln.flx
        li.sp: a.a(:class='{ "-on": !yaml }' @click='disable') JSON
        li.sp: a.a(:class='{ "-on": yaml }' @click='enable') YAML
</template>

<script>
/* global ace, YAML */

export default {
  props: [
    'value',
    'readonly',
  ],
  data() {
    return {
      yaml: false,
    };
  },
  mounted() {
    this.$e = ace.edit(this.$refs.editor);

    this.$e.setTheme('ace/theme/github');
    this.$e.getSession().setTabSize(2);
    this.$e.setShowPrintMargin(false);

    this.$e.$blockScrolling = Infinity;

    this._isWatching = false;
    this._backupObj = null;

    this.change(this.value);
    this.setMode();

    if (this.readonly) {
      this.$e.setReadOnly(true);
      return;
    }

    this.$e.getSession().on('change', () => {
      if (!this._isWatching) {
        this.change(this.$e.getValue());
      }
    });
  },
  methods: {
    disable() {
      this.yaml = false;
      this.setMode();
    },
    enable() {
      this.yaml = true;
      this.setMode();
    },
    change(value) {
      const _old = this._backupObj;

      try {
        if (this.yaml) {
          this._backupObj = YAML.parse(value) || this._backupObj;
        } else {
          this._backupObj = JSON.parse(value) || this._backupObj;
        }
      } catch (e) {
        // eslint-disable-line
      }

      if (_old !== this._backupObj) {
        this.$emit('change', {
          value: this._backupObj,
          source: value,
        });
      }
    },
    update() {
      if (this.value) {
        this.$e.setValue(this.yaml
          ? YAML.dump(this._backupObj, 6, 2)
          : JSON.stringify(this._backupObj, null, 2));
      }
    },
    setMode() {
      this.$e.getSession().setMode(`ace/mode/${this.yaml ? 'yaml' : 'json'}`);
      this.update();
    },
  },
  watch: {
    value() {
      this._isWatching = true;
      this.change(this.value);
      this.update();
      this._isWatching = false;
    },
  },
};
</script>
