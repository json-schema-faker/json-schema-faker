<script>
  import { Router, Route, Link, navigateTo } from 'yrv';
  import {
    me, url, schemas, current, session, loggedIn,
  } from './gists';

  import Opts from './Opts.svelte';
  import Save from './Save.svelte';
  import Gists from './Gists.svelte';
  import Modal from './Modal.svelte';

  function done() {
    me().then(data => {
      if (!data.login) return;

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

  function add() {
    $schemas = [];
    $current = null;
    navigateTo('/');
  }
</script>

<ul class="p lr ln mt rel jsf-about">
  <li class="sp pd dib nosl">
    <Link href="#options" class="a gear-icon">Options</Link>
  </li>
  <li class="ar dib">
    {#if $loggedIn}
      <Link href="#session" class="a nosl github-icon" title={$session.fullname}>{$session.username}</Link>
    {:else}
      <Link open="width=400,height=640" href={url()} on:close={done} class="a github-icon">Share link? Log in</Link>
    {/if}
  </li>
</ul>

<Router>
  <Route path="#options" component={Opts} />
  <Route path="#session">
    <Modal>
      <Link href="/" on:click={add}>New project</Link> |
      <Link href="/logout" on:click={exit}>Log out</Link>
      <Link href="#session/save">Save project...</Link> |
      <Link href="#session/open">Schemas</Link> |
      <Route path="/open" component={Gists} />
      <Route path="/save" component={Save} />
    </Modal>
  </Route>
</Router>
