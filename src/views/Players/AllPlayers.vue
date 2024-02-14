<template>
  <div>
    <div class="banner">
      <img src="@/assets/images/players.png" alt="" />
      <h1>Players</h1>
    </div>
    <div class="card">
      <div class="fliters-container">
        <div class="filters-header" @click="isShowFilters = !isShowFilters">
          <div class="filter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M9.33325 14.6668H22.6666V17.3335H9.33325V14.6668ZM5.33325 9.3335H26.6666V12.0002H5.33325V9.3335ZM13.3333 20.0002H18.6666V22.6668H13.3333V20.0002Z"
                fill="#566A7F"
              />
            </svg>
            <p>Filter</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              :style="[
                isShowFilters ? { rotate: '180deg' } : { rotate: '0deg' },
              ]"
            >
              <path
                d="M17.0209 0.177246L10.0001 7.1981L2.97923 0.177246L0.666748 2.48973L10.0001 11.8231L19.3334 2.48973L17.0209 0.177246Z"
                fill="#566A7F"
              />
            </svg>
          </div>
        </div>
        <form action="" class="filter-form" v-if="isShowFilters">
          <div class="filters-container">
            <div>
              <label for="id">ID</label>
              <input type="text" placeholder="123456" />
            </div>
            <div>
              <label for="id">SIGNUP DATE</label>
              <input type="text" placeholder="00-00-0000" />
            </div>
            <div>
              <label for="id">AFFILIATE</label>
              <input type="text" placeholder="affiliate" />
            </div>
            <div>
              <label for="id">LAST BET</label>
              <input type="text" placeholder="00-00-00000" />
            </div>
            <div>
              <label for="id">GGR</label>
              <input type="text" placeholder="0.00" />
            </div>
            <div>
              <label for="id">WAGER</label>
              <input type="text" placeholder="0.00" />
            </div>
            <div>
              <label for="id">LAST DEPOSIT DATE</label>
              <input type="text" placeholder="00-00-0000" />
            </div>
            <div class="buttons">
              <button class="cancel">Clear</button>
              <button class="button search">Search</button>
            </div>
          </div>
        </form>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Signup Date</th>
              <th>Signup Code</th>
              <th>Total Deposit</th>
              <th>Total Wager</th>
              <th>Total GGR</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index in 6">
              <td>
                <router-link :to="{ name: 'player-details', params: { id: `163049${index}` } }">
                  <!-- <a> -->
                    163049{{ index }}
                  <!-- </a> -->
                
                </router-link>
              </td>
              <td>12-01-2024</td>
              <td>starBurst100</td>
              <td>&#163;3475.00</td>
              <td>&#163;35.00</td>
              <td class="ggr"
                :style="[
                  index % 3 === 0 ? { color: '#FF3E1D' } : { color: '#82E14F' },
                ]"
              >
              &#163;5.00
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
</template>

<style scoped>
.select-wrapper {

  & select {
    height: 48px;
    border-radius: 8px;
    border: 1px solid;
    width: 100%;
    padding: 8px 16px;
    border: 1px;
    outline: 1px solid#D9DEE3;
    margin-bottom: 24px;

    &:focus {
    outline: 1px solid #696cff;
    box-shadow: 1px 1px 10px 0px rgba(105, 108, 255, 0.3);
  }
    
  }
}
</style>

<script setup>
import { ref } from "vue";

import { useRoute, RouterView } from "vue-router";
const isShowFilters = ref(false);
</script>
