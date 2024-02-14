<template>
  <div class="edit-brand">
    <div class="banner">
      <div class="brand-icon-main-container">
        <div class="brand-icon-container">
          <div class="brand-img-container">
            <img src="@/assets/images/dice.png" alt="" />
          </div>
        </div>
        <div class="svg-icon-container" @click="showModal('', 'uploadImg')">
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6965 3.93392C10.9485 3.68192 11.0872 3.34725 11.0872 2.99125C11.0872 2.63525 10.9485 2.30059 10.6965 2.04859L9.63917 0.991253C9.38717 0.739253 9.0525 0.600586 8.6965 0.600586C8.3405 0.600586 8.00584 0.739253 7.7545 0.990586L0.666504 8.05659V10.9999H3.6085L10.6965 3.93392ZM8.6965 1.93392L9.7545 2.99059L8.6945 4.04659L7.63717 2.98992L8.6965 1.93392ZM1.99984 9.66658V8.60992L6.69317 3.93125L7.7505 4.98859L3.05784 9.66658H1.99984ZM0.666504 12.3333H11.3332V13.6666H0.666504V12.3333Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <h1>{{ capitalizeBrand(brandId) }}</h1>
    </div>

    <div class="breadcrumbs">
      <a href="/brands">Brands</a>
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
      <span class="current">Manage Brand</span>
    </div>

    <div class="desktop-view">
      <div class="brand-users-card">
        <div class="card-header">
          <h3>Users in Brand</h3>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="users">
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.userName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.dateJoined.split("T")[0] }}</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    @click="showModal(user, 'delete')"
                    >Delete</a
                  >
                </td>
              </tr>
              <tr>
                <td
                  colspan="7"
                  class="add-user-container"
                  :class="{ 'at-hover': !showAddUserForm }"
                >
                  <div
                    class=""
                    v-if="!showAddUserForm"
                    @click.prevent="showAddUserForm = !showAddUserForm"
                  >
                    <a href="javascript:void(0)" class="add-new">+ New User</a>
                  </div>
                  <div class="add-user-form" v-if="showAddUserForm">
                    <form @submit.prevent="onAddUserInBrand">
                      <SelectDropdown position="relative" :dataList="dropdownList(allUsers)" :isOutline='false'/>
                      <div class="buttons">
                        <button type="submit">Add</button>
                        <button
                          class="cancel"
                          type="button"
                          @click.prevent="showAddUserForm = false"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
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

    <teleport to="body">
      <Modal
        v-if="isModalVisible"
        :isOpen="isModalVisible"
        @close-modal="closeModal"
      >
        <div
          class="cross-button"
          @click="closeModal"
          v-if="modalType === 'delete'"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3337 8.54699L23.4537 6.66699L16.0003 14.1203L8.54699 6.66699L6.66699 8.54699L14.1203 16.0003L6.66699 23.4537L8.54699 25.3337L16.0003 17.8803L23.4537 25.3337L25.3337 23.4537L17.8803 16.0003L25.3337 8.54699Z"
              fill="#8E9BAA"
            />
          </svg>
        </div>
        <div class="delete-modal" v-if="modalType === 'delete'">
          <h1>Are you sure?</h1>
          <p>
            You are about to delete: <span>{{ user.userName }}</span
            >.
            <br />
            as a user form the brand <span>{{ capitalizeBrand(brandId) }}</span>
          </p>
          <div class="listButtons">
            <button class="button cancel" @click="closeModal">Cancel</button>
            <button class="button" @click="removeUserFromBrand(user.id)">
              Yes, delete this user
            </button>
          </div>
        </div>
        <div class="upload-logo-modal" v-if="modalType === 'uploadImg'">
          <div class="cross-button-banner-modal" @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19.3332 2.54699L17.4532 0.666992L9.99984 8.12033L2.5465 0.666992L0.666504 2.54699L8.11984 10.0003L0.666504 17.4537L2.5465 19.3337L9.99984 11.8803L17.4532 19.3337L19.3332 17.4537L11.8798 10.0003L19.3332 2.54699Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="modal-banner">
            <h1>Upload Logo</h1>
          </div>
          <div class="modal-contant-container">
            <div class="logo-container">
              <div class="logo-up-container">
                <img
                  class="logo-img"
                  :src="newLogo ? newLogo : '/src/assets/images/test-logo.jpg'"
                  alt=""
                />
              </div>

              <div class="upload-btn">
                <label>
                  Upload new photo
                  <input
                    @change="uploadImg"
                    type="file"
                    ref="file"
                    accept="image/gif, 
                image/jpeg, image/png"
                    hidden
                  />
                </label>
              </div>

              <div class="listButtons">
                <button class="button cancel" @click="closeModal">
                  Cancel
                </button>
                <button class="button">Save</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </teleport>

    <div class="mobile-view">
      <div class="card card-header">
        <h2>Users in Brand</h2>
      </div>
      <div
        class="card brand-user-card"
        v-for="(user, index) in users"
        :key="index"
      >
        <div class="user-name-container">
          <div
            class="user-avatar"
            :style="{
              color: user.brandLogo.color,
              background: user.brandLogo.background,
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 2.66699C14.6815 2.66699 13.3925 3.05799 12.2962 3.79053C11.1999 4.52307 10.3454 5.56426 9.8408 6.78244C9.33622 8.00061 9.2042 9.34105 9.46143 10.6343C9.71867 11.9275 10.3536 13.1154 11.286 14.0477C12.2183 14.9801 13.4062 15.615 14.6994 15.8722C15.9926 16.1295 17.333 15.9974 18.5512 15.4929C19.7694 14.9883 20.8106 14.1338 21.5431 13.0375C22.2757 11.9411 22.6667 10.6522 22.6667 9.33366C22.6667 7.56555 21.9643 5.86986 20.714 4.61961C19.4638 3.36937 17.7681 2.66699 16 2.66699ZM16 13.3337C15.2089 13.3337 14.4355 13.0991 13.7777 12.6595C13.1199 12.22 12.6072 11.5953 12.3045 10.8644C12.0017 10.1335 11.9225 9.32922 12.0769 8.5533C12.2312 7.77737 12.6122 7.06464 13.1716 6.50523C13.731 5.94582 14.4437 5.56486 15.2196 5.41052C15.9956 5.25618 16.7998 5.33539 17.5307 5.63814C18.2616 5.94089 18.8864 6.45358 19.3259 7.11138C19.7654 7.76917 20 8.54253 20 9.33366C20 10.3945 19.5786 11.4119 18.8284 12.1621C18.0783 12.9122 17.0609 13.3337 16 13.3337ZM28 28.0003V26.667C28 24.1916 27.0167 21.8177 25.2663 20.0673C23.516 18.317 21.142 17.3337 18.6667 17.3337H13.3333C10.858 17.3337 8.48401 18.317 6.73367 20.0673C4.98333 21.8177 4 24.1916 4 26.667V28.0003H6.66667V26.667C6.66667 24.8989 7.36905 23.2032 8.61929 21.9529C9.86953 20.7027 11.5652 20.0003 13.3333 20.0003H18.6667C20.4348 20.0003 22.1305 20.7027 23.3807 21.9529C24.631 23.2032 25.3333 24.8989 25.3333 26.667V28.0003H28Z"
                :fill="user.brandLogo.color"
              />
            </svg>
          </div>
          <div>
            <h3 :style="{ color: user.brandLogo.color }">
              {{ user.userName }}
            </h3>
            <p>{{ user.dateJoined.split("T")[0] }}</p>
          </div>
        </div>
        <p class="email">
          {{ user.email }}
        </p>
        <div>
          <button
            class="button"
            :style="{
              background: user.brandLogo.color,
              boxShadow: `3px 3px 6px 0 ${user.brandLogo.color}40`,
            }"
            @click="showModal(user, 'delete')"
          >
            Delete
          </button>
        </div>
      </div>
      <button
        class="button create-brand-btn"
        v-if="!isAddUser"
        @click="isAddUser = true"
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 11H13.5V5H11.5V11H5.5V13H11.5V19H13.5V13H19.5V11Z"
            fill="white"
          />
        </svg>
        New User
      </button>
      <div class="card" v-if="isAddUser">
        <form @submit.prevent="onAddUserInBrand">
          <select name="" id="" v-model="name">
            <option :value="user.userName" v-for="user in allUsers">
              {{ user.userName }}
            </option>
          </select>
          <button type="button" class="cancel" @click="isAddUser = false">
            Cancel
          </button>
          <button type="submit" class="button submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/popover.modal.vue";
import SelectDropdown from "../components/SelectDropdown.vue";
import { ref, onMounted } from "vue";
import router from "../router/index";
import api from "../api/api";
import { useRoute } from "vue-router";

const route = useRoute();

const modalType = ref(null);

const brandId = ref("");
const name = ref("");
const allUsers = ref([]);
const users = ref([]);
const user = ref({});
const newLogo = ref("");
const showAddUserForm = ref(false);
const isModalVisible = ref(false);
const selectedColor = ref(null);
const isAddUser = ref(false);

const isFocused = ref(false);
const selectedOption = ref("");

onMounted(async () => {
  getBrandUsers();
  getUsers();
});

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

const setLogo = (usersList) => {
  usersList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.brandLogo = selectedColor.value;
  });
};

const showModal = (data, type) => {
  user.value = data;
  isModalVisible.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isModalVisible.value = false;
};

async function removeUser(userId) {
  const response = await api.tenants.removeUserFromTenant(
    userId,
    brandId.value
  );
  if (response.status == 200) {
    router.push("/brands");
  }
}

const getBrandUsers = async () => {
  brandId.value = route.params.id;
  const response = await api.tenants.getUsers(brandId.value);
  users.value = response.data.users;
  setLogo(users.value);
};




// const onCreateUser = () => {
//   if (name.value && email.value) {
//     createUser(name.value, email.value);
//   }
//   name.value = "";
//   email.value = "";
// };

// const createUser = async (name, email) => {
//   const response = await api.auth.createUser(name, email);
//   if (response.status == 200) {
//     getRole();
//   }
// };
// const deleteUser = async (id) => {
//   const response = await api.auth.deleteUser(id);
//   closeModal();
//   if (response.status === 200) {
//     getRole();
//   }
// };

const getUsers = async () => {
  const response = await api.auth.getUsers();
  allUsers.value = response.data.users;
  dropdownList(allUsers.value);
};

function dropdownList (list){
  return list.map(u => ({
    name: u.userName,
    id: u.id
  }));
}
const onAddUserInBrand = () => {
  if (name.value) {
    addUserToBrand(name.value, brandId.value);
  }
  name.value = "";
  showAddUserForm.value = false;
};

const addUserToBrand = async (name, id) => {
  const response = await api.tenants.addUserToTenant(name, id);
  if (response.status === 200) {
    getBrandUsers();
  }
  isAddUser.value = false;
};

async function removeUserFromBrand(userId) {
  const response = await api.tenants.removeUserFromTenant(
    userId,
    brandId.value
  );
  if (response.status == 200) {
    getBrandUsers();
  }
  closeModal();
}

const capitalizeBrand = (id) => {
  return id.charAt(0).toUpperCase() + id.slice(1);
};

const uploadImg = (e) => {
  newLogo.value = e.target.files[0].name;
  const file = e.target.files;
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      newLogo.value = event.target.result;
    };
    fileReader.readAsDataURL(file[0]);
  }
};
</script>
