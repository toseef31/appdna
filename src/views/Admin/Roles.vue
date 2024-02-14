<template>
  <div>
    <div class="banner">
      <img src="@/assets/images/roles.png" alt="" />
      <h1>Roles</h1>
    </div>

    <div class="desktop-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Users</th>
                <th>Manage Users</th>
                <th>Manage Roles</th>
                <th>Manage Tenants</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="roles">
              <tr v-for="(role, index) in roles" :key="index">
                <td>{{ role.name }}</td>
                <td>{{ index + 1 }}</td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <label class="checkbox-container">
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>
                  <a
                    href="javascript:void(0)"
                    @click="editRole(role.id, 'edit')"
                    >Edit</a
                  >
                </td>
                <td>
                  <a
                    href="javascript:void(0)"
                    @click="showModal(role, 'delete')"
                    >Delete</a
                  >
                </td>
              </tr>
              <tr>
                <td
                  colspan="7"
                  class="add-user-container"
                  :class="{ 'at-hover': !showAddRoleForm }"
                >
                  <div
                    class=""
                    v-if="!showAddRoleForm"
                    @click.prevent="showAddRoleForm = !showAddRoleForm"
                  >
                    <a href="javascript:void(0)" class="add-new">+ New Role</a>
                  </div>
                  <div class="add-user-form" v-if="showAddRoleForm">
                    <form @submit.prevent="onCreateRole">
                      <input
                        type="text"
                        placeholder="Name"
                        v-model="name"
                        required
                      />

                      <div class="buttons">
                        <button type="submit">Create</button>
                        <button
                          class="cancel"
                          type="button"
                          @click.prevent="showAddRoleForm = false"
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
            You are about to delete the role: <span>{{ role.name }}</span
            >.
          </p>
          <div class="listButtons">
            <button class="button cancel" @click="closeModal">Cancel</button>
            <button class="button" @click="deleteRole(role.id)">
              Yes, delete this role
            </button>
          </div>
        </div>
      </Modal>
    </teleport>

    <div class="mobile-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="roles">
              <tr v-for="(role, index) in roles" :key="index">
                <td>{{ role.name }}</td>
                <td
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    @click="editRole(role.id, 'edit')"
                  >
                    <path
                      d="M19.045 7.90088C19.423 7.52288 19.631 7.02088 19.631 6.48688C19.631 5.95288 19.423 5.45088 19.045 5.07288L17.459 3.48688C17.081 3.10888 16.579 2.90088 16.045 2.90088C15.511 2.90088 15.009 3.10888 14.632 3.48588L4 14.0849V18.4999H8.413L19.045 7.90088ZM16.045 4.90088L17.632 6.48588L16.042 8.06988L14.456 6.48488L16.045 4.90088ZM6 16.4999V14.9149L13.04 7.89688L14.626 9.48288L7.587 16.4999H6ZM4 20.4999H20V22.4999H4V20.4999Z"
                      fill="#696CFF"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    @click="showModal(role.id, 'delete')"
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
                  :class="{ 'at-hover': !showAddRoleForm }"
                >
                  <div
                    class=""
                    v-if="!showAddRoleForm"
                    @click.prevent="showAddRoleForm = !showAddRoleForm"
                  >
                    <a href="javascript:void(0)" class="add-new">+ New Role</a>
                  </div>
                  <div class="add-user-form" v-if="showAddRoleForm">
                    <form @submit.prevent="onCreateRole">
                      <input
                        type="text"
                        placeholder="Name"
                        v-model="name"
                        required
                      />
                      <button
                        type="button"
                        class="cancel"
                        @click.prevent="showAddRoleForm = false"
                      >
                        Cancel
                      </button>
                      <button type="submit" class="button">Create</button>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/popover.modal.vue";
import { ref, onMounted } from "vue";
import router from "../../router/index";
import api from "../../api/api";

const roles = ref([]);
const role = ref(null);
const modalType = ref(null);
const name = ref("");
const showAddRoleForm = ref(false);
const isModalVisible = ref(false);

const showModal = (data, type) => {
  isModalVisible.value = true;
  modalType.value = type;
  role.value = data;
  console.log(role)
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  getRoles();
});

const getRoles = async () => {
  const response = await api.auth.getRoles();
  roles.value = response.data.roles;
};

const editRole = (id) => {
  router.push(`/edit-role/${id}`);
};

const onCreateRole = () => {
  if (name.value) {
    createRole(name.value);
  }
  name.value = "";
};

const createRole = async (name) => {
  const response = await api.auth.createRole(name);
  if (response.status == 200) {
    getRoles();
  }
  showAddRoleForm.value = false;
};

const deleteRole = async (id) => {
  // const response = await api.auth.remove(id);
  closeModal();
  // if (response.status === 200) {
  //   getRoles();
  // }
};
</script>
