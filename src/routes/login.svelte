<script>
  import Card from '../front/components/Card.svelte';
  import Input from '../front/components/Input.svelte';
  import { scale } from 'svelte/transition';
  import { goto } from '@sapper/app';
  import axios from 'axios';
  import { onMount } from 'svelte';

  import { user } from '../stores.js';

  let userLogin = {
    email: '',
    pass: '',
  };

  let login = '';

  let loading = false;
  let loginFailure = false;

  const createSession = async () => {
    try {
      loginFailure = false;
      loading = true;
      let response = await axios.post('/api/session', {
        email: userLogin.email,
        password: userLogin.pass,
      });

      const {
        id,
        name,
        email,
        avatar,
        apelido,
        bar,
        cpf,
        pontos,
        hash_code,
      } = response.data.user;

      $user.client.status = bar ? 'bar' : 'client';
      $user.client.id = id;
      $user.client.name = name;
      $user.client.email = email;
      $user.client.cpf = cpf;
      $user.client.cover = avatar.url;
      $user.client.token = response.data.token;
      $user.client.pontos = pontos;
      $user.client.hash_code = hash_code;

      console.log($user);
      localStorage.setItem('user', JSON.stringify($user));

      console.log($user);
      goto('/');
    } catch {
      loginFailure = true;
    }
    loading = false;
  };
</script>

<style>
  .flat {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    top: 25em;
    left: 0;
    position: absolute;
    color: #f0f0f0 !important;
  }

  .flat i {
    font-size: 15px;
    margin-right: 10px;
    color: #f0f0f0 !important;
  }

  p {
    font-size: 0.9em;
    margin: 1.8em 0;
    text-align: center;
  }
</style>

<div
  class="container"
  in:scale={{ opacity: 0, start: 0.5, delay: 600, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}>

  <Card top="5">

    <!-- title -->
    <div class="title font">Login</div>

    <!-- form login -->
    <form on:submit|preventDefault={login}>
      <!-- email -->
      <Input margin="1">
        <input
          type="email"
          bind:value={userLogin.email}
          required
          placeholder="E-mail" />
      </Input>

      <!-- password -->
      <Input margin="1">
        <input
          type="password"
          bind:value={userLogin.pass}
          required
          placeholder="Senha" />
      </Input>

      {#if loginFailure}
        <p>E-mail ou senha inválidos</p>
      {/if}

      <!-- button -->
      <button on:click={createSession} class="btn black">
        {#if loading}
          <div class="spiner" />
        {:else}Login{/if}
      </button>

      <!-- form -->
    </form>

    <!-- card -->
  </Card>

  <!-- btn home -->
  <div on:click={() => goto('/')} class="btn flat">
    <i class="material-icons">home</i>
    Voltar
  </div>

  <!-- container -->
</div>
