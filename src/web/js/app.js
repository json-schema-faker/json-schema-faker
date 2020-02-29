import App from './lib/App.svelte';
import { auth } from './lib/gists';

if (window.location.search.includes('?code=')) {
  auth(window.location.search.split('?code=')[1], () => {
    const cleanUrl = window.location.href.split('?')[0];

    window.history.replaceState(null, '', cleanUrl);

    if (window.opener) {
      window.close();
    }
  });
}

function reset() {
  window.localStorage._OPTS = JSON.stringify(JSONSchemaFaker.option.getDefaults());
}

function reload() {
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

if (!window.localStorage._OPTS && typeof JSONSchemaFaker !== 'undefined') {
  reset();
}

reload();

document.querySelector('[name="jsfOptions.reset"]').addEventListener('click', () => {
  reset();
  reload();
});

new App({
  target: document.getElementById('auth'),
});
