<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import { goto } from '@sapper/app';
  import Input from '../Input.svelte';

  import axios from 'axios';

  //bind form data
  let img,
    textarea = '';

  //post submit
  const postSubmit = async () => {
    await axios.post(
      'api/Postagens',
      {
        texto: textarea,
        imagem_id: img,
        user_id: $user.client.id,
        tipo_id: $user.client.status === 'bar' ? 2 : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${$user.client.token}`,
        },
      }
    );
    $modalSet.postFoto = false;
    goto('/');
  };

  const changeImage = async e => {
    const file = e.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${$user.client.token}`,
      },
    });

    img = response.data.id;
  };

  //close current modal
  const btn = e => {
    goto(e);
    $modalSet.postFoto = false;
  };
</script>

<style>
  textarea {
    height: 5em;
    font-size: 0.9em;
    margin: 1em;
  }

  .foto-input {
    display: none;
  }

  .yellow {
    background: #cbad44;
    color: #101010;
    margin: 0.8em 0;
  }

  label {
    display: flex;
    justify-content: cecenter;
    align-items: center;
  }

  label i {
    margin-left: 10px;
  }

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
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="3" top="1.5" height="14.5" delay="0">

      <form on:submit|preventDefault={postSubmit}>

        <p>{textarea.length}/60</p>

        <!-- image legend -->
        <Input>
          <textarea
            required
            bind:value={textarea}
            maxlength="60"
            placeholder="Legenda.." />
        </Input>

        <!-- input foto -->
        <div class="btn yellow shadow">
          <input
            type="file"
            id="file"
            class="foto-input"
            required
            on:change={e => changeImage(e)} />
          <label for="file">
            Foto
            <i class="material-icons">camera_alt</i>
          </label>
        </div>

        <!-- submit -->
        <button class="btn black shadow">Postar</button>

        <!-- form -->
      </form>

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div
      class="btn black btn-close"
      on:click={() => ($modalSet.postFoto = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
