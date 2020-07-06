<script>
  import { scale } from 'svelte/transition';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import { goto } from '@sapper/app';
  import axios from 'axios';
  import Input from '../Input.svelte';

  //objeto que armazena os dados do form pra atualizar o perfil
  let userClient = {
    cpf: $user.client.cpf,
    email: $user.client.email,
    pass: '',
  };

  const btn = e => {
    goto(e);
    $modalSet.profile = false;
  };

  const changeImage = async data => {
    var formData = new FormData();
    formData.append('file', data.target.files[0]);
    const response = await axios.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${$user.client.token}`,
      },
    });

    const updatedUser = await axios.put(
      '/api/user',
      {
        avatar_id: response.data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${$user.client.token}`,
        },
      }
    );

    $user.client.cover = updatedUser.data.avatar.url;
  };

  const refreshProfile = async () => {
    const { cpf, pass, email } = userClient;

    const data = {
      email,
    };

    if (pass !== '') data.password = pass;
    if (cpf !== '') data.cpf = cpf;

    const response = await axios.put('/api/user', data, {
      headers: {
        Authorization: `Bearer ${$user.client.token}`,
      },
    });

    $user.client.email = response.data.nemail;
    $user.client.cpf = response.data.cpf;

    localStorage.setItem('user', JSON.stringify($user));
    $modalSet.profile = false;
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

  .btn {
    width: 0;
    height: 0;
  }

  .btn i {
    padding: 20px;
    background: #101010;
    border-radius: 100%;
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.55);
  }

  .box {
    display: flex;
    justify-content: center;
  }

  .cover {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cover img {
    width: 160%;
    height: auto;
  }

  .cover i {
    position: absolute;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box input[type='file'] {
    display: none;
  }

  .btn-save {
    width: 100%;
    height: 3em;
  }
</style>

<div
  in:scale={{ opacity: 0, start: 0.5, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}
  class="bg-modal">

  <div class="container">
    <Card mTop="5" top="2" height="20" delay="0">

      <!-- content -->
      <div class="box">

        <form enctype="multipart/form-data">
          <input
            on:change={data => changeImage(data)}
            type="file"
            name="img"
            id="img" />
          <label for="img">
            <!-- img profile -->
            <div class="cover shadow">
              <i class="material-icons">camera</i>
              <img src={$user.client.cover} alt="cover" />
              <!-- cover -->
            </div>
          </label>
        </form>
        <!-- box -->
      </div>

      <!-- cpf -->
      <Input margin="1">
        <input type="number" bind:value={userClient.cpf} placeholder="CPF.." />
      </Input>

      <!-- email -->
      <Input margin="1">
        <input
          type="email"
          bind:value={userClient.email}
          placeholder="E-mail" />
      </Input>

      <!-- pass -->
      <Input margin="1">
        <input
          type="text"
          maxlength="6"
          bind:value={userClient.pass}
          placeholder="Nova senha" />
      </Input>

      <!-- save profile data -->
      <div on:click={() => refreshProfile()} class="btn black shadow btn-save">
        Salvar
      </div>

    </Card>
  </div>

  <!-- close modal -->
  <div class="close-modal">
    <div class="btn black" on:click={() => ($modalSet.profile = false)}>
      <i class="material-icons">close</i>
    </div>
  </div>

</div>
