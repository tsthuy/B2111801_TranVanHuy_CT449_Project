<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-center mb-4 uppercase font-bold">
      Danh sách độc giả (Tổng số lượng độc giả: {{ totalReaders }})
    </h1>

    <div class="flex flex-wrap mb-3">
      <div class="w-full md:w-1/2">
        <form @submit.prevent="searchReaders" class="flex">
          <input
            v-model="keyword"
            class="form-input mr-2 border"
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
      <div class="w-full md:w-1/4">
        <select
          v-model="sortBy"
          @change="sortReader"
          class="form-select border p-1"
        >
          <option value="fullName">Sắp xếp theo Tên</option>
          <option value="address">Sắp xếp theo Địa chỉ</option>
          <option value="readerCode">Sắp xếp theo Mã độc giả</option>
        </select>
      </div>
      <div class="w-full md:w-1/4">
        <button
          @click="showAddForm"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Thêm độc giả
        </button>
      </div>
    </div>

    <div class="mt-4" v-show="showForm">
      <form @submit.prevent="addReader" class="mb-4">
        <div class="mb-4">
          <label
            for="readerCode"
            class="block text-sm font-medium text-gray-700"
            >Mã độc giả:</label
          >
          <input
            v-model="newReader.readerCode"
            type="text"
            id="readerCode"
            class="form-input mt-1 border p-2 w-2/4"
            required
          />
        </div>
        <div class="mb-4">
          <label for="fullName" class="block text-sm font-medium text-gray-700"
            >Tên độc giả:</label
          >
          <input
            v-model="newReader.fullName"
            type="text"
            id="fullName"
            class="form-input mt-1 border p-2 w-2/4"
            required
          />
        </div>
        <div class="mb-4">
          <label for="birthday" class="block text-sm font-medium text-gray-700"
            >Ngày sinh:</label
          >
          <input
            v-model="newReader.birthday"
            type="date"
            id="birthday"
            class="form-input mt-1 border p-2 w-2/4"
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700"
            >Giới tính:</label
          >
          <input
            v-model="newReader.gender"
            type="text"
            id="gender"
            class="form-input mt-1 border p-2 w-2/4"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700"
            >Địa chỉ:</label
          >
          <input
            v-model="newReader.address"
            type="text"
            id="address"
            class="form-input mt-1 border p-2 w-2/4"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >Số điện thoại:</label
          >
          <input
            v-model="newReader.phone"
            type="text"
            id="phone"
            class="form-input mt-1 border p-2 w-2/4"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Thêm độc giả
        </button>
      </form>
    </div>

    <div class="table-responsive mt-4">
      <table class="table-auto w-full">
        <thead class="bg-green-500">
          <tr>
            <th class="px-4 py-2 border">Mã độc giả</th>
            <th class="px-4 py-2 border">Tên độc giả</th>
            <th class="px-4 py-2 border">Ngày sinh</th>
            <th class="px-4 py-2 border">Giới tính</th>
            <th class="px-4 py-2 border">Địa chỉ</th>
            <th class="px-4 py-2 border">Số điện thoại</th>
            <th class="px-4 py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="reader in readers" :key="reader.readerCode">
            <td class="border px-4 py-2 text-center">
              {{ reader.readerCode }}
            </td>
            <td class="border px-4 py-2 text-center">{{ reader.fullName }}</td>
            <td class="border px-4 py-2 text-center">{{ reader.birthday }}</td>
            <td class="border px-4 py-2 text-center">{{ reader.gender }}</td>
            <td class="border px-4 py-2 text-center">{{ reader.address }}</td>
            <td class="border px-4 py-2 text-center">{{ reader.phone }}</td>
            <td class="border px-4 py-2 text-center">
              <a
                :href="'edit-reader?readerCode=' + reader.readerCode"
                class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-2 rounded-lg mr-2"
              >
                Sửa
              </a>
              <button
                @click="deleteReader(reader.readerCode)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-lg"
              >
                Xoá
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { server } from "../../server";
import axios from "axios";
// Import các thư viện hoặc tùy chỉnh dữ liệu nếu cần
export default {
  data() {
    return {
      sortBy: "fullName",
      totalReaders: "",
      keyword: "",
      readers: [],
      showForm: false,
      newReader: {
        readerCode: "",
        fullName: "",
        birthday: "",
        gender: "",
        address: "",
        phone: "",
      },
    };
  },
  mounted() {
    this.getReaders();
  },
  methods: {
    async searchReaders() {
      try {
        if (!this.keyword.trim()) {
          await this.getReaders();
        } else {
          const filteredReaders = this.readers.filter((reader) =>
            reader.fullName.toLowerCase().includes(this.keyword.toLowerCase())
          );
          this.readers = filteredReaders;
        }
      } catch (error) {
        console.error("Error searching readers:", error);
      }
    },
    async sortReader() {
      try {
        const response = await axios.get(
          `${server}/reader/sort-readers?sortBy=${this.sortBy}`
        );
        this.readers = response.data.readers;
      } catch (error) {
        console.error("Error sorting readers:", error);
      }
    },
    showAddForm() {
      this.showForm = !this.showForm;
    },
    async addReader() {
      try {
        const response = await axios.post(
          `${server}/reader/create-reader`,
          this.newReader
        );
        if (response.data.success) {
          alert("Added reader!");
          this.newReader = {
            readerCode: "",
            fullName: "",
            birthday: "",
            gender: "",
            address: "",
            phone: "",
          };
          // Refresh reader list
          this.getReaders();
        }
      } catch (error) {
        console.error("Error adding reader:", error);
      }
    },

    async deleteReader(id) {
      try {
        const readerCode = id;
        const response = await axios.delete(
          `${server}/reader/delete-reader/${readerCode}`
        );
        if (response.data.success) {
          alert("Reader deleted successfully");
          this.getReaders();
        }
      } catch (error) {
        console.error("Error deleting reader:", error);
      }
    },
    async getReaders() {
      try {
        const response = await axios.get(`${server}/reader/get-readers`);
        this.readers = response.data.readers;
        this.totalReaders = response.data.totalReaders;
      } catch (error) {
        console.error("Error fetching readers:", error);
      }
    },
  },
};
</script>

<style>
/* Các kiểu tùy chỉnh của bạn */
</style>
