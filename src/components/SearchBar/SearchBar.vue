<template>
  <!-- Search Bar -->
  <div
    class="main-container"
    :style="[!User.isloggedIn ? { width: '100%', padding: '0px' } : {}]"
  >
    <div class="desktop-view">
      <header v-if="User.isloggedIn">
        <div class="search-bar">
          <SVG iconType="search" />
          <input type="text" placeholder="Search" />
        </div>

        <button id="sidebarToggle" @click="toggleSidebar">
          <SVG iconType="DesktopToggleBurgerMenu" />
        </button>

        <div
          style="
            position: relative;
            display: flex;
            align-items: center;
            column-gap: 11px;
          "
        >
          <SVG iconType="bell" />
          <a href="#" class="avatar" @click="toggleAccountDropdown">
            {{ User.userName }}
          </a>
          <div class="accountDropdown" :class="{ open: accountDropdown }">
            <ul>
              <MenuItemLink
                v-for="(menuItem, index) in menuItems"
                :key="index"
                :to="menuItem.to"
                :iconType="menuItem.iconType"
              >
                {{ menuItem.title }}
              </MenuItemLink>
              <li class="separator"></li>
              <li>
                <a href="#" @click.prevent="logout">
                  <SVG iconType="logout" />Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>

    <!---------------------------- Mobile Version ---------------------------->
    <div class="mobile-view">
      <div v-if="showSearch" class="mobile-search-container">
        <form action="">
          <input type="text" placeholder="search" style="margin-bottom: 0px" />
          <span style="position: absolute; right: 28px; top: 28px">
            <SVG iconType="close" :onClick="toggleSearch" />
          </span>
        </form>
      </div>
      <div class="mobile-navbar">
        <div style="margin: 0 auto">
          <SVG iconType="burgerMenu" :onClick="toggleSidebar" />
        </div>
        <div style="margin: 0 auto">
          <SVG iconType="MobileSearch" :onClick="toggleSearch" />
        </div>
        <div style="margin: 0 auto; position: relative">
          <SVG iconType="profile" :onClick="toggleAccountDropdown" />

          <div class="newaccountDropdown" :class="{ open: accountDropdown }">
            <ul>
              <MenuItemLink
                v-for="(menuItem, index) in menuItems"
                :key="index"
                :to="menuItem.to"
                :iconType="menuItem.iconType"
              >
                {{ menuItem.title }}
              </MenuItemLink>
              <li
                style="
                  border-top: thin solid rgba(50, 71, 92, 0.12);
                  margin: 5px 0;
                "
              ></li>
              <li>
                <a href="#" @click.prevent="logout">
                  <SVG iconType="logout" />
                  Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      :style="[
        !User.isloggedIn
          ? { 'margin-bottom': '0px' }
          : { 'margin-bottom': '70px' },
      ]"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../router";
import api from "../../api/api";
import SVG from "../../assets/images/svgs/svgs.vue";
import MenuItemLink from "./ProfileMenuItem.vue";

const accountDropdown = ref(false);
const showSearch = ref(false);

const props = defineProps({
  User: {
    required: true,
    type: Object,
  },
  toggleSidebar: {
    required: true,
    type: Function,
  },
});

function toggleAccountDropdown() {
  accountDropdown.value = !accountDropdown.value;
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};

async function logout() {
  console.log("caling logout");
  const response = await api.auth.logout();

  console.log("what is response", response);
  if (response.status == 200) {
    authStore.logout();
    router.push("/login");
  }
}

// Profile Dropdown menu items
const menuItems = [
  { title: "Account", iconType: "account", to: "/account" },
  { title: "Security", iconType: "security", to: "/security" },
  { title: "Sessions", iconType: "sessions", to: "/sessions" },
];
</script>

<style scoped>
.separator {
  border-top: thin solid rgba(50, 71, 92, 0.12);
  margin: 5px 0;
}
</style>
