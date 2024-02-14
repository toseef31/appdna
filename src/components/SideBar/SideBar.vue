<template>
  <!-- Side Bar -->
  <div
    class="overlay"
    @click="toggleSidebar"
    :class="{ active: showSidebar }"
  ></div>
  <div v-if="User.isloggedIn" id="sidebar" :class="{ active: showSidebar }">
    <a href="/" class="logo">
      <img
        src="@/assets/images/app_logo_lg.png"
        style="width: 40px"
        alt="app logo"
      />
      <!-- {{User.tenantName}} -->
      Backoffice
    </a>

    <span class="mobile-view">
      <span @click="toggleSidebar" class="sidebar-close-icon-container">
        <span class="sidebar-close-icon">
          <SVG iconType="SideBarCloseArrowSVG" />
        </span>
      </span>
    </span>
    <nav>
      <ul>
        <DashboardItems
          v-for="(sideBarItem, index) in sideBarItems"
          :key="index"
          :to="sideBarItem.to"
          :iconType="sideBarItem.iconType"
          :customClass="{
            'exact-active': checkRoute({
              path: route.path,
              to: sideBarItem.to,
            }),
          }"
        >
          {{ sideBarItem.title }}
        </DashboardItems>
        <li>
          <div class="dropdown-btn" :style="checkActive()">
            <div style="display: flex; align-items: center; gap: 10px">
              <SVG iconType="admin" :customStyles="checkActive" />
              <span>Admin</span>
            </div>
            <SVG iconType="arrow" :customStyles="checkActive" />
          </div>
          <ul class="collapsable-dropdown">
            <DashboardItems
              v-for="(sideBarDropDownItem, index) in sideBarDropDownItems"
              :key="index"
              :to="sideBarDropDownItem.to"
              :iconType="sideBarDropDownItem.iconType"
              :customClass="{
                'exact-active': route.path.includes(sideBarDropDownItem.to),
              }"
            >
              {{ sideBarDropDownItem.title }}
            </DashboardItems>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import SVG from "../../assets/images/svgs/svgs.vue";
import { useRoute } from "vue-router";
import DashboardItems from "../SideBar/DashboardItems.vue";

const route = useRoute();
const props = defineProps({
  User: {
    required: true,
    type: Object,
  },
  toggleSidebar: {
    required: true,
    type: Function,
  },
  showSidebar: {
    required: true,
    type: Boolean,
  },
});

const checkActive = () => {
  const prefixes = ["/games", "/users", "/roles"];
  const isActive = prefixes.some(
    (prefix) =>
      route.path.startsWith(prefix) || route.path.includes(prefix + "/")
  );

  return {
    backgroundColor: isActive ? "#f3f3ff !important" : "transparent !important",
    color: isActive ? "#696cff !important" : "#697A8D !important",
    fill: isActive ? "#696cff !important" : "#697A8D !important",
  };
};

const sideBarItems = [
  { title: "Dashboard", iconType: "dashboard", to: "/" },
  { title: "Players", iconType: "players", to: "/players" },
  { title: "Brands", iconType: "brands", to: "/brands" },
];

const sideBarDropDownItems = [
  { title: "Games", iconType: "games", to: "/games" },
  { title: "Users", iconType: "users", to: "/users" },
  { title: "Roles", iconType: "roles", to: "/roles" },
];

const checkRoute = (route) => {
  const { path, to } = route;

  return (path === to || path.includes(to)) && to !== "/";
};
</script>

<style scoped></style>
