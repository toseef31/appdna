<template>
  <div class="brands">
    <div class="banner">
      <img src="@/assets/images/brands.png" alt="" />
      <h1>Brands</h1>
    </div>
    <div class="desktop-view">
      <div class="right-btn-container">
        <button class="btn-lg" @click="showModal('', 'create')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" fill="white" />
          </svg>
          Create Brand
        </button>
      </div>
    </div>
    <div class="mobile-view">
      <button
        class="button create-brand-btn"
        v-if="!isCreateBrand"
        @click="isCreateBrand = true"
      >
        + Create Brand
      </button>
      <div class="card" v-if="isCreateBrand">
        <form action="">
          <input type="text" placeholder="Brand Name" />
          <input type="text" placeholder="Brand ID" />
          <input type="text" placeholder="Website" />
          <button
            type="button "
            class="cancel btn-sm"
            @click="isCreateBrand = false"
          >
            Cancel
          </button>
          <button type="submit" class="button btn-sm">Create</button>
        </form>
      </div>
    </div>
    <div class="desktop-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Website</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="brands">
              <tr v-for="(brand, index) in brands" :key="index">
                <td>
                  <div class="brand-name-container">
                    <div
                      class="brand-name-logo"
                      :style="{
                        color: brand.brandLogo.color,
                        background: brand.brandLogo.background,
                      }"
                    >
                      {{ brand.name[0] }}
                    </div>
                    <!-- <div class="brand-logo-container">
                    <img class="brand-logo" src="@/assets/images/cube.png" alt="brand-logo">
                </div> -->
                    <div>
                      {{ brand.name }}
                    </div>
                  </div>
                </td>
                <td>{{ brand.filterId }}</td>
                <td>{{ brand.website }}</td>
                <td>
                  <a href="javascript:void(0)">View</a>
                </td>
                <td>
                  <a
                    href="javascript:void(0)"
                    @click="editBrand(brand.filterId)"
                    >Manage</a
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
      <teleport to="body">
        <Modal
          v-if="isModalVisible"
          :isOpen="isModalVisible"
          @close-modal="closeModal"
        >
          <div class="detail-modal create-brand" v-if="modalType === 'create'">
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
              <h1>Create Brand</h1>
            </div>
            <div class="modal-contant-container">
              <div class="logo-section">
                <div class="relative">
                  <div v-if="newLogo" class="logo-container">
                    <img
                      src="@/assets/images/test-logo.jpg"
                      alt=""
                      class="logo-img"
                    />
                  </div>
                  <div v-else class="alphabet">A</div>
                  <div class="edit-icon" @click="showModal('', 'uploadImg')">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M25.3935 9.86784C25.8975 9.36384 26.1748 8.69451 26.1748 7.98251C26.1748 7.27051 25.8975 6.60117 25.3935 6.09717L23.2788 3.98251C22.7748 3.47851 22.1055 3.20117 21.3935 3.20117C20.6815 3.20117 20.0122 3.47851 19.5095 3.98117L5.3335 18.1132V23.9998H11.2175L25.3935 9.86784ZM21.3935 5.86784L23.5095 7.98117L21.3895 10.0932L19.2748 7.97984L21.3935 5.86784ZM8.00016 21.3332V19.2198L17.3868 9.86251L19.5015 11.9772L10.1162 21.3332H8.00016ZM5.3335 26.6665H26.6668V29.3332H5.3335V26.6665Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <form @submit.prevent="onCreateBrand">
                <label for="name">NAME</label>
                <input
                  type="text"
                  v-model="brandName"
                  placeholder="Brand Casino"
                  required
                />
                <label for="name">ID</label>
                <input
                  type="text"
                  v-model="brandId"
                  placeholder="Brand"
                  required
                />
                <label for="name">WEBSITE</label>
                <input
                  type="url"
                  v-model="brandUrl"
                  placeholder="brandcasino.com"
                  required
                />
                <div class="listButtons">
                  <button type="button" class="cancel" @click="closeModal">
                    Cancel
                  </button>
                  <button type="submit">Create</button>
                </div>
              </form>
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
                    :src="newLogo ? newLogo : 'src/assets/images/test-logo.jpg'"
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
    </div>
    <div class="mobile-view" v-if="brands">
      <div class="card" v-for="(brand, index) in brands" :key="index">
        <div class="mobile-brand-name-container">
          <div
            class="brand-name-logo"
            :style="{
              color: brand.brandLogo.color,
              background: brand.brandLogo.background,
            }"
            @click="showModal('', 'uploadImg')"
          >
            {{ brand.name[0] }}
          </div>
          <!-- <div class="img-container" style="height: 40px; width: 40px; border-radius: 50%;">
            <img src="@/assets/images/banana.png" alt="brand logo" style="height: 100%; width: 100%; overflow: hidden;">
          </div> -->
          <div class="brand-name">
            {{ brand.name }}
          </div>
        </div>
        <div class="website">
          {{ brand.website }}
        </div>
        <div class="brand-id">Brand ID: {{ brand.filterId }}</div>

        <div class="buttons">
          <button class="view">View</button>
          <button class="manage" @click="editBrand(brand.filterId)">
            Manage
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/popover.modal.vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import router from "../router/index";
import api from "../api/api";

const authStore = useAuthStore();
const modalType = ref(null);
const showAddRoleForm = ref(false);
const isModalVisible = ref(false);
const brands = ref([]);
const newLogo = ref("");
const brandName = ref("");
const brandId = ref("");
const brandUrl = ref("");
const selectedColor = ref(null);
const isCreateBrand = ref(false);
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

const setLogo = (brandsList) => {
  brandsList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.brandLogo = selectedColor.value;
  });
};
onMounted(async () => {
  getbrands();
});

const getbrands = async () => {
  const response = await api.tenants.getTenants();
  brands.value = response.data.tenants;
  setLogo(brands.value);
};

const editBrand = (id) => {
  router.push(`/edit-brand/${id}`);
};
async function setTenant(tenantId, name) {
  authStore.setTenant(tenantId, name);
  router.push("/");
}

const showModal = (data, type) => {
  isModalVisible.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const onCreateBrand = () => {
  if (brandId.value && brandName.value && brandUrl.value) {
    createBrand(brandId.value, brandName.value, brandUrl.value);
  }
};

const createBrand = async (name, id, url) => {
  const response = await api.tenants.createTenant(name, id, url);
  if (response.status === 200) {
    getbrands();
  }
  closeModal();
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
