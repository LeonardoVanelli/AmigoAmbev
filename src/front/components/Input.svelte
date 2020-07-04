<script>
  export let margin = '0';
</script>

<style>
  .input {
    width: 100%;
    background: #f0f0f0;
    border-radius: 42px;
    text-align: center;
    padding: 0.7em 0;
  }
</style>

<div class="input" style="margin: {margin}em 0">
  <slot />
</div>
