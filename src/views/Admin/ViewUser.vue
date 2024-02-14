<template>
  <div class="card centered-h">
    <h1>User</h1>
    <p>Id: {{user.id}}</p>
    <p>UserName: {{user.userName}}</p>
    <p>Email: {{user.email}}</p>
    <p>Date Joined: {{user.dateJoined}}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../../api/api';

const route = useRoute();

const user = ref({});

onMounted(async () => {
  const response = await api.auth.getUser(route.params.id);
  user.value = response.data.user;
});

</script>