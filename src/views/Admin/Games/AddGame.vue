<template>
  <div>
    <div class="banner">
      <img src="@/assets/images/games.png" alt="" />
      <h1>New Game</h1>
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
      <span class="current">Add New Game</span>
    </div>
    <div class="add-games">
      <form action="">
        <div class="card">
          <label for="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Brand Casino"
            v-model="id"
          />
          <label for="provider">PROVIDER</label>
          <select name="provider" id="provider" v-model="provider">
            <option :value="prov" v-for="prov in providers" :key="prov">
              {{ prov }}
            </option>
          </select>
          <label for="name">NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Brand Casino"
            v-model="name"
          />
          <label for="category">CATEGORY</label>
          <select name="category" id="category" v-model="category">
            <option :value="cate" v-for="cate in categories">{{ cate }}</option>
          </select>
        </div>
        <div class="right-btn-container">
          <button class="btn-xl">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../../stores/authStore";
import { useRoute } from "vue-router";

const route = useRoute();

const authStore = useAuthStore();
const allGames = authStore.allGames;
const game = ref(null);

const providers = ref(["provider 1", "provider 2", "provider 3"]);
const categories = ref(["category 1", "category 2", "category 3"]);

const id = ref("");
const name = ref("");
const category = ref("");
const provider = ref("");

onMounted(() => {
  const gameId = route.params.id;
  game.value = allGames.filter((data) => data.gameId === gameId)[0];

  id.value = game.value.gameId;
  name.value = game.value.name;
  provider.value = game.value.providerName;
  category.value = game.value.categoryName;
});
</script>
