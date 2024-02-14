<template>
  <div class="card centered-h" style="max-width: 450px;">
    <h1>Create User</h1>

    <form method="post" autocomplete="off" @submit.prevent="createUser">
        <input type="text" placeholder="User Name" v-model="userName">
        <input type="text" placeholder="Email" v-model="email">
        <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../../router/index';
import api from '../../api/api';

const userName = ref('');
const email = ref('');

async function createUser() {
  // TODO validation

  const response = await api.auth.createUser(userName.value, email.value);
  if(response.status == 200) {
    router.push('/users');
  }
}

</script>