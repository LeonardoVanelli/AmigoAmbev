<script>
  import { idFriends, modalSet, user } from '../../stores';
  import axios from 'axios';

  export let key;

  let exemple = [];

  const resposne = axios
    .get(`api/filtroUser?filtro=${key}`, {
      headers: {
        Authorization: `Bearer ${$user.client.token}`,
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.data.length) return (exemple = response.data);
      return (exemple = [{ msg: 'Nunhum resultado' }]);
    });

  //example array

  //show modal with friends
  const showModalFriends = whatId => {
    $idFriends = whatId;
    $modalSet.search = false;
    $modalSet.friends = true;
  };
</script>

<style>
  .box {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5em;
    width: 100%;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(197, 197, 197);
  }

  .cover {
    width: 3.5em;
    height: 3.5em;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cover img {
    position: relative;
    width: 150%;
  }

  .name {
    flex: 1;
    text-align: center;
    font-size: 0.9em;
    color: aliceblue;
  }
</style>

{#each exemple as item}
  {#if item.msg}
    <div class="name">{item.msg}</div>
  {:else}
    <div class="box" on:click={() => showModalFriends(item.id)}>
      <!-- cover img-->
      <div class="cover shadow">
        <img src={item.avatar ? item.avatar.url : ''} alt={item.name} />
      </div>

      <!-- name -->
      <div class="name">{item.name}</div>

      <!-- box -->
    </div>
  {/if}
{/each}
