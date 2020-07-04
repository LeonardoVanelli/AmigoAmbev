// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

// eslint-disable-next-line import/no-mutable-exports

export const user = writable({
  client: {
    status: '',
    id: 0,
    name: '',
    email: '',
    cpf: '',
    cover: '',
    token: '',
  },
});

export const modalSet = writable({
  menu: false,
  profile: false,
});
