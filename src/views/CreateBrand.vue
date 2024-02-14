<template>
  <div class="card centered-h" style="max-width: 450px;">
    <h1>Create Brand</h1>

    <form method="post" autocomplete="off" @submit.prevent="createBrand">
        <input type="text" placeholder="Name" v-model="name">
        <input type="text" placeholder="Id" v-model="filterId">
        <input type="text" placeholder="Website" v-model="website">
        <button type="submit">Create</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/index';
import api from '../api/api';

const name = ref('');
const filterId = ref('');
const website = ref('');

async function createBrand() {
  // TODO validation

  const response = await api.tenants.createTenant(name.value, filterId.value, website.value);
  if(response.status == 200) {
    router.push('/brands');
  }
}

</script>