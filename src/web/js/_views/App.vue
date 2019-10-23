<template lang="pug">
  .md-flx.flx-m
    .flx-a.md-cl-6
      .flx.flx-m
        .flx-a
          EditableDropdown(:value='savedSchemas' @change='setPayload' placeholder='Schema identifier, e.g. User' tabindex=1 ref='schemas')
        .flx-ml(v-if='hasValues')
          button.a.bu.db.nosl(@click='loginAction' v-if='!loggedIn') GitHub login
          button.a.bu.db.nosl(@click='synchronizeGist' v-else tabindex=2) Save as gist

      .mt(v-if='hasValues')
        JSONEditor(:value='inputJSON' @change='inputChange')

    .flx-a.md-cl-6
      .sm-flx.flx-m
        .flx-mt(v-if='hasValues')
          button.a.f.bu.db.cl-12.nosl(@click='generateOutput' tabindex=5) Generate example

      .mt(v-if='hasValues')
        JSONEditor(:value='outputJSON' readonly)

    .Toast(:class='[classes, { "-show": showMessage }]')
      .sm-flx.flx-m.flx-c
        .flx-a {{logMessage}}
        .flx-mr(v-if='hasValues')
          button.a.f.bu.db.cl-12.nosl(@click='closeLog' tabindex=6) OK
</template>

<script>
import { GISTS } from '../_util';

import JSONEditor from './components/JSONEditor.vue';
import SimpleDropdown from './components/SimpleDropdown.vue';
import EditableDropdown from './components/EditableDropdown.vue';

export default {
  data()  {
    return {
      libInfo: null,
      hasValues: false,
      showMessage: false,
      logMessage: '',
      classes: '',
      inputJSON: '',
      outputJSON: '',
      savedSchemas: [],
      availableAssets: [],
    };
  },
  computed: {
    loggedIn() {
      return typeof window.localStorage._AUTH !== 'undefined'
        && window.localStorage._AUTH !== '';
    },
    availableVersions() {
      return this.libInfo
        ? this.libInfo.files.map(x => x.version)
        : [];
    },
  },
  methods: {
    closeLog() {
      this.showMessage = false;
    },
    loginAction() {
      location.href = GISTS.url();
    },
    synchronizeGist(e) {
      this.$emit('synchronizeGist', e);
    },
    generateOutput(e) {
      this.$emit('generateOutput', e);
    },
    inputChange(value) {
      this.$emit('inputChange', value);
    },
    setFile(value) {
      this.$emit('setFile', value);
    },
    setVersion(value) {
      this.availableAssets = this.libInfo
        ? this.libInfo.files
          .filter(x => x.version === value)[0].files
          .filter(x => x.indexOf('.min') === -1)
        : [];

      this.$refs.assets.selectedValue = this.availableAssets[0];
      this.$refs.versions.selectedValue = value;
      this.$emit('setVersion', value);
    },
    setPayload(e) {
      this.$emit('setPayload', e);
    },
    logStatus(message, classList) {
      this.classes = classList;
      this.logMessage = message;
      this.showMessage = true;

      clearTimeout(this._timeout);

      this._timeout = setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    }
  },
  components: {
    JSONEditor,
    SimpleDropdown,
    EditableDropdown,
  },
};
</script>
