<template>
  <AccountMenu/>
  <div class="card">
    <h1>Sessions</h1>

    <div style="overflow: auto;">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>IP</th>
            <th>Device</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(session, index) in sessions" :key="index">
            <td>{{ session.date.split('.')[0].replace('T', ' ') }}</td>
            <td>{{ session.ipAddress }}</td>
            <td>{{ session.device }}</td>
            <td>{{ session.country }}</td>
            <td><button @click.prevent="logoutSession(session.id)">Logout</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/api';
import AccountMenu from '../components/AccountMenu.vue';
const sessions = ref([]);

onMounted(async () => {
  const response = await api.auth.getSessions();
  sessions.value = response.data.sessions;
});

async function logoutSession(id) {
  const response = await api.auth.endSession(id);
  if (response.status == 200) {
    // TODO remove session from array
  }
}
</script>