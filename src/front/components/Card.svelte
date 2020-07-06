<script>
  import { scale } from 'svelte/transition';

  export let color = 'red',
    top = '1',
    height = 'auto',
    mTop = 0;
  export let delay = 600,
    overflow = '';
</script>

<style>
  .card {
    width: 100%;
    padding: 1.5em 0;
    box-shadow: 4px 10px 40px rgba(0, 0, 0, 0.35);
    border-radius: 43px;
  }

  .hidden {
    overflow: hidden;
    overflow-y: scroll;
  }

  .card-container {
    width: 80%;
    margin: 0 auto;
  }

  .red {
    background: #e02626 !important;
    color: #ebebeb !important;
  }
  .white {
    background: #ebebeb !important;
    color: #3c3c3c !important;
  }
  .black {
    background: #101010 !important;
    color: #ebebeb !important;
  }
</style>

<div
  class="card {color}
  {overflow}"
  in:scale={{ opacity: 0, start: 0.5, delay: delay, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  style="padding-top: {top}em; height: {height}em; margin-top: {mTop}em">

  <div class="card-container">
    <slot />
    <!-- card container-->
  </div>
</div>
