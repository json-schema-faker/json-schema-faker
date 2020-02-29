// FIXME: how-to-do a proper api-call?
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

/* global AUTH_ID, AUTH_SECRET */
/* global Promise, fetch */

export function debounce(ms, fn, ctx) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => {
      fn.apply(ctx, args);
    }, ms);
  };
}

export function throttle(ms, fn, ctx) {
  ms = ms || 250;

  let last;
  let t;

  return (...args) => {
    const now = +new Date();

    if (last && now < last + ms) {
      clearTimeout(t);
      t = setTimeout(() => {
        last = now;
        fn.apply(ctx, args);
      }, ms);
    } else {
      last = now;
      fn.apply(ctx, args);
    }
  };
}

function getUrl(x, path, params) {
  const url = `${x}${path}?client_id=${AUTH_ID}&client_secret=${AUTH_SECRET}`;
  const redirect = `redirect_uri=${encodeURIComponent(`${location.protocol}//${location.host}/`)}`;

  return params
    ? `${url}&${Object.keys(params).map(k => `${k}=${params[k]}`).join('&')}&${redirect}`
    : `${url}${params !== false ? `&${redirect}` : ''}`;
}

export const GISTS = {
  BASE_URL: 'https://github.com',
  API_URL: 'https://api.github.com',

  loadFrom(uri) {
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
        return fetch(getUrl(GISTS.API_URL, `/gists/${hash}`))
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
  },
  save(schemas) {
    const _files = {};

    Object.keys(schemas).forEach(key => {
      _files[key] = { content: schemas[key].value };
    });

    const tokenId = window.localStorage._AUTH;

    if (tokenId) {
      const url = getUrl(GISTS.API_URL, '/gists', false);
      const fixedUrl = `${PROXY_URL}${url}`;

      return fetch(fixedUrl, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${tokenId}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({
          description: 'JSON Schema created by http://json-schema-faker.js.org',
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
  },
  auth(tokenId, callback) {
    window.localStorage._AUTH = '';

    const url = getUrl(GISTS.BASE_URL, '/login/oauth/access_token', {
      code: tokenId,
    });

    const fixedUrl = `${PROXY_URL}${url}`;

    fetch(fixedUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json())
      .then(result => {
        if (result.access_token) {
          window.localStorage._AUTH = result.access_token;
          setTimeout(callback, 260);
        }
      });
  },
  url() {
    return getUrl(GISTS.BASE_URL, '/login/oauth/authorize', {
      scope: 'gist',
    });
  },
};

export default {
  GISTS,
  throttle,
  debounce,
};
