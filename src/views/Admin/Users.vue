<template>
  <div>
    <div class="banner">
      <img src="@/assets/images/users.png" alt="" />
      <h1>Users</h1>
    </div>

    <div class="desktop-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="users">
              <tr v-for="(user, index) in users" :key="index">
                <template v-if="!user?.deleted">
                  <td>
                    <span v-if="user.id !== editId">{{ user.userName }}</span>
                    <div class="add-user-form edit-user-form " v-if="user.id === editId">
                      <form>
                        <input
                          type="text"
                          placeholder=""
                          v-model="selectedUser"
                          required
                          form="edit-form"
                          class="user-name"
                        />
                      </form>
                    </div>
                  </td>
                  <td>
                    <span v-if="user.id !== editId">{{ user.email }}</span>
                    <div class="add-user-form edit-user-form " v-if="user.id === editId">
                      <form
                        @submit.prevent="onUpdateUser(user.id)"
                        id="edit-form"
                      >
                        <input
                          type="email"
                          placeholder="Email address"
                          v-model="selectedEmail"
                          required
                        />
                        <div class="buttons">
                          <button type="submit">Save</button>
                          <button
                            class="cancel"
                            type="button"
                            @click.prevent="editId = ''"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </td>
                  <td>{{ user.dateJoined.split("T")[0] }}</td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      @click="showModal(user, 'view')"
                      >View</a
                    >
                  </td>
                  <td>
                    <a href="javascript:void(0)" @click="editIt(user)">Edit</a>
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      @click="showModal(user, 'delete')"
                      >Delete</a
                    >
                  </td>
                </template>
              </tr>
              <tr>
                <td
                  colspan="6"
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
                    <form @submit.prevent="onCreateUser">
                      <input
                        type="text"
                        placeholder="Username"
                        v-model="name"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        v-model="email"
                        required
                      />
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
      <div class="delete-user-card">
        <div class="card-header" @click="showDelateTable = !showDelateTable">
          <h3>Delete Users</h3>
          <i :class="{ rotate: showDelateTable }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
            >
              <path
                d="M12.2656 0.632812L7 5.89845L1.73436 0.632812L0 2.36717L7 9.36717L14 2.36717L12.2656 0.632812Z"
                fill="#8E9BAA"
              />
            </svg>
          </i>
        </div>
        <div class="table-container" v-if="showDelateTable">
          <table v-if="users">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Date Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <template v-if="user?.deleted">
                  <td>{{ user.userName }} {{ index }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.dateJoined.split("T")[0] }}</td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      @click="showModal(user, 'view')"
                      >View</a
                    >
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
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
          class="cross-button-banner-modal"
          @click="closeModal"
          v-if="user && (modalType === 'view' || modalType === 'edit')"
        >
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
        <div class="detail-modal" v-if="user && modalType === 'view'">
          <div class="modal-banner">
            <h1>User Information</h1>
          </div>
          <div class="modal-contant-container">
            <div class="detail">
              <div class="item-container">
                <div class="item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <path
                      d="M28 4.66699C25.6926 4.66699 23.4369 5.35123 21.5183 6.63318C19.5998 7.91513 18.1044 9.73721 17.2214 11.869C16.3384 14.0008 16.1073 16.3466 16.5575 18.6097C17.0077 20.8728 18.1188 22.9516 19.7504 24.5832C21.382 26.2148 23.4608 27.326 25.7239 27.7762C27.9871 28.2263 30.3328 27.9953 32.4646 27.1123C34.5964 26.2292 36.4185 24.7339 37.7005 22.8153C38.9824 20.8967 39.6667 18.6411 39.6667 16.3337C39.6667 13.2395 38.4375 10.272 36.2496 8.08408C34.0617 5.89616 31.0942 4.66699 28 4.66699ZM28 23.3337C26.6155 23.3337 25.2622 22.9231 24.111 22.1539C22.9599 21.3848 22.0627 20.2915 21.5328 19.0124C21.003 17.7334 20.8644 16.3259 21.1345 14.968C21.4046 13.6102 22.0713 12.3629 23.0503 11.3839C24.0292 10.4049 25.2765 9.73826 26.6344 9.46816C27.9922 9.19807 29.3997 9.33669 30.6788 9.8665C31.9579 10.3963 33.0511 11.2935 33.8203 12.4447C34.5895 13.5958 35 14.9492 35 16.3337C35 18.1902 34.2625 19.9707 32.9497 21.2834C31.637 22.5962 29.8565 23.3337 28 23.3337ZM49 49.0003V46.667C49 42.3351 47.2792 38.1807 44.2161 35.1176C41.153 32.0545 36.9985 30.3337 32.6667 30.3337H23.3333C19.0015 30.3337 14.847 32.0545 11.7839 35.1176C8.72083 38.1807 7 42.3351 7 46.667V49.0003H11.6667V46.667C11.6667 43.5728 12.8958 40.6053 15.0838 38.4174C17.2717 36.2295 20.2391 35.0003 23.3333 35.0003H32.6667C35.7609 35.0003 38.7283 36.2295 40.9162 38.4174C43.1042 40.6053 44.3333 43.5728 44.3333 46.667V49.0003H49Z"
                      fill="#696CFF"
                    />
                  </svg>
                </div>
                <h4>UserName</h4>
                <p>{{ user.userName }}</p>
              </div>
              <div class="item-container">
                <div class="item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <path
                      d="M46.6665 9.33301H9.33317C6.7595 9.33301 4.6665 11.426 4.6665 13.9997V41.9997C4.6665 44.5733 6.7595 46.6663 9.33317 46.6663H46.6665C49.2402 46.6663 51.3332 44.5733 51.3332 41.9997V13.9997C51.3332 11.426 49.2402 9.33301 46.6665 9.33301ZM46.6665 13.9997V15.192L27.9998 29.7123L9.33317 15.1943V13.9997H46.6665ZM9.33317 41.9997V21.1023L26.5672 34.5073C26.9758 34.8283 27.4803 35.0027 27.9998 35.0027C28.5194 35.0027 29.0239 34.8283 29.4325 34.5073L46.6665 21.1023L46.6712 41.9997H9.33317Z"
                      fill="#696CFF"
                    />
                  </svg>
                </div>
                <h4>Email Address</h4>
                <p>{{ user.email }}</p>
              </div>

              <div class="item-container">
                <div class="item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                  >
                    <path
                      d="M16.3335 25.667H21.0002V30.3337H16.3335V25.667ZM16.3335 35.0003H21.0002V39.667H16.3335V35.0003ZM25.6668 25.667H30.3335V30.3337H25.6668V25.667ZM25.6668 35.0003H30.3335V39.667H25.6668V35.0003ZM35.0002 25.667H39.6668V30.3337H35.0002V25.667ZM35.0002 35.0003H39.6668V39.667H35.0002V35.0003Z"
                      fill="#696CFF"
                    />
                    <path
                      d="M11.6667 51.3337H44.3333C46.907 51.3337 49 49.2407 49 46.667V14.0003C49 11.4267 46.907 9.33366 44.3333 9.33366H39.6667V4.66699H35V9.33366H21V4.66699H16.3333V9.33366H11.6667C9.093 9.33366 7 11.4267 7 14.0003V46.667C7 49.2407 9.093 51.3337 11.6667 51.3337ZM44.3333 18.667L44.3357 46.667H11.6667V18.667H44.3333Z"
                      fill="#696CFF"
                    />
                  </svg>
                </div>
                <h4>Date Joined</h4>
                <p>{{ user.dateJoined.split("T")[0] }}</p>
              </div>
            </div>
            <div class="hr"></div>

            <div class="card">
              <h4><span>Admin's</span> brands</h4>
              <div class="modal-brands-container">
                <div v-for="index in 10">
                  <div class="icon-sm-container">
                    <img
                      src="@/assets/images/apes.png"
                      alt=""
                      v-if="index % 2 === 0"
                    />
                    <img src="@/assets/images/dice-logo.png" alt="" v-else />
                  </div>
                  <p class="brand-name">brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="edit-modal" v-if="user && modalType === 'edit'">
          <div class="modal-banner">
            <h1>Edit User</h1>
          </div>
          <div class="form-container">
            <form @submit.prevent="onUpdateUser(user, email)">
              <input
                type="text"
                placeholder="Username"
                v-model="selectedUser"
              />
              <input
                type="text"
                placeholder="Email address"
                v-model="selectedEmail"
                required
              />
              <div class="listButtons">
                <button type="button" class="cancel" @click="closeModal()">
                  Cancel
                </button>
                <button type="submit" class="button">Save</button>
              </div>
            </form>
          </div>
        </div>

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
            You are about to delete the user: <span>{{ user.userName }}</span
            >.
          </p>
          <div class="listButtons">
            <button class="button cancel" @click="closeModal">Cancel</button>
            <button class="button" @click="deleteUser(user.id)">
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
          :class="{ active: tab === 'user' }"
          @click="switchTab('user')"
        >
          Users
        </div>
        <div
          class="tab"
          :class="{ active: tab === 'delete' }"
          @click="switchTab('delete')"
        >
          Delete Users
        </div>
      </div>
      <div v-if="tab === 'user'">
        <div class="users-list-card">
          <div v-for="(u, index) in users" :key="index">
            <div v-if="!u?.deleted" class="deleted">
              <div class="mobile-user-list-container" :class="{hideme: user?.id === u.id}" >
                <p class="user-name"  style="padding: 6px 24px 6px 0px;">
                  {{ u.userName }}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  @click="getUser(u.id)"
                  
                >
                  <path
                    d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z"
                    fill="#696CFF"
                  />
                </svg>
              </div>
              <div v-if="user">
                <div class="user-detail-container" v-if="user.id === u.id">
                  <div class="user-name-container" style="position: relative">
                    <div
                      class="user-avatar"
                      :style="{
                        color: u.userLogo.color,
                        background: u.userLogo.background,
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
                          :fill="u.userLogo.color"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 :style="{ color: u.userLogo.color }">
                        {{ user?.userName }}
                      </h3>
                      <p>
                        {{ user?.dateJoined.split("T")[0] }}
                      </p>
                    </div>
                    <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    @click="closeUserDetail" >
                      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#8E9BAA"/>
                    </svg>
                    </span>
                  </div>
                  <p class="email">
                    {{ user?.email }}
                  </p>
                  <div class="card">
                    <h4> <span> Admin's</span> brands</h4>
                    <div class="admins-brands-container">
                      <div v-for="index in 10">
                        <div class="admin-brand-icon-container">
                          <img
                            src="@/assets/images/apes.png"
                            alt=""
                            v-if="index % 2 === 0"
                          />
                          <img
                            src="@/assets/images/dice-logo.png"
                            alt=""
                            v-else
                          />
                        </div>
                        <p class="brand-name">brand</p>
                      </div>
                    </div>
                  </div>
                  <div class="buttons">
                    <button
                      class="button delete-btn"
                      style=""
                      @click="showModal(u, 'delete')"
                    >
                      Delete
                    </button>
                    <button
                      class="button"
                      :style="{
                        background: u.userLogo.color,
                        boxShadow: `3px 3px 6px 0 ${u.userLogo.color}40`,
                      }"
                      @click="showModal(u, 'edit')"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="button create-brand-btn"
          v-if="!isAddUser"
          @click="isAddUser = true"
        >
          + New User
        </button>
        <div class="card" v-if="isAddUser">
          <form @submit.prevent="onCreateUser">
            <input type="text" placeholder="Username" v-model="name" required />
            <input
              type="text"
              placeholder="Email address"
              v-model="email"
              required
            />
            <button type="button" class="cancel" @click="isAddUser = false">
              Cancel
            </button>
            <button type="submit" class="button">Create</button>
          </form>
        </div>
      </div>
      <div v-if="tab === 'delete'">
        <div
          class="card brand-user-card"
          v-for="(user, index) in users"
          :key="index"
        >
          <div class="user-name-container">
            <div class="user-avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path
                  d="M16 2.66699C14.6815 2.66699 13.3925 3.05799 12.2962 3.79053C11.1999 4.52307 10.3454 5.56426 9.8408 6.78244C9.33622 8.00061 9.2042 9.34105 9.46143 10.6343C9.71867 11.9275 10.3536 13.1154 11.286 14.0477C12.2183 14.9801 13.4062 15.615 14.6994 15.8722C15.9926 16.1295 17.333 15.9974 18.5512 15.4929C19.7694 14.9883 20.8106 14.1338 21.5431 13.0375C22.2757 11.9411 22.6667 10.6522 22.6667 9.33366C22.6667 7.56555 21.9643 5.86986 20.714 4.61961C19.4638 3.36937 17.7681 2.66699 16 2.66699ZM16 13.3337C15.2089 13.3337 14.4355 13.0991 13.7777 12.6595C13.1199 12.22 12.6072 11.5953 12.3045 10.8644C12.0017 10.1335 11.9225 9.32922 12.0769 8.5533C12.2312 7.77737 12.6122 7.06464 13.1716 6.50523C13.731 5.94582 14.4437 5.56486 15.2196 5.41052C15.9956 5.25618 16.7998 5.33539 17.5307 5.63814C18.2616 5.94089 18.8864 6.45358 19.3259 7.11138C19.7654 7.76917 20 8.54253 20 9.33366C20 10.3945 19.5786 11.4119 18.8284 12.1621C18.0783 12.9122 17.0609 13.3337 16 13.3337ZM28 28.0003V26.667C28 24.1916 27.0167 21.8177 25.2663 20.0673C23.516 18.317 21.142 17.3337 18.6667 17.3337H13.3333C10.858 17.3337 8.48401 18.317 6.73367 20.0673C4.98333 21.8177 4 24.1916 4 26.667V28.0003H6.66667V26.667C6.66667 24.8989 7.36905 23.2032 8.61929 21.9529C9.86953 20.7027 11.5652 20.0003 13.3333 20.0003H18.6667C20.4348 20.0003 22.1305 20.7027 23.3807 21.9529C24.631 23.2032 25.3333 24.8989 25.3333 26.667V28.0003H28Z"
                  fill="#697A8D"
                />
              </svg>
            </div>
            <div>
              <h3>
                {{ user.userName }}
              </h3>
              <p>{{ user.dateJoined.split("T")[0] }}</p>
            </div>
          </div>
          <p class="email">
            {{ user.email }}
          </p>
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

const users = ref([]);
const user = ref(null);
const modalType = ref(null);
const name = ref("");
const email = ref("");
const showDelateTable = ref(false);
const showAddUserForm = ref(false);
const isModalVisible = ref(false);
const editId = ref("");
const tab = ref("user");
const isAddUser = ref(false);
const selectedColor = ref(null);

const selectedUser = ref("");
const selectedEmail = ref("");

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

const showModal = (data, type) => {
  isModalVisible.value = true;
  modalType.value = type;
  user.value = data;
  email.value = data.email;
  if (type === "view") {
    getUser(user.value.id);
  }
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  getUsers();
});

const getUsers = async () => {
  const response = await api.auth.getUsers();
  users.value = response.data.users;
  setLogo(users.value);
};

const getUser = async (id) => {
  const response = await api.auth.getUser(id);
  user.value = response.data.user;
  name.value = user.value.userName;
  email.value = user.value.email;
};

const onCreateUser = () => {
  if (name.value && email.value) {
    createUser(name.value, email.value);
  }
  name.value = "";
  email.value = "";
  showAddUserForm.value = false;
};

const createUser = async (name, email) => {
  const response = await api.auth.createUser(name, email);
  if (response.status == 200) {
    getUsers();
  }
  isAddUser.value = false;
};

const onUpdateUser = (id) => {
  if (id) {
    updateUser({
      id,
      name: selectedUser.value,
      email: selectedEmail.value,
    });
    selectedUser.value = "";
    selectedUser.value = "";
    editId.value = "";
  }
};

const updateUser = async ({ id, name, email }) => {
  const response = await api.auth.updateUser({ id, name, email });
  closeModal();
  if (response.status == 200) {
    getUsers();
  }
  getUser(id);
  closeModal();
};

const deleteUser = async (id) => {
  const response = await api.auth.deleteUser(id);
  if (response.status === 200) {
    getUsers();
  }
  closeModal();
};

const editIt = (u) => {
  editId.value = u.id;
  selectedEmail.value = u.email;
  selectedUser.value = u.userName;
};

const switchTab = (type) => {
  tab.value = type;
};

const closeUserDetail = () => {
  user.value = null;
};
const setLogo = (usersList) => {
  usersList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.userLogo = selectedColor.value;
  });
};
</script>
