<template>
  <div class="card centered-h" style="max-width: 450px;margin-top: 60px;">
    <h1>Register</h1>

    <form method="post" autocomplete="off" @submit.prevent="register">
        <input type="text" placeholder="User Name" v-model="userName">
        <input type="password" placeholder="Password" v-model="password">
        <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/index';
import api from '../api/api';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const userName = ref('');
const password = ref('');

async function register() {
  // TODO validation

  const response = await api.auth.register(userName.value, password.value);
  if(response.status == 200) {
    authStore.login(response.data);
    router.push('/');
  }
}

</script>