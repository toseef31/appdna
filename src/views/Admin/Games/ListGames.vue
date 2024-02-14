<template>
  <div>
    <div class="banner">
      <img src="@/assets/images/games.png" alt="" />
      <h1>Games Lists</h1>
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
      <span class="current">Games Lists</span>
    </div>
    <div class="right-btn-container">
      <router-link to="/games/create-game-list">
        <button class="btn-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" fill="white" />
          </svg>
          Add New Games List
        </button>
      </router-link>
    </div>
    <div class="card">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>List Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index in 4">
              <td>Promo6744{{ index }}</td>
              <td>
                <a :href="`/games/edit-game-list/Promo6744${index}`">View</a>
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
