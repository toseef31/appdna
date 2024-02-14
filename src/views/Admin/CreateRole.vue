<template>
  <div class="card centered-h" style="max-width: 450px;">
    <h1>Create Role</h1>

    <form method="post" autocomplete="off" @submit.prevent="createRole">
        <input type="text" placeholder="Name" v-model="name">
        <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../../router/index';
import api from '../../api/api';

const name = ref('');

async function createRole() {
  // TODO validation

  const response = await api.auth.createRole(name.value);
  if(response.status == 200) {
    router.push('/roles');
  }
}

</script>