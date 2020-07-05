<script>
  import axios from 'axios';
  import Card from '../Card.svelte';
  import { modalSet, user } from '../../../stores';
  import { onMount } from 'svelte';

  let posts = [];

  onMount(async () => {
    let res = await axios.get(`/api/Postagens?filtro`, {
      headers: {
        Authorization: `Bearer ${$user.client.token}`,
      },
    });
    posts = [...res.data];
    console.log(posts);
  });

  const Like = async postagem_id => {
    const post = posts.find(post => post.id === postagem_id);

    const contemCurtida = post.curtidas.find(
      curtida => (curtida.user.id = $user.client.id)
    );

    if (contemCurtida) {
      post.curtidas.splice(0, 1);
    } else {
      post.curtidas.push({
        user: {
          id: $user.client.id,
          name: $user.client.name,
        },
      });
    }

    const index = posts.indexOf(post);
    posts.splice(index, 1);
    posts = [...posts, post];
    let like = await axios.post(
      '/api/Curtidas',
      {
        postagem_id,
        user_id: $user.client.id,
      },
      {
        headers: {
          Authorization: `Bearer ${$user.client.token}`,
        },
      }
    );
  };
</script>

<style>
  .post-title {
    text-align: center;
    font-size: 1.2em;
    color: #333333;
  }

  .card-footer {
    width: 100%;
    display: grid;
    grid-template-areas: 'a a a';
    margin-top: 1em;
    margin-bottom: -20px;
    font-size: 0.8em;
    color: #c32525;
  }

  .item-like,
  .item-username,
  .item-comments {
    display: flex;
    align-items: center;
  }

  .item-like {
    font-size: 0.8em;
  }

  .item-username {
    justify-content: center;
  }

  .item-comments {
    justify-content: flex-end;
  }
</style>

{#each posts as item}
  <Card mTop="2" color="white">
    <!-- title/legend -->
    <div class="post-title font">{item.texto}</div>

    <!-- footer -->
    <div class="card-footer">
      <!-- like -->
      <div on:click={este => Like(item.id)} class="item-like">
        <i class="material-icons">star</i>
        {item.curtidas.length}
      </div>

      <!-- username -->
      <div class="item-username">{item.user.name}</div>

      <!-- comments -->
      <div class="item-comments">
        <i class="material-icons">message</i>
      </div>

      <!-- card footer -->
    </div>
  </Card>
{/each}
