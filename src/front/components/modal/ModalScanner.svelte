<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';

  //close current modal
  const btn = e => {
    goto(e);
    $modalSet.qrCode = false;
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

  .box-qr {
    width: 260px;
    margin: 0 auto;
  }

  p {
    text-align: center;
    color: #ebebeb;
    margin-bottom: 1em;
  }
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="3" top="1" height="18" delay="0">
      <!-- title -->
      <p>Aponte para o código do cliente:</p>
      <!-- qr code -->
      <div class="box-qr">
        <video id="preview" />
      </div>

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div
      class="btn black btn-close"
      on:click={() => ($modalSet.scannerBar = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
