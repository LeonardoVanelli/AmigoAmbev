<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet } from '../../../stores';
  import { goto } from '@sapper/app';

  import { user } from '../../../stores';

  const btn = e => {
    $modalSet.menu = false;
  };

  const desconect = async () => {
    $modalSet.menu = false;
    $user.client.status = '';
    $user.client.id = 0;
    $user.client.name = '';
    $user.client.email = '';
    $user.client.cpf = '';
    $user.client.cover = '';
    $user.client.pontos = 0;
    $user.client.hash_code = '';

    $user.client.token = '';

    await localStorage.setItem('user', JSON.stringify($user));
    goto('/login');
  };
</script>

<style>
  .bg-modal {
    position: fixed;
    height: 150%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: 9990;
  }

  .close-modal {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 4em;
  }

  .btn {
    width: 0;
    height: 0;
  }

  .btn i {
    padding: 20px;
    background: #e02626;
    border-radius: 100%;
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.55);
  }

  .box {
    margin-top: 4em;
  }

  .flat {
    width: 100%;
    height: 3.1em;
  }
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="-3" top="3" color="white" height="20" delay="0">

      <!-- content -->
      <div class="box">
        <!-- feed -->
        <div class="btn flat" on:click={() => btn()}>Feed</div>

        <!-- Pontos -->
        <div
          class="btn flat"
          on:click={() => {
            $modalSet.score = true;
            btn();
          }}>
          Pontos
        </div>

        <!-- Meu QR -->
        <div
          class="btn flat"
          on:click={() => {
            $modalSet.qrCode = true;
            btn();
          }}>
          Meu QR Code
        </div>

        <!-- Desconectar -->
        <div class="btn flat" on:click={() => desconect()}>Desconectar</div>
      </div>

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div class="btn black" on:click={() => ($modalSet.menu = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
