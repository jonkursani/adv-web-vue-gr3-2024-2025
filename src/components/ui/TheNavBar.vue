<script setup>
import {useAuthStore} from "@/stores/authStore.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const onLogout = () => {
  authStore.logOut();
  router.push({name: 'login'});
}
</script>

<template>
  <header class="mb-3">
    <nav class="navbar navbar-expand navbar-light navbar-top">
      <div class="container-fluid">
        <a class="burger-btn d-block" style="cursor: pointer">
          <i class="bi bi-justify fs-3"></i>
        </a>

        <!--        {{ authStore.loggedInUser }}-->

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="dropdown ms-auto">
            <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="user-menu d-flex">
                <div class="user-name text-end me-3">
                  <h6 class="mb-0 text-gray-600">{{ authStore.loggedInUser?.sub }}</h6>
                  <p class="mb-0 text-sm text-gray-600">Administrator</p>
                </div>
                <div class="user-img d-flex align-items-center">
                  <div class="avatar avatar-md">
                    <img src="@/assets/images/faces/1.jpg" alt="Profile img"/>
                  </div>
                </div>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style="min-width: 11rem">
              <li>
                <h6 class="dropdown-header">Hello, {{ authStore.loggedInUser?.sub }}!</h6>
              </li>
              <li>
                <a class="dropdown-item" href="#"><i class="icon-mid bi bi-person me-2"></i> My Profile</a>
              </li>
              <li>
                <a class="dropdown-item" href="#"><i class="icon-mid bi bi-gear me-2"></i> Settings</a>
              </li>
              <li>
                <a class="dropdown-item" href="#"><i class="icon-mid bi bi-wallet me-2"></i> Wallet</a>
              </li>
              <li>
                <hr class="dropdown-divider"/>
              </li>
              <li>
                <button class="dropdown-item" @click="onLogout">
                  <i class="icon-mid bi bi-box-arrow-left me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
