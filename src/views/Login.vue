<template>
  <div class="login-page">
    <div class="left-container"></div>
    <div class="right-container">
      <div class="header">
        <div class="logo-container">
          <img src="@/assets/images/app_logo_lg.png" style="" alt="" />
        </div>
        <h2>DNA Bonus Engine</h2>
      </div>
      <h4>Welcome to our back office 👋🏻</h4>
      <p>Please sign-in to your account to access all our features</p>
      <form method="post" autocomplete="off" @submit.prevent="login">
        <label for="">USERNAME</label>
        <input type="text" placeholder="User Name" v-model="userName" />
        <label for="">PASSWORD</label>
        <input type="password" placeholder="Password" v-model="password" />
        <div class="right-btn-container">
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit" class="btn-lg">Sign In</button>
      </form>
    </div>
  </div>
  <!-- <div class="card centered-h" style="max-width: 450px;margin-top: 60px;">
    <h1>Login</h1>

    <form method="post" autocomplete="off" @submit.prevent="login">
        <input type="text" placeholder="User Name" v-model="userName">
        <input type="password" placeholder="Password" v-model="password">
        <button type="submit">Login</button>
    </form>
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import router from "../router/index";
import api from "../api/api";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

const userName = ref("");
const password = ref("");

async function login() {
  // TODO validation

  const response = await api.auth.login(userName.value, password.value);
  if (response.status == 200) {
    authStore.login(response.data);
    router.push("/brands");
    console.log("working");
  }
}
</script>
