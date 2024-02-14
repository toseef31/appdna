import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Security from "../views/Security.vue";
import Sessions from "../views/Sessions.vue";
import Users from "../views/Admin/Users.vue";
import CreateUser from "../views/Admin/CreateUser.vue";
import ViewUser from "../views/Admin/ViewUser.vue";
import EditUser from "../views/Admin/EditUser.vue";
import Roles from "../views/Admin/Roles.vue";
import CreateRole from "../views/Admin/CreateRole.vue";
import EditRole from "../views/Admin/EditRole.vue";
import AddUserToRole from "../views/Admin/AddUserToRole.vue";
import Brands from "../views/Brands.vue";
import CreateBrand from "../views/CreateBrand.vue";
import EditBrand from "../views/EditBrand.vue";
import AddUserToBrand from "../views/AddUserToBrand.vue";
import Account from "../views/Account.vue";

import Games from "../views/Admin/Games/AllGames.vue";
import AddNewGame from "../views/Admin/Games/AddGame.vue";
import EditGame from "../views/Admin/Games/EditGame.vue";
import GamesLists from "../views/Admin/Games/ListGames.vue";
import CreateGameList from "../views/Admin/Games/CreateGamesList.vue";
import EditGamesList from "../views/Admin/Games/EditGamesList.vue";

import Players from "../views/Players/AllPlayers.vue";
import PlayerDetails from "../views/Players/PlayerDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/security",
      name: "security",
      component: Security,
    },
    {
      path: "/sessions",
      name: "sessions",
      component: Sessions,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/create-user",
      name: "create-user",
      component: CreateUser,
    },
    {
      path: "/view-user/:id",
      name: "view-user",
      component: ViewUser,
    },
    {
      path: "/edit-user/:id",
      name: "edit-user",
      component: EditUser,
    },
    {
      path: "/roles",
      name: "roles",
      component: Roles,
    },
    {
      path: "/create-role",
      name: "create-role",
      component: CreateRole,
    },
    {
      path: "/edit-role/:id",
      name: "edit-role",
      component: EditRole,
    },
    {
      path: "/add-user-to-role/:id",
      name: "add-user-to-role",
      component: AddUserToRole,
    },
    {
      path: "/brands",
      name: "brands",
      component: Brands,
    },
    {
      path: "/create-brand",
      name: "create-brand",
      component: CreateBrand,
    },
    {
      path: "/edit-brand/:id",
      name: "edit-brand",
      component: EditBrand,
    },
    {
      path: "/add-user-to-brand/:id",
      name: "add-user-to-brand",
      component: AddUserToBrand,
    },
    {
      path: "/account",
      name: "account",
      component: Account,
    },
    {
      path: "/games",
      name: "games",
      component: Games,
    },
    {
      path: "/games/add-new-game",
      name: "add-new-game",
      component: AddNewGame,
    },
    {
      path: "/games/edit-game/:id",
      name: "edit-game",
      component: EditGame,
    },
    {
      path: "/games/games-lists",
      name: "games-lists",
      component: GamesLists,
    },
    {
      path: "/games/create-game-list",
      name: "create-game-list",
      component: CreateGameList,
    },
    {
      path: "/games/edit-game-list/:id",
      name: "edit-game-list",
      component: EditGamesList,
    },
    {
      path: "/players",
      name: "players",
      component: Players,
      // children: [
      //   {
      //     path: ":id",
      //     name: "player-details",
      //     component: PlayerDetails,
      //   },
      // ] 
    },
      {
        path: "/players/:id",
        name: "player-details",
        component: PlayerDetails,
      },

  ],
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
