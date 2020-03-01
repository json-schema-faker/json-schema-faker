import { auth } from './lib/gists';

import Auth from './lib/Auth.svelte';
import Editor from './lib/Editor.svelte';

// handles authoentication through github-api
if (window.location.search.includes('?code=')) {
  auth(window.location.search.split('?code=')[1], () => {
    const cleanUrl = window.location.href.split('?')[0];

    window.history.replaceState(null, '', cleanUrl);

    if (window.opener) {
      window.close();
    }
  });
}

// handles optiona menu nuances
function resetOptions() {
  window.localStorage._OPTS = JSON.stringify(JSONSchemaFaker.option.getDefaults());
}

function reloadOptions() {
  const options = document.querySelectorAll('[name^=jsfOptions]');
  const defaults = JSON.parse(window.localStorage._OPTS);

  for (let i = 0, c = options.length; i < c; i++) {
    const key = options[i].name.replace('jsfOptions.', '');
    const val = defaults[key];

    if (key === 'ignoreProperties') options[i].value = val.join(', ');
    else if (typeof val === 'boolean') options[i].checked = val;
    else options[i].value = val || '';
  }
}

if (typeof JSONSchemaFaker !== 'undefined') {
  JSONSchemaFaker.extend('faker', () => window.faker);
  JSONSchemaFaker.extend('chance', () => window.chance);

  if (!window.localStorage._OPTS) {
    resetOptions();
  }
}

reloadOptions();

document.querySelector('[name="jsfOptions.reset"]').addEventListener('click', () => {
  resetOptions();
  reloadOptions();
});

// initialize modules
new Auth({ target: document.getElementById('auth') });
new Editor({ target: document.getElementById('editor') });
