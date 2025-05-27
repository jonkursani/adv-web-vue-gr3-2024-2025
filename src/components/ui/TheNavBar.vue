<script setup>
import {useAuthStore} from "@/stores/authStore.js";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const authStore = useAuthStore();
const router = useRouter();

const onLogout = () => {
  authStore.logOut();
  router.push({name: 'login'});
}

const locales = {
  sq: 'sq',
  en: 'en'
}
const i18n = useI18n()
const locale = ref(i18n.locale.value)
const localeOptions = ref(Object.values(locales)) // ['sq', 'en']
const changeLocale = (newLocale) => {
  locale.value = newLocale;
  i18n.locale.value = newLocale;
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
          <ul class="navbar-nav ms-auto mb-lg-0 me-3">
            <li class="nav-item dropdown me-1">
              <a class="nav-link active dropdown-toggle text-gray-600" href="#" data-bs-toggle="dropdown"
                 aria-expanded="false">
                <i class="bi bi-globe bi-sub fs-4"></i> <strong>{{ locale.toUpperCase() }}</strong>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li>
                  <!-- ne template mundeni me ju referu $t me $t('') -->
                  <h6 class="dropdown-header">{{ $t('common.select_language') }}</h6>
                </li>
                <li v-for="loc in localeOptions" :key="loc">
                  <a class="dropdown-item" @click="changeLocale(loc)">{{ loc.toUpperCase() }}</a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="dropdown">
            <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="user-menu d-flex">
                <div class="user-name text-end me-3">
                  <h6 class="mb-0 text-gray-600">{{ authStore.loggedInUser?.sub }}</h6>
                  <p class="mb-0 text-sm text-gray-600">{{ authStore.loggedInUser?.role }}</p>
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
                <h6 class="dropdown-header">Hello, {{ authStore.loggedInUser?.name }}!</h6>
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
