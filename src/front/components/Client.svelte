<script>
  import Card from './Card.svelte';
  import Feed from './client/Feed.svelte';
  import { modalSet } from '../../stores';
</script>

<style>
  p {
    font-size: 0.9em;
    margin: 1.8em 0;
    text-align: center;
  }

  .post-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .btn-text,
  .btn-img,
  .btn-search {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #101010;
  }

  .btn-text {
    background: #1c89a1;
  }

  .btn-img {
    background: #b69729;
    margin: 0 0.6em;
  }

  .btn-search {
    background: #961b1b;
  }
</style>

<Card color="black" top="3">
  <p>Compartilhe um momento</p>

  <!-- buttons -->
  <div class="post-buttons">
    <!-- post text -->
    <div class="btn-text">
      <i class="material-icons">edit</i>
    </div>

    <!-- post img -->
    <div class="btn-img" on:click={() => ($modalSet.postFoto = true)}>
      <i class="material-icons">photo_camera</i>
    </div>

    <!-- search -->
    <div class="btn-search">
      <i class="material-icons">search</i>
    </div>

    <!-- container buttons -->
  </div>
</Card>

<Feed />
