<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import Input from '../Input.svelte';
  import axios from 'axios';

  //text for status post
  let status = '';

  //post status on feed
  const btnPost = async () => {
    await axios.post(
      '/api/Postagens',
      {
        texto: status,
        user_id: $user.client.id,
        tipo_id: $user.client.status === 'bar' ? 2 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${$user.client.token}`,
        },
      }
    );

    $modalSet.postStatus = false;
  };

  //close current modal
  const btn = e => {
    $modalSet.postStatus = false;
  };
</script>

<style>
  textarea {
    height: 5em;
    font-size: 1.2em;
    margin: 1em;
  }

  p {
    position: relative;
    color: #feffc9;
    text-align: center;
    margin-bottom: 0.6em;
    margin-top: -1em;
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

  .btn-postar {
    margin: 0.7em;
  }
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="3" top="1.5" height="12" delay="0">

      <p>{status.length}/80</p>

      <!-- image legend -->
      <Input>
        <textarea
          required
          bind:value={status}
          maxlength="80"
          placeholder="Poste uma frase.." />
      </Input>

      <!-- submit -->
      <button class="btn black shadow btn-postar" on:click={() => btnPost()}>
        Postar
      </button>

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div
      class="btn black btn-close"
      on:click={() => ($modalSet.postStatus = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
