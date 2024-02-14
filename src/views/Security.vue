<template>
  <AccountMenu/>
  <div class="card-wrapper">
    <div class="card">
      <h1>Change Password</h1>

      <form method="post" autocomplete="off" @submit.prevent="changePassword">
        <input type="password" placeholder="Old Password" v-model="oldPassword">
        <input type="password" placeholder="New Password" v-model="newPassword">
        <input type="password" placeholder="Confirm New Password" v-model="confirmPassword">
        <button type="submit">Save</button>
      </form>
    </div>

    <div class="card">
      <h1>{{ authStore.tfaEnabled ? 'Disable' : 'Enable' }} 2fa</h1>

      <form method="post" autocomplete="off" @submit.prevent="toggleTfa">
        <div v-if="!authStore.tfaEnabled">
          <p>Backup code: {{ tfaUri }}</p>
          <qrcode-vue :value="tfaUri" :size="150" level="H" />

        </div>
        <input type="text" placeholder="2FA Code" v-model="tfaCode">
        <button type="submit">Toggle</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue';
import api from '../api/api';
import { useAuthStore } from '../stores/authStore';
import AccountMenu from '../components/AccountMenu.vue';

const authStore = useAuthStore();

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const tfaCode = ref('');
const tfaUri = ref('');


onMounted(async () => {
  if (!authStore.tfaEnabled) {
    const response = await api.auth.getTfaCode();
    tfaUri.value = response.data.tfaKey;
  }
});

async function toggleTfa() {
  const response = await api.auth.toggleTfa(tfaCode.value);
  if (response.status == 200) {
    tfaCode.value = '';
    authStore.toggleTfa();
    // TODO return this with the first request
    if (!authStore.tfaEnabled) {
      const response = await api.auth.getTfaCode();
      tfaUri.value = response.data.tfaKey;
    }
  }
}

async function changePassword() {
  // TODO validation

  const response = await api.auth.changePassword(oldPassword.value, newPassword.value);
  if (response.status == 200) {
    alert('success');
  } else {
    alert('false');
  }
}

</script>