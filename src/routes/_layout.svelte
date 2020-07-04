<script>
  import Navbar from '../front/components/Navbar.svelte';
  import ModalMenu from '../front/components/modal/ModalMenu.svelte';
  import ModalProfile from '../front/components/modal/ModalProfile.svelte';
  import { modalSet } from '../stores';
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';

  import { user } from '../stores';

  onMount(async () => {
    const userLogged = await localStorage.getItem('user');
    if (userLogged !== null) {
      const usuarioLogado = JSON.parse(userLogged);
      $user = JSON.parse(userLogged);
    }

    console.log($user);
  });

  async () => {
    console.log($user);
    (await $user.client.status) !== '' ? goto('/') : alert('bobao');
  };
</script>

<style>
  main {
    font-family: 'Roboto', sans-serif;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: linear-gradient(180deg, #fd2727 0%, #5b1414 100%);
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 3em;
    z-index: 2;
    overflow: hidden;
    overflow-y: scroll;
  }

  :root {
    --tamanho: -40px;
  }

  .bolls-1,
  .bolls-2 {
    position: fixed;
  }

  .bolls-1 {
    top: calc(-190px + var(--tamanho));
    z-index: 800;
    left: -28%;
    width: 150%;
  }

  .bolls-2 {
    top: calc(-290px + var(--tamanho));
    z-index: 1;
    left: -70%;
    width: 230%;
  }

  @media (min-width: 385px) {
    :root {
      --tamanho: -70px;
    }
  }

  @media (min-width: 400px) {
    :root {
      --tamanho: -90px;
    }
  }

  @media (min-width: 415px) {
    :root {
      --tamanho: -120px;
    }
  }

  @media (min-width: 425px) {
    :root {
      --tamanho: -135px;
    }
  }

  @media (min-width: 445px) {
    :root {
      --tamanho: -160px;
    }
  }

  @media (min-width: 470px) {
    :root {
      --tamanho: -190px;
    }
  }

  @media (min-width: 500px) {
    :root {
      --tamanho: -210px;
    }
  }

  @media (min-width: 530px) {
    :root {
      --tamanho: -260px;
    }

    .bolls-1,
    .bolls-2 {
      display: none;
    }
  }
</style>

<!-- modals -->
{#if $modalSet.menu}
  <ModalMenu />
{/if}
{#if $modalSet.profile}
  <ModalProfile />
{/if}

<Navbar />

<!-- bolls nav -->
<img src="/img/bolls-1.svg" alt="" class="bolls-1" />

<main>
  <div class="content">
    <slot />
  </div>

  <!-- bolls bg -->
  <img src="/img/bolls-2.svg" alt="" class="bolls-2" />
</main>
