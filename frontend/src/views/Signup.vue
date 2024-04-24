<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register as a new user
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="registerUser">
          <div>
            <label for="msnv" class="block text-sm font-medium text-gray-700">
              Admin Code
            </label>
            <div class="mt-1">
              <input
                v-model="msnv"
                type="text"
                autocomplete="msnv"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                v-model="name"
                type="text"
                autocomplete="name"
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
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="position"
              class="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <div class="mt-1">
              <input
                v-model="position"
                type="text"
                autocomplete="position"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div class="mt-1">
              <input
                v-model="address"
                type="text"
                autocomplete="address"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div class="mt-1">
              <input
                v-model="phone"
                type="text"
                autocomplete="phone"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
            <h4>Already have an account?</h4>
            <router-link to="/login" class="text-blue-600 pl-2"
              >Sign In</router-link
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

export default {
  data() {
    return {
      msnv: "",
      position: "",
      name: "",
      password: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(`${server}/admin/create-admin`, {
          msnv: this.msnv,
          position: this.position,
          name: this.name,
          password: this.password,
          address: this.address,
          phone: this.phone,
        });
        // Xử lý phản hồi từ máy chủ
        console.log(response.data);
        // Điều hướng đến trang sau khi đăng ký thành công
        this.$router.push("/login"); // Điều hướng đến trang đăng nhập
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error.response.data);
      }
    },
  },
};
</script>
