<template>
  <div>
    <div class="banner">
      <img src="@/assets/images/games.png" alt="" />
      <h1>{{ gamesListsId }}</h1>
    </div>
    <div class="breadcrumbs">
      <a href="/games">Games</a>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
        >
          <path
            d="M1.89384 12.1004L7.49383 6.50039L1.89384 0.900391L0.506348 2.28788L4.71886 6.50039L0.506348 10.7129L1.89384 12.1004Z"
            fill="#8E9BAA"
          />
        </svg>
      </span>
      <a href="/games/games-lists">Games Lists</a>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
        >
          <path
            d="M1.89384 12.1004L7.49383 6.50039L1.89384 0.900391L0.506348 2.28788L4.71886 6.50039L0.506348 10.7129L1.89384 12.1004Z"
            fill="#8E9BAA"
          />
        </svg>
      </span>
      <span class="current">{{ gamesListsId }}</span>
    </div>
    <form action="">
      <div class="card">
        <label for="">List Name</label>
        <input type="text" v-model="listName" />
        <label for="">Add Game</label>
        <div class="search-field-container">
          <input
            type="text"
            name="name"
            placeholder="Brand Casino"
            class="search-field"
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                fill="#B4BDC6"
              />
            </svg>
          </span>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Provider</th>
                <th>Id</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game, index) in allGames">
                <td>{{ game.name }}</td>
                <td>
                  <div class="provider-logo-container">
                    <img
                      :src="game.providerImage"
                      class="provider-logo"
                      alt=""
                    />
                  </div>
                </td>
                <td>{{ game.gameId }}</td>
                <td>
                  <div class="category-logo-container">
                    <div
                      class="category-logo"
                      :style="{ background: game?.background }"
                    >
                      <img
                        :src="game.categoryIcon"
                        style="height: 100%"
                        :style="{ color: 'red' }"
                        alt=""
                      />
                    </div>

                    <div>Slot</div>
                  </div>
                </td>
                <td>
                  <a :href="`/games/edit-game/${game.gameId}`">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <div class="pagination-text">Showing 1 to 20 of 2100 entries</div>
            <div class="pagination-btns">
              <button class="previous disabled">Previous</button>
              <button class="num-btn active">1</button>
              <button class="num-btn">2</button>
              <button class="num-btn">3</button>
              <button class="num-btn">4</button>
              <button class="next">Next</button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-btn-container">
        <button class="btn-xl">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../../stores/authStore";

import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const selectedColor = ref(null);
const gamesListsId = ref("")
const allGames = ref([
  {
    name: "Book of Shadows1",
    providerName: "proveider name",
    providerImage: "/src/assets/images/game1.png",
    gameId: "game1",
    categoryName: "Slots",
    categoryIcon: "/src/assets/images/slotIcon1.svg",
    background: "#D7F5FC"
  },
  {
    name: "Book of Shadows2",
    providerName: "proveider name",
    providerImage: "/src/assets/images/game2.png",
    gameId: "game2",
    categoryName: "Multiple",
    categoryIcon: "/src/assets/images/slotIcon2.svg",
    background: "#FFF2D6"

  },
  {
    name: "Book of Shadows3",
    providerName: "proveider name",
    providerImage: "/src/assets/images/game3.png",
    gameId: "game3",
    categoryName: "Live",
    categoryIcon: "/src/assets/images/slotIcon3.svg",
    background: "#E7E7FF"

  },
  {
    name: "Book of Shadows1",
    providerName: "proveider name",
    providerImage: "/src/assets/images/game1.png",
    gameId: "game1",
    categoryName: "Slots",
    categoryIcon: "/src/assets/images/slotIcon1.svg",
    background: "#D7F5FC"

  },


]);
const colors = ref([
  {
    color: "#696CFF",
    background: "#E7E7FF",
  },
  {
    color: "#03C3EC",
    background: "#E5F9FD",
  },
  {
    color: "#FF3E1D",
    background: "#FFEBE8",
  },
  {
    color: "#FFAB00",
    background: "#FFF2D6",
  },
  {
    color: "#82E14F",
    background: "#F0FCEA",
  },
]);
onMounted(() => {

  console.log(route)
  gamesListsId.value = route.params.id;
  setLogo(allGames.value);
});
const setLogo = (gameList) => {
  gameList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.categoryLogo = selectedColor.value;
  });
};
</script>
