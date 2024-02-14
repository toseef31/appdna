<template>
  <div class="card centered-h" style="max-width: 450px;">
    <h1>Edit User</h1>

    <form method="post" autocomplete="off" @submit.prevent="saveUser">
        <input disabled type="text" placeholder="User Name" v-model="userName">
        <input type="text" placeholder="Email" v-model="email">
        <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '../../router/index';
import api from '../../api/api';

const route = useRoute();

const userName = ref('');
const email = ref('');

onMounted(async () => {
  const response = await api.auth.getUser(route.params.id);
  userName.value = response.data.user.userName;
  email.value = response.data.user.email;
});

async function saveUser() {
  // TODO validation

  const response = await api.auth.updateUser(route.params.id, email.value);
  if(response.status == 200) {
    router.push('/users');
  }
}

</script>