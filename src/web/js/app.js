import { auth } from './lib/gists';

import Auth from './lib/Auth.svelte';
import Editor from './lib/Editor.svelte';

function main() {
  if (typeof JSONSchemaFaker !== 'undefined') {
    JSONSchemaFaker.extend('faker', () => window.faker);
    JSONSchemaFaker.extend('chance', () => window.chance);
  }

  // initialize modules
  new Auth({ target: document.getElementById('auth') });
  new Editor({ target: document.getElementById('editor') });
}

function debug(msg) {
  document.querySelector('.loading-overlay .jsf-logo').classList.remove('float');
  document.querySelector('.loading-overlay .tac').innerHTML = `
    <p style="max-width:200px" class="mt mb cnt">${msg}</p>
    <button onclick="window.close()" class="bu">Close window</button>
  `;
}

// handles authoentication through github-api
if (window.location.search.includes('?code=')) {
  document.querySelector('.loading-overlay .tac').innerText = 'Authenticating...';

  auth(window.location.search.split('?code=')[1], () => {
    const cleanUrl = window.location.href.split('?')[0];

    window.history.replaceState(null, '', cleanUrl);

    if (window.opener) {
      window.close();
    }
  });
} else if (window.location.search.includes('?error=')) {
  const message = window.location.search.split('error_description=')[1];
  const error = message.split('&')[0].replace(/\+/g, ' ');

  debug(error);
} else {
  setTimeout(() => {
    document.querySelector('.loading-overlay').classList.add('fade-out');
    main();
  }, 1260);
}
