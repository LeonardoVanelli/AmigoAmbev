<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import { goto } from '@sapper/app';
  import axios from 'axios';

  //core value
  let showPontos = $user.client.pontos;

  //close current modal
  const btn = e => {
    goto(e);
    $modalSet.profile = false;
  };

  //default frame breja png
  let brejaImage = 1;

  //animation breja png
  setInterval(() => {
    brejaImage = brejaImage + 1;

    if (brejaImage === 5) brejaImage = 1;
  }, 800);
</script>

<style>
  .cover {
    top: -200px;
    width: 100%;
    text-align: center;
  }

  .cover img {
    position: relative;
    width: 140px;
    height: auto;
  }

  p {
    position: relative;
    color: #feffc9;
    text-align: center;
    margin-bottom: 0.6em;
    margin-top: -2em;
  }

  .title {
    font-size: 3.2em;
  }

  .grid {
    display: grid;
    grid-template-areas: 'a a';
    grid-gap: 10px;
    width: 100%;
    margin-top: 0.6em;
  }

  .btn-bottom {
    flex: 1;
    width: 100%;
    padding: 0.7em 0;
    text-align: center;
    border-radius: 20px;
    font-size: 0.8em;
  }

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

  .btn-close {
    width: 0;
    height: 0;
  }

  .btn-close i {
    padding: 20px;
    background: #e02626;
    border-radius: 100%;
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.55);
  }
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="3" top="0" height="22" delay="0">
      <!-- cover -->
      <div class="cover">
        <img src="/img/breja-{brejaImage}.png" alt="brejaimage" />
      </div>

      <!-- seus pontos -->
      <p>Seu pontos</p>

      <!-- pontos -->
      <div class="font title">{showPontos}</div>

      <!-- buttons -->
      <div class="grid">
        <!-- btn doar -->
        <div class="black btn-bottom shadow">Doar</div>

        <!-- btn premios -->
        <div class="black btn-bottom shadow">Prêmios</div>

        <!-- grid -->
      </div>

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div class="btn black btn-close" on:click={() => ($modalSet.score = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
