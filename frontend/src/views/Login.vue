<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 uppercase">
        Login to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="loginUser">
          <div>
            <label for="msnv" class="block text-sm font-medium text-gray-700">
              AdminCode
            </label>
            <div class="mt-1">
              <input
                v-model="msnv"
                type="msnv"
                id="msnv"
                autocomplete="msnv"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 relative">
              <input
                v-model="password"
                type="password"
                id="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <router-link
                to="/forgot-password"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </router-link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          <div class="flex w-full">
            <h4>Not have any account?</h4>
            <router-link to="/signup" class="text-blue-600 pl-2"
              >Sign Up</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../server";
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      msnv: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(`${server}/admin/login-admin`, {
          msnv: this.msnv,
          password: this.password,
        });
        if (response.data && response.data.success) {
          console.log("Login successful");
          VueCookies.set("loggedIn", true);
          alert("Login successful");
          this.$router.push("/");
        } else {
          console.log("Login failed");
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    },
  },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
