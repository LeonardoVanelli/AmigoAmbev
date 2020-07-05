<script>
  import Card from '../front/components/Card.svelte';
  import Input from '../front/components/Input.svelte';
  import { scale } from 'svelte/transition';
  import { goto } from '@sapper/app';
  import axios from 'axios';

  import { user } from '../stores.js';

  //view card
  let view = 'whatUser';

  //input type by pass
  let inputPass = 'type="password"';

  //label email
  let labelEmail = 'Qual o seu e-mail?'; //Ops esse e-mail já está em uso.

  //new user obj
  let newUser = {
    name: '',
    email: '',
    pass: '',
  };

  let loading = false;

  const addUser = async () => {
    try {
      loading = true;
      let response = await axios.post('/api/user', {
        name: newUser.name,
        email: newUser.email,
        password: newUser.pass,
      });

      const { id, name, email, avatar, apelido, bar } = response.data.user;
      $user.client.status = bar ? 'bar' : 'client';
      $user.client.id = id;
      $user.client.name = name;
      $user.client.email = email;
      $user.client.cpf = '';
      $user.client.cover = avatar.url;

      $user.client.token = response.data.token;

      localStorage.setItem('user', JSON.stringify($user));

      console.log($user);
      goto('/');
    } catch (error) {
      console.log(error);
    }
    loading = false;
  };

  const validaEmail = async () => {
    try {
      loading = true;
      const valida = await axios.post('/api/user/Validaemail', {
        email: newUser.email,
      });

      view = 'pass';
    } catch (error) {
      labelEmail = 'Ops! Esse e-mail já está em uso.';
    }
    loading = false;
  };
</script>

<style>
  p {
    font-size: 0.9em;
    margin: 1.8em 0;
    text-align: center;
  }

  .btn {
    margin-top: 1.8em;
    color: #feffc9 !important;
  }

  .flat {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    top: 23em;
    left: 0;
    position: absolute;
  }

  .flat i {
    font-size: 15px;
    margin-right: 10px;
    color: #feffc9 !important;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div
  class="container"
  in:scale={{ opacity: 0, start: 0.5, delay: 600, duration: 300 }}
  out:scale={{ opacity: 0, start: 1.3, delay: 300, duration: 300 }}>
  {#if view === 'whatUser'}
    <Card top="5">
      <!-- title -->
      <div class="title font">Quem é você?</div>

      <div class="contaier">

        <div on:click={() => goto('/')} class="btn black">
          Sou um estabelecimento
        </div>

        <!-- user client -->
        <div on:click={() => (view = 'name')} class="btn black">
          Sou um cliente
        </div>

        <!-- container -->
      </div>
    </Card>
  {:else if view === 'name'}
    <Card top="5">
      <!-- title -->
      <div class="title font">Cadastro</div>

      <!-- label -->
      <p>Qual o seu nome?</p>

      <div class="contaier">
        <!-- name -->
        <Input>
          <input type="text" bind:value={newUser.name} placeholder="Nome" />
        </Input>

        <!-- btn next -->
        {#if newUser.name.length > 5}
          <div
            on:click={() => (view = 'email')}
            class="btn black"
            in:scale={{ opacity: 0, start: 0.5, delay: 200, duration: 200 }}>
            Avançar
            <i class="material-icons">arrow_forward</i>
          </div>
        {/if}

        <!-- container -->
      </div>
    </Card>
  {:else if view === 'email'}
    <!-- input email -->
    <Card top="5">
      <!-- title -->
      <div class="title font">Cadastro</div>

      <!-- label -->
      <p>{labelEmail}</p>

      <div class="contaier">
        <!-- email -->
        <Input>
          <input type="email" bind:value={newUser.email} placeholder="E-mail" />
        </Input>

        <!-- btn next -->
        {#if newUser.email.length > 9}
          <div
            on:click={validaEmail}
            class="btn black"
            in:scale={{ opacity: 0, start: 0.5, delay: 200, duration: 200 }}>

            {#if loading}
              <div class="spiner" />
            {:else}
              Avançar
              <i class="material-icons">arrow_forward</i>
            {/if}
          </div>
        {/if}

        <!-- container -->
      </div>
    </Card>
  {:else if view === 'pass'}
    <!-- input pass -->
    <Card top="5">
      <!-- title -->
      <div class="title font">Cadastro</div>

      <!-- label -->
      <p>Crie uma senha:</p>

      <div class="contaier">
        <!-- password -->
        <Input>
          <input
            type="password"
            bind:value={newUser.pass}
            placeholder="Senha"
            maxlength="6" />
        </Input>

        <!-- btn next -->
        {#if newUser.pass.length >= 6}
          <div
            on:click={addUser}
            class="btn black center"
            in:scale={{ opacity: 0, start: 0.5, delay: 300, duration: 300 }}>

            {#if loading}
              <div class="spiner" />
            {:else}
              Finalizar
              <i class="material-icons">check</i>
            {/if}
          </div>
        {/if}

        <!-- container -->
      </div>
    </Card>
  {/if}

  <!-- btn home -->
  <div on:click={() => goto('/')} class="btn flat">
    <i class="material-icons">home</i>
    Voltar
  </div>

  <!-- container -->
</div>
