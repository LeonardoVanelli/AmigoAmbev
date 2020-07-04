<script>
  import { user, modalSet } from '../../stores';
</script>

<style>
  .nav {
    position: fixed;
    z-index: 8000;
    width: 100%;
    top: 15px;
  }

  .nav-container {
    text-align: center;
    z-index: 9980;
  }

  .logo img {
    position: relative;
    width: 100px;
  }

  .btn-menu {
    position: absolute;
    left: 15px;
    top: 12px;
    color: #feffc9;
  }

  .btn-profile {
    position: absolute;
    left: 80px;
    right: -225px;
    top: 12px;
    color: #feffc9;
  }
</style>

<div class="nav">

  <div class="nav-container">

    {#if $user.client.status}
      <div class="btn-menu" on:click={() => ($modalSet.menu = true)}>
        <i class="material-icons">menu</i>
      </div>

      <div class="btn-profile" on:click={() => ($modalSet.profile = true)}>
        <i class="material-icons">person</i>
      </div>
    {/if}

    <div class="logo">
      <img src="/img/logo.png" alt="logo" />
    </div>

    <!-- container -->
  </div>
</div>
