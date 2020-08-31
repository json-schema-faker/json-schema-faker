<script>
  import { Router, Route, Link, navigateTo } from 'yrv';
  import {
    me, url, schemas, current, session, loggedIn,
  } from './gists';

  import Save from './Save.svelte';
  import Gists from './Gists.svelte';

  function done() {
    me().then(data => {
      $loggedIn = true;
      $session = {
        username: data.login,
        fullname: data.name,
      };

      window.localStorage._DATA = JSON.stringify($session);
    });
  }

  function exit() {
    window.localStorage._AUTH = '';
    $loggedIn = null;
    navigateTo('/');
  }

  function set(e) {
    if (e.target.name.indexOf('jsfOptions.') === 0 && e.target.tagName === 'INPUT') {
      const opts = window.localStorage._OPTS ? JSON.parse(window.localStorage._OPTS) : {};
      const key = e.target.name.split('.')[1];

      let val = e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.value;

      if (key === 'ignoreProperties') {
        val = val.split(/\W+/);
      }

      opts[key] = typeof val === 'string' && /^\d+(\.\d+)?$/.test(val)
        ? parseFloat(val)
        : val;

      window.localStorage._OPTS = JSON.stringify(opts);
    }
  }

  function add() {
    $schemas = [];
    $current = null;
    navigateTo('/');
  }
</script>

<svelte:window on:change={set} />

{#if $loggedIn}
  <span class="nosl github-icon">{$session.fullname || $session.username}</span>
  <ul class="lr z2 nosl menu">
    <li><Link href="/save">Save project...</Link></li>
    <li><Link href="/new" on:click={add}>New project</Link></li>
    <li><Link href="/gists">Schemas</Link></li>
    <li><Link href="/logout" on:click={exit}>Log out</Link></li>
  </ul>
{:else}
  <Link open="width=400,height=640" href={url()} on:close={done} class="a github-icon">Share link? Log in</Link>
{/if}

<Router>
  <Route path="/gists" component={Gists} />
  <Route path="/save" component={Save} />
</Router>
