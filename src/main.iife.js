// export { default } from './main.esm';
import { setDependencies } from './lib/vendor';
import JSONSchemaFaker from './lib';

if (typeof window !== 'undefined') {
  setDependencies({
    $RefParser: window.$RefParser,
    jsonPath: window.jsonPath,
  });

  window.JSONSchemaFaker = JSONSchemaFaker;
}
