import { writable } from 'svelte/store';

export const BASE_URL = 'https://github.com';
export const API_URL = 'https://api.github.com';

/* global AUTH_ID, AUTH_SECRET, PROXY_URL */
/* global Promise, fetch */

const data = window.localStorage._DATA;

// shared state
export const loggedIn = writable(!!data);
export const session = writable(data ? JSON.parse(data) : {});
export const schemas = writable([]);
export const current = writable({});
export const options = writable(null);

// builds a fixed URL for github.api calls
export function getUrl(x, path, params) {
  const url = `${x}${path}?client_id=${AUTH_ID}&client_secret=${AUTH_SECRET}`;
  const redirect = `redirect_uri=${encodeURIComponent(`${location.protocol}//${location.host}/`)}`;

  return params
    ? `${url}&${Object.keys(params).map(k => `${k}=${params[k]}`).join('&')}&${redirect}`
    : `${url}${params !== false ? `&${redirect}` : ''}`;
}

export function getJSON(path, params, _options) {
  return fetch(`${PROXY_URL}${getUrl(API_URL, path, _options)}`, {
    ...params,
    headers: {
      Authorization: `bearer ${window.localStorage._AUTH}`,
    },
  }).then(res => res.json());
}

export function loadFrom(uri) {
  const tmp = uri.replace('#', '').split('/');

  if (tmp.length === 1) {
    // old style URI-based schema - supported for backward compatibility
    // example: http://json-schema-faker.js.org/#%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
    return Promise.resolve({
      files: {
        // legacy and ugly
        'schema.json': {
          content: decodeURIComponent(tmp[0]),
        },
      },
    });
  }

  const [type, hash] = tmp;

  switch (type) {
    case 'gist':
      // example: http://json-schema-faker.js.org/#gist/c347f2f6083fe81a1fe43d17b83125d7
      return fetch(getUrl(API_URL, `/gists/${hash}`))
        .then(res => res.json());

    case 'uri':
      // example: http://json-schema-faker.js.org/#uri/%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
      return Promise.resolve({
        files: {
          Example: {
            content: decodeURIComponent(hash),
          },
        },
      });

    default:
      throw new Error('Unknown storage type');
  }
}

export function save(schemas) {
  const _files = {
    // fresh copy of current options
    '_options.json': {
      content: JSON.stringify($options),
    },
  };

  // store each given schema
  Object.keys(schemas).forEach(key => {
    _files[key] = { content: schemas[key].value };
  });

  // FIXME: patch gist if owner matches?

  const url = getUrl(API_URL, '/gists', false);
  const fixedUrl = `${PROXY_URL}${url}`;

  return fetch(fixedUrl, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${tokenId}`,
      Accept: 'application/json',
    },
    body: JSON.stringify({
      description: 'Schemas created by http://json-schema-faker.js.org',
      files: _files,
    }),
  }).then(res => res.json())
    .then(data => {
      if (data.message) {
        throw new Error(data.message);
      }

      return data;
    });
}

export function auth(tokenId, callback) {
  window.localStorage._AUTH = '';

  const url = getUrl(BASE_URL, '/login/oauth/access_token', {
    code: tokenId,
  });

  fetch(`${PROXY_URL}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }).then(res => res.json())
    .then(result => {
      if (result.access_token) {
        window.localStorage._AUTH = result.access_token;
        setTimeout(callback, 120);
      }
    });
}

export function url() {
  return getUrl(BASE_URL, '/login/oauth/authorize', {
    scope: 'gist,read:user',
  });
}

export function all() {
  return getJSON('/gists');
}

export function me() {
  return getJSON('/user');
}
