<template>
  <div class="edit-role">
    <div class="desktop-view">
      <div class="banner">
        <img src="@/assets/images/roles.png" alt="" />
        <h1>{{ username }}</h1>
      </div>
    </div>

    <div class="mobile-view">
      <div class="banner">
        <h1>{{ username }}</h1>
      </div>
    </div>
    <div class="breadcrumbs">
      <a href="/roles">Roles</a>
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
      <span class="current">Edit Role</span>
    </div>
    <div class="desktop-view">
      <div>
        <form action="">
          <label for="username">Name</label>
          <input
            type="text"
            name="username"
            id=""
            placeholder="username"
            v-model="username"
            required
          />
        </form>
      </div>

      <div class="edit-role-card">
        <div class="card-header">
          <h3>Users in Role</h3>
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
                    v-if="!showAddUserForm"
                    @click.prevent="showAddUserForm = !showAddUserForm"
                  >
                    <a href="javascript:void(0)" class="add-new">+ New User</a>
                  </div>
                  <div class="add-user-form" v-if="showAddUserForm">
                    <form @submit.prevent="onAddUserInRole">
                      <select name="" id="" v-model="name">
                        <option :value="user.userName" v-for="user in allUsers">
                          {{ user.userName }}
                        </option>
                      </select>
                      <div class="buttons">
                        <button type="submit">Create</button>
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

      <div class="edit-role-card permissions">
        <div class="card-header">
          <h3>Permissions</h3>
        </div>
        <div class="table-container">
          <table>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tbody v-if="permissions">
              <tr v-for="(permission, index) in permissions" :key="index">
                <td>{{ permission.split(/(?=[A-Z])/).join(' ') }}</td>
                <td>
                  <label class="checkbox-container">
                    <input
                      type="checkbox"
                      :checked="isRoleExist(permission) === true"
                      @click="togglePermission(permission)"
                    />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button class="save-button">Save</button>
    </div>

    <teleport to="body">
      <Modal
        v-if="isModalVisible"
        :isOpen="isModalVisible"
        @close-modal="closeModal"
      >
        <div class="cross-button" @click="closeModal">
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
            You are about to delete the user: <span>{{ user.userName }}</span
            >.
            <br />

            from the role: <span>{{ roleId }}</span
            >.
          </p>

          <div class="listButtons">
            <button class="button cancel" @click="closeModal">Cancel</button>
            <button class="button" @click="removeUser(user.id)">
              Yes, delete this user
            </button>
          </div>
        </div>
      </Modal>
    </teleport>

    <div class="mobile-view">
      <div class="tabs">
        <div
          class="tab"
          :class="{ active: tab === 'users' }"
          @click="switchTab('users')"
        >
          Users
        </div>
        <div
          class="tab"
          :class="{ active: tab === 'permission' }"
          @click="switchTab('permission')"
        >
          Permission
        </div>
      </div>
      <div class="mobile-view">
        <div class="card" v-if="tab === 'users'">
          <div class="table-container">
            <table>
              <tbody v-if="users">
                <tr>
                  <td colspan="2">
                    <h3>Users in Role</h3>
                  </td>
                </tr>
                <tr v-for="(user, index) in users" :key="index">
                  <td>{{ user.userName }}</td>
                  <td
                    style="
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      @click="showModal(user, 'delete')"
                    >
                      <path
                        d="M5 20.5C5 21.0304 5.21071 21.5391 5.58579 21.9142C5.96086 22.2893 6.46957 22.5 7 22.5H17C17.5304 22.5 18.0391 22.2893 18.4142 21.9142C18.7893 21.5391 19 21.0304 19 20.5V8.5H21V6.5H17V4.5C17 3.96957 16.7893 3.46086 16.4142 3.08579C16.0391 2.71071 15.5304 2.5 15 2.5H9C8.46957 2.5 7.96086 2.71071 7.58579 3.08579C7.21071 3.46086 7 3.96957 7 4.5V6.5H3V8.5H5V20.5ZM9 4.5H15V6.5H9V4.5ZM8 8.5H17V20.5H7V8.5H8Z"
                        fill="#696CFF"
                      />
                      <path
                        d="M9 10.5H11V18.5H9V10.5ZM13 10.5H15V18.5H13V10.5Z"
                        fill="#696CFF"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    class="add-user-container"
                    :class="{ 'at-hover': !showAddUserForm }"
                  >
                    <div
                      class=""
                      v-if="!showAddUserForm"
                      @click.prevent="showAddUserForm = !showAddUserForm"
                    >
                      <a href="javascript:void(0)">+ New User</a>
                    </div>
                    <div class="add-user-form" v-if="showAddUserForm">
                      <form @submit.prevent="onAddUserInRole">
                        <select name="" id="" v-model="name">
                          <option
                            :value="user.userName"
                            v-for="user in allUsers"
                          >
                            {{ user.userName }}
                          </option>
                        </select>
                        <button
                          type="button"
                          class="cancel"
                          @click.prevent="showAddUserForm = false"
                        >
                          Cancel
                        </button>
                        <button type="submit" class="button">Add</button>
                      </form>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card" v-if="tab === 'permission'">
          <div class="table-container">
            <table>
              <tbody v-if="users">
                <tr>
                  <td colspan="2">
                    <h3>Permissions</h3>
                  </td>
                </tr>
                <tr v-for="(permission, index) in permissions" :key="index">
                  <td>{{ permission }}</td>
                  <td>
                    <label class="checkbox-container">
                      <input
                        type="checkbox"
                        :checked="isRoleExist(permission) === true"
                        @click="togglePermission(permission)"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button class="button btn-lg">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/popover.modal.vue";
import { ref, onMounted } from "vue";
import router from "../../router/index";
import api from "../../api/api";
import { useRoute } from "vue-router";

const route = useRoute();

const roles = ref([]);
const user = ref(null);
const modalType = ref(null);
const name = ref("");
const email = ref("");

const username = ref("");
const users = ref([]);
const allUsers = ref([]);
const permissions = ref([]);
const claims = ref([]);
const roleId = ref("");
const showAddUserForm = ref(false);
const isModalVisible = ref(false);
const tab = ref("users");

onMounted(async () => {
  getRole();
  getUsers();
});

const showModal = (data, type) => {
  isModalVisible.value = true;
  modalType.value = type;
  user.value = data;
  email.value = data.email;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const getRole = async () => {
  roleId.value = route.params.id;
  const response = await api.auth.getRole(roleId.value);
  username.value = response.data.role.name;
  users.value = response.data.users;
  permissions.value = response.data.permissions;
  claims.value = response.data.claims;
};

const isRoleExist = (permission) => {
  for (var i = 0; i < claims.value.length; i++) {
    if (claims.value[i].value == permission) {
      return true;
    }
  }
  return false;
};

const switchTab = (type) => {
  tab.value = type;
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

async function saveRole() {
  // TODO validation

  const response = await api.auth.updateRole(roleId.value, username.value);
  if (response.status == 200) {
    router.push("/roles");
  }
}

async function togglePermission(permission) {
  if (isChecked(permission)) {
    const response = await api.auth.removeClaimFromRole(
      roleId.value,
      permission
    );
    getRole();
  } else {
    const response = await api.auth.addClaimToRole(roleId.value, permission);
    getRole();
  }
}

function isChecked(permission) {
  for (var i = 0; i < claims.value.length; i++) {
    if (
      claims.value[i].value == permission &&
      claims.value[i].type == "permission"
    ) {
      return true;
    }
  }
  return false;
}

const getUsers = async () => {
  const response = await api.auth.getUsers();
  allUsers.value = response.data.users;
};

async function removeUser(userId) {
  const response = await api.auth.removeUserFromRole(roleId.value, userId);
  if (response.status == 200) {
    router.push("/roles");
  }
}

const onAddUserInRole = () => {
  if (name.value) {
    addUserToRole(name.value, roleId.value);
  }
  name.value = "";
  showAddUserForm.value = false;
};

const addUserToRole = async (name, id) => {
  const response = await api.auth.addUserToRole(id, name);
  if (response.status == 200) {
    getRole();
  }
};
</script>
