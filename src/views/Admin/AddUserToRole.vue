<template>
  <div class="card centered-h" style="max-width: 450px;">
    <h1>Add User To Role</h1>

    <form method="post" autocomplete="off" @submit.prevent="addUser">
        <input type="text" placeholder="User Name" v-model="userName">
        <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../../router/index';
import { useRoute } from 'vue-router'
import api from '../../api/api';

const route = useRoute();

const userName = ref('');

async function addUser() {
  // TODO validation

  const response = await api.auth.addUserToRole(route.params.id, userName.value);
  if(response.status == 200) {
    router.push('/roles');
  }
}

</script>