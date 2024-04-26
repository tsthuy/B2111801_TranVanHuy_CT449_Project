<template>
  <div class="min-h-screen bg-gray-100 mt-2">
    <a
      href="reader"
      class="text-white mt-8 pb-1 px-3 rounded hover:text-blue-600 text-4xl bg-blue-500"
      >&larr;</a
    >

    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-semibold text-center mb-8">Edit Reader</h1>

      <p
        v-if="updateReaderResult"
        class="text-green-500 font-bold text-center mb-4"
      >
        {{ updateReaderResult }}
      </p>

      <!-- Form chỉnh sửa thông tin độc giả -->
      <form
        @submit.prevent="updateReader"
        class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <div class="mb-4">
          <label
            for="readerCode"
            class="block text-sm font-medium text-gray-700"
            >Mã Độc Giả:</label
          >
          <input
            disabled
            v-model="reader.readerCode"
            type="text"
            id="readerCode"
            class="border p-2 font-bold cursor-not-allowed mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="fullName" class="block text-sm font-medium text-gray-700"
            >Họ và Tên:</label
          >
          <input
            v-model="reader.fullName"
            type="text"
            id="fullName"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="birthday" class="block text-sm font-medium text-gray-700"
            >Ngày Sinh:</label
          >
          <input
            v-model="reader.birthday"
            type="text"
            id="birthday"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700"
            >Giới Tính:</label
          >
          <input
            v-model="reader.gender"
            type="text"
            id="gender"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700"
            >Địa Chỉ:</label
          >
          <input
            v-model="reader.address"
            type="text"
            id="address"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >Số Điện Thoại:</label
          >
          <input
            v-model="reader.phone"
            type="text"
            id="phone"
            class="mt-1 border p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../server";

export default {
  data() {
    return {
      reader: {
        readerCode: "",
        fullName: "",
        birthday: "",
        gender: "",
        address: "",
        phone: "",
      },
      updateReaderResult: "",
    };
  },
  async created() {
    // Trích xuất mã độc giả từ query string trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const readerCode = urlParams.get("readerCode");

    // Nếu không có mã độc giả trong query string, không làm gì cả
    if (!readerCode) {
      alert("No reader code provided in the URL");
      return;
    }

    try {
      const response = await axios.get(
        `${server}/reader/get-reader?readerCode=${readerCode}`
      );
      const readerData = response.data.reader;

      // Gán thông tin của độc giả vào data để hiển thị trong form
      this.reader = {
        readerCode: readerData.readerCode,
        fullName: readerData.fullName,
        birthday: readerData.birthday,
        gender: readerData.gender,
        address: readerData.address,
        phone: readerData.phone,
      };
    } catch (error) {
      console.error("Error loading reader data:", error);
    }
  },
  methods: {
    async updateReader() {
      try {
        const response = await axios.put(
          `${server}/reader/update-reader/${this.reader.readerCode}`,
          this.reader
        );
        if (response.data && response.data.success) {
          this.updateReaderResult = "Reader updated successfully!";
          // Redirect to the reader management page after successful update
          this.$router.push("/reader");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS styles */
</style>
