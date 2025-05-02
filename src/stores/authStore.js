import {defineStore} from "pinia";
import {computed, ref} from "vue";
import client from "@/helpers/client.js";
import {jwtDecode} from "jwt-decode";

export const useAuthStore =
    defineStore('auth', () => {
        const token = ref(localStorage.getItem('token') || null);

        const logIn = async (user) => {
            const response = await client.post('auth/login', user);

            if (response.data) {
                token.value = response.data.token;
                localStorage.setItem('token', token.value)
            }
        }

        const logOut = () => {
            token.value = null;
            localStorage.removeItem('token');
        }

        const isLoggedIn = computed(() => {
            // return token.value !== null;
            return !!token.value; // ! converts to boolean
        })

        const loggedInUser = computed(() => {
            return token.value ? jwtDecode(token.value) : null;
        })

        return {
            logIn,
            logOut,
            isLoggedIn,
            loggedInUser
        }
    })
