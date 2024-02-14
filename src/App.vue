<template>
  <div
    class="overlay"
    @click="toggleSidebar"
    :class="{ active: showSidebar }"
  ></div>
  <div style="display: flex">
    <SideBar
      :User="User"
      :toggleSidebar="toggleSidebar"
      :showSidebar="showSidebar"
    />
    <SearchBar :User="User" :toggleSidebar="toggleSidebar" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import SearchBar from "./components/SearchBar/SearchBar.vue";
import SideBar from "./components/SideBar/SideBar.vue";

const authStore = useAuthStore();
const showSidebar = ref(false);

// Storing user info
const User = ref({
  isloggedIn: authStore.loggedIn,
  userName: authStore.userName ?? "",
  tenantName: authStore.tenantName ?? "",
});

onMounted(() => {
  authStore.loginFromStorage();

  const dropdownBtn = document.querySelectorAll(".dropdown-btn");
  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      const downArrow = btn.querySelector(".arrow-right");
      downArrow.classList.toggle("open");
      btn.nextElementSibling.classList.toggle("open");
    });
  });
});

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}
</script>
