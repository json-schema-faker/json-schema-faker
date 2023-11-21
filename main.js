import { JSONSchemaFaker } from './dist/main.mjs';

document.querySelector('#app').innerHTML = `
  <code>const: ${JSONSchemaFaker.generate({ const: 42 })}</code>
`;
