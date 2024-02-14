import { ref } from 'vue'
import { defineStore } from 'pinia'
import instance from '../api/axiosInstance';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('authStore', () => {
  const userName = ref('');
  const dateJoined = ref('');
  const email = ref('');
  const emailConfirmed = ref(false);
  const tfaEnabled = ref(false);
  const loggedIn = ref(true);
  const tenantId = ref('');
  const tenantName = ref('');

  const allGames = ref([
    {
      name: "Book of Shadows1",
      providerName: "provider 1",
      providerImage: "src/assets/images/game1.png",
      gameId: "game1",
      categoryName: "category 1",
      categoryIcon: "src/assets/images/slotIcon1.svg"
    },
    {
      name: "Book of Shadows2",
      providerName: "provider 2",
      providerImage: "src/assets/images/game2.png",
      gameId: "game2",
      categoryName: "category 2",
      categoryIcon: "src/assets/images/slotIcon2.svg"
    },
    {
      name: "Book of Shadows3",
      providerName: "provider 3",
      providerImage: "src/assets/images/game3.png",
      gameId: "game3",
      categoryName: "category 3",
      categoryIcon: "src/assets/images/slotIcon3.svg"
    },
    {
      name: "Book of Shadows4",
      providerName: "provider 1",
      providerImage: "src/assets/images/game1.png",
      gameId: "game4",
      categoryName: "category 1",
      categoryIcon: "src/assets/images/slotIcon1.svg"
    },
    {
      name: "Book of Shadows5",
      providerName: "provider 2",
      providerImage: "src/assets/images/game2.png",
      gameId: "game5",
      categoryName: "category 2",
      categoryIcon: "src/assets/images/slotIcon2.svg"
    },
    {
      name: "Book of Shadows6",
      providerName: "provider 3",
      providerImage: "src/assets/images/game3.png",
      gameId: "game6",
      categoryName: "category 3",
      categoryIcon: "src/assets/images/slotIcon3.svg"
    },
    {
      name: "Book of Shadows7",
      providerName: "provider 1",
      providerImage: "src/assets/images/game1.png",
      gameId: "game7",
      categoryName: "category 1",
      categoryIcon: "src/assets/images/slotIcon1.svg"
    },
    {
      name: "Book of Shadows8",
      providerName: "provider 2",
      providerImage: "src/assets/images/game2.png",
      gameId: "game8",
      categoryName: "category 2",
      categoryIcon: "src/assets/images/slotIcon2.svg"
    },
    {
      name: "Book of Shadows9",
      providerName: "provider 3",
      providerImage: "src/assets/images/game3.png",
      gameId: "game9",
      categoryName: "category 3",
      categoryIcon: "src/assets/images/slotIcon3.svg"
    },
    {
      name: "Book of Shadows10",
      providerName: "provider 3",
      providerImage: "src/assets/images/game3.png",
      gameId: "game10",
      categoryName: "category 3",
      categoryIcon: "src/assets/images/slotIcon3.svg"
    },
  ]);
  

  function login(data) {
    userName.value = data.user.userName;
    dateJoined.value = data.user.dateJoined;
    email.value = data.user.email;
    emailConfirmed.value = data.user.emailConfirmed;
    tfaEnabled.value = data.user.tfaEnabled;
    loggedIn.value = true;

    localStorage.setItem('authToken', data.jwt);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    instance.defaults.headers.common['Authorization'] = `bearer ${data.jwt}`;
  }

  async function loginFromStorage() {
    var refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken != null && refreshToken != undefined) {
      const jwt = localStorage.getItem('authToken');
      if (jwt != null && jwt != undefined) {
        const decodedJwt = jwtDecode(jwt);
        if (Date.now() >= decodedJwt.exp * 1000) {
          try {
            const response = await instance({
              method: 'post',
              url: '/user/refresh-token',
              data: {
                refreshToken: refreshToken,
              }
            });

            if (response.status == 200) {
              localStorage.setItem('authToken', response.data.jwt);
            } else {
              logout();
              return;
            }
          } catch (error) {
            logout();
            return;
          }
        }

        instance.defaults.headers.common['Authorization'] = `bearer ${jwt}`;
        loggedIn.value = true;

        var tenantDetails = localStorage.getItem('tenant');
        if (tenantDetails != null && tenantDetails != undefined) {
          tenantDetails = JSON.parse(tenantDetails);
          tenantId.value = tenantDetails.id;
          tenantName.value = tenantDetails.name;
          instance.defaults.headers.common['Tenant'] = tenantDetails.id;
        }

        //TODO change this doesn't seem the best way to do this
        var user = JSON.parse(localStorage.getItem('user'));
        userName.value = user.userName;
        dateJoined.value = user.dateJoined;
        email.value = user.email;
        emailConfirmed.value = user.emailConfirmed;
        tfaEnabled.value = user.tfaEnabled;
      }
    }
  }

  function logout() {
    userName.value = '';
    dateJoined.value = '';
    email.value = '';
    emailConfirmed.value = false;
    tfaEnabled.value = false;
    loggedIn.value = false;

    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    instance.defaults.headers.common['Authorization'] = '';
    instance.defaults.headers.common['Tenant'] = '';
  }

  function toggleTfa() {
    tfaEnabled.value = !tfaEnabled.value;
    var user = JSON.parse(localStorage.getItem('user'));
    user.tfaEnabled = tfaEnabled.value;
    localStorage.setItem('user', JSON.stringify(user));
  }

  function setTenant(id, name) {
    tenantId.value = id;
    tenantName.value = name;
    instance.defaults.headers.common['Tenant'] = id;
    localStorage.setItem('tenant', JSON.stringify({id, name}));
  }

  return { userName, dateJoined, email, emailConfirmed, tfaEnabled , loggedIn, tenantId, tenantName, allGames,
    login, logout, loginFromStorage, toggleTfa, setTenant }
})
