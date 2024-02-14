<template>
  <div>
    <div class="games">
      <div class="banner">
        <img src="@/assets/images/games.png" alt="" />
        <h1>Games</h1>
      </div>

      <div class="games-btns">
        <router-link to="/games/games-lists">
          <button class="btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 6H6V8H4V6ZM4 11H6V13H4V11ZM4 16H6V18H4V16ZM20 8V6H8.023V8H18.8H20ZM8 11H20V13H8V11ZM8 16H20V18H8V16Z"
                fill="white"
              />
            </svg>
            Games Lists
          </button>
        </router-link>
        <router-link to="/games/add-new-game">
          <button class="btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z"
                fill="white"
              />
            </svg>
            Add New Game
          </button>
        </router-link>
        <button class="btn-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.67 10.7385C17.4591 10.5278 17.1731 10.4095 16.875 10.4095C16.5769 10.4095 16.2909 10.5278 16.08 10.7385L13.125 13.6935V2.625C13.125 2.32663 13.0065 2.04048 12.7955 1.8295C12.5845 1.61853 12.2984 1.5 12 1.5C11.7016 1.5 11.4155 1.61853 11.2045 1.8295C10.9935 2.04048 10.875 2.32663 10.875 2.625V13.6935L7.92 10.7385C7.70674 10.5398 7.42467 10.4316 7.13322 10.4367C6.84176 10.4419 6.56369 10.5599 6.35757 10.7661C6.15145 10.9722 6.03338 11.2503 6.02824 11.5417C6.0231 11.8332 6.13128 12.1152 6.33 12.3285L11.205 17.2035L12 18L12.795 17.205L17.67 12.33C17.7745 12.2255 17.8575 12.1015 17.9141 11.9649C17.9706 11.8284 17.9998 11.682 17.9998 11.5343C17.9998 11.3865 17.9706 11.2401 17.9141 11.1036C17.8575 10.967 17.7745 10.843 17.67 10.7385ZM3.75 14.625C3.75 14.4773 3.7209 14.331 3.66436 14.1945C3.60783 14.058 3.52496 13.934 3.4205 13.8295C3.31603 13.725 3.19201 13.6422 3.05552 13.5856C2.91903 13.5291 2.77274 13.5 2.625 13.5C2.47726 13.5 2.33097 13.5291 2.19448 13.5856C2.05799 13.6422 1.93397 13.725 1.8295 13.8295C1.72504 13.934 1.64217 14.058 1.58564 14.1945C1.5291 14.331 1.5 14.4773 1.5 14.625V19.5C1.5 20.2956 1.81607 21.0587 2.37868 21.6213C2.94129 22.1839 3.70435 22.5 4.5 22.5H19.5C20.2956 22.5 21.0587 22.1839 21.6213 21.6213C22.1839 21.0587 22.5 20.2956 22.5 19.5V14.625C22.5 14.3266 22.3815 14.0405 22.1705 13.8295C21.9595 13.6185 21.6734 13.5 21.375 13.5C21.0766 13.5 20.7905 13.6185 20.5795 13.8295C20.3685 14.0405 20.25 14.3266 20.25 14.625V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.625Z"
              fill="white"
            />
          </svg>
          Import Games
        </button>
      </div>
      <div class="card">
        <form action="">
          <div class="search-game-form">
            <div class="horizontal-form-container">
              <div class="input-fields">
                <div class="input-field-container">
                  <label for="">Provider</label>
                  <SelectDropdown position="absolute" :dataList="optionsList"/>
                  <!-- <div class="custom-select-container">
                    <div
                      class="custom-select"
                      :class="{ focused: isFocused }"
                      tabindex="0"
                      @focusin="handleFocusIn"
                      @focusout="handleFocusOut"
                    >
                      <div class="default-option" v-if="!selectedOption">
                        Select an option
                      </div>
                      <div class="selected-option" v-else>
                        {{ selectedOption }}
                      </div>
                    </div>
                    <div class="dropdown-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2656 7.63281L12 12.8985L6.73436 7.63281L5 9.36717L12 16.3672L19 9.36717L17.2656 7.63281Z"
                          fill="#B4BDC6"
                          :class="{ 'focused-dropdown': isFocused }"
                        />
                      </svg>
                    </div>
                    <div class="options-list" v-if="isFocused">
                      <div
                        class="custom-option"
                        v-for="option in optionsList"
                        @click="selectOption(option.opt)"
                      >
                        {{ option.opt }}
                      </div>
                    </div>
                  </div> -->
                </div>
                <div class="input-field-container">
                  <label for="">Name</label>
                  <input type="text" placeholder="Game1" class="input-field" />
                </div>
              </div>
              <div class="buttons">
                <button class="cancel">Clear</button>
                <button class="button search">Search</button>
              </div>
            </div>
          </div>
        </form>
        <div class="hr"></div>
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

                    <div>{{ game.categoryName }}</div>
                  </div>
                </td>
                <td>
                  <a :href="`/games/edit-game/${game.gameId}`" @click="goto()"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../../stores/authStore";
import SelectDropdown from "../../../components/SelectDropdown.vue"

const authStore = useAuthStore();
const selectedColor = ref(null);
const svgContent = ref("");
const isFocused = ref(false);
const allGames = ref([
  {
    name: "Book of Shadows1",
    providerName: "proveider name",
    providerImage: "src/assets/images/game1.png",
    gameId: "game1",
    categoryName: "Slots",
    categoryIcon: "src/assets/images/slotIcon1.svg",
    background: "#D7F5FC"
  },
  {
    name: "Book of Shadows2",
    providerName: "proveider name",
    providerImage: "src/assets/images/game2.png",
    gameId: "game2",
    categoryName: "Multiple",
    categoryIcon: "src/assets/images/slotIcon2.svg",
    background: "#FFF2D6"

  },
  {
    name: "Book of Shadows3",
    providerName: "proveider name",
    providerImage: "src/assets/images/game3.png",
    gameId: "game3",
    categoryName: "Live",
    categoryIcon: "src/assets/images/slotIcon3.svg",
    background: "#E7E7FF"

  },
  {
    name: "Book of Shadows1",
    providerName: "proveider name",
    providerImage: "src/assets/images/game1.png",
    gameId: "game1",
    categoryName: "Slots",
    categoryIcon: "src/assets/images/slotIcon1.svg",
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

const selectedOption = ref("");
const optionsList = [
  {
    name: "Option 1",
    id: 1,
  },
  {
    name: "Option 2",
    id: 2,
  },
  {
    name: "Option 3",
    id: 3,
  },
  {
    name: "Option 4",
    id: 4,
  },

];
onMounted(() => {
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
