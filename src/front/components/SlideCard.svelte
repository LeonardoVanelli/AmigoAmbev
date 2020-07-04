<script>
  import Card from './Card.svelte';

  //slide card
  let slideCounter = 0;

  setInterval(() => {
    slideCounter += 1;

    if (slideCounter > 2) slideCounter = 0;
  }, 3000);
</script>

<style>
  .illustration {
    width: 220px;
    position: relative;
    text-align: center;
    margin-top: 0.7em;
    left: 10px;
  }

  #persons {
    width: 250px;
    margin-top: 1.2em;
  }

  #star {
    margin-top: 0.4em;
  }
</style>

{#if slideCounter === 0}
  <Card top="5" height="11">

    <!-- title -->
    <div class="title font">
      Encontre
      <br />
      um bar
    </div>

    <!-- image -->
    <img class="illustration" id="bar" src="/img/bar.png" alt="bar" />

  </Card>
{:else if slideCounter === 1}
  <Card top="5" height="11">

    <!-- title -->
    <div class="title font">
      Convide
      <br />
      os amigos
    </div>

    <!-- image -->
    <img class="illustration" id="persons" src="/img/persons.png" alt="bar" />

  </Card>

{:else if slideCounter === 2}
  <Card top="5" height="11">

    <!-- title -->
    <div class="title font">
      Ganhe
      <br />
      pontos
    </div>

    <!-- image -->
    <img class="illustration" id="star" src="/img/star.png" alt="bar" />

  </Card>

{/if}
