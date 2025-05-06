<script setup>
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/authStore.js";
import {useAppToast} from "@/composables/useAppToast.js";
import AppButton from "@/components/ui/AppButton.vue";

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isLoading = ref(false);

const user = reactive({
  email: '',
  password: ''
})


const toast = useAppToast()
// const {showSuccess, showError} = useAppToast()

const handleSubmit = async () => {
  if (!user.email || !user.password) {
    // alert('Please fill in all fields');
    toast.showWarning('Please fill in all fields')
    return;
  }

  try {
    isLoading.value = true;
    await authStore.logIn(user);
    const redirect = `${route.query.redirect || '/'}`
    await router.push(redirect)
  } catch (e) {
    // console.log(e)
    // alert(e.response.data?.message || 'An error occurred')
    // error i axios
    // toast.showError(e.response?.data?.message || 'An error occurred')
    throw e;
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-lg-5 col-12">
        <div id="auth-left">
          <div class="auth-logo">
            <!--            <a href="index.html"><img src="assets/images/logo/logo.svg" alt="Logo"></a>-->
          </div>
          <h1 class="auth-title">Log in.</h1>
          <p class="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>

          <form @submit.prevent="handleSubmit">
            <div class="form-group position-relative has-icon-left mb-4">
              <input type="text" class="form-control form-control-xl" placeholder="Email" v-model.trim="user.email">
              <div class="form-control-icon">
                <i class="bi bi-person"></i>
              </div>
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input type="password" class="form-control form-control-xl" placeholder="Password"
                     v-model.trim="user.password">
              <div class="form-control-icon">
                <i class="bi bi-shield-lock"></i>
              </div>
            </div>

            <!--  class bohet bind ne attributin attrs -->
            <app-button :is-loading="isLoading" class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
              Log in
            </app-button>
          </form>
          <div class="text-center mt-5 text-lg fs-4">
            <p class="text-gray-600">Don't have an account? <a href="auth-register.html" class="font-bold">Sign
              up</a>.</p>
            <p><a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #fff
}

#auth {
  height: 100vh;
  overflow-x: hidden
}

#auth #auth-right {
  background: url(../../assets/images/bg/4853433.png), linear-gradient(90deg, #2d499d, #3f5491);
  height: 100%
}

#auth #auth-left {
  padding: 5rem 8rem
}

#auth #auth-left .auth-title {
  font-size: 4rem;
  margin-bottom: 1rem
}

#auth #auth-left .auth-subtitle {
  color: #a8aebb;
  font-size: 1.7rem;
  line-height: 2.5rem
}

#auth #auth-left .auth-logo {
  margin-bottom: 7rem
}

#auth #auth-left .auth-logo img {
  height: 2rem
}

@media screen and (max-width: 767px) {
  #auth #auth-left {
    padding: 5rem
  }
}

@media screen and (max-width: 576px) {
  #auth #auth-left {
    padding: 5rem 3rem
  }
}
</style>