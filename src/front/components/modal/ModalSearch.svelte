<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import { goto } from '@sapper/app';
  import Input from '../Input.svelte';
  import Search from '../Search.svelte';

  //Search text
  let searchText = '';

  //search config
  let result = '';
  const btnSearch = async () => {
    result = searchText;
  };

  //close current modal
  const btn = e => {
    goto(e);
    $modalSet.search = false;
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

  .btn-search {
    margin: 0.7em 0;
  }
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="3" top="1.5" height="12" delay="0" overflow="hidden">
      <!-- search -->
      <Input>
        <input type="text" placeholder="Pesquisa.." bind:value={searchText} />
      </Input>

      <!-- btn search -->
      <div class="btn black shadow btn-search" on:click={() => btnSearch()}>
        <i class="material-icons">search</i>
      </div>

      <!-- each results -->
      <Search key={result} />

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div
      class="btn black btn-close"
      on:click={() => ($modalSet.search = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
