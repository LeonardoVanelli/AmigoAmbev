<script>
  import SlideCard from '../front/components/SlideCard.svelte';
  import { goto } from '@sapper/app';
  import { scale } from 'svelte/transition';
  import Client from '../front/components/Client.svelte';
  import Bar from '../front/components/Bar.svelte';
  import { onMount } from 'svelte';

  import { user } from '../stores.js';

  let userStatus = '';

  onMount(async () => {
    const userLogged = await localStorage.getItem('user');
    if (userLogged !== null) {
      const usuarioLogado = JSON.parse(userLogged);
      $user = JSON.parse(userLogged);
    }
    userStatus = $user.client.status;
    console.log($user);
  });
</script>

<style>
  .btn-container {
    width: 60% !important;
    left: 20%;
    top: 23em;
    position: absolute;
    z-index: 10;
  }

  .btn {
    left: 0;
  }
</style>

<div
  class="container"
  in:scale={{ opacity: 0, start: 0.5, delay: 600, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}>

  {#if userStatus === ''}
    <!-- slide card -->
    <SlideCard />

    <!-- btn -->
    <div class="btn-container">
      <div on:click={() => goto('/register')} class="btn black shadow">
        Cadastro
      </div>

      <div on:click={() => goto('/login')} class="btn">Login</div>
    </div>
  {:else if userStatus === 'bar'}
    <!--pegadinha do malandro -->
    <Bar />
  {:else if userStatus === 'client'}
    <!-- view client -->
    <Client />
  {/if}
  <!-- container -->
</div>
