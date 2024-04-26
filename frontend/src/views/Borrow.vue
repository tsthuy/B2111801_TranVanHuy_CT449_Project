<template>
  <div>
    <div style="padding: 10px" class="container mx-auto py-8">
      <h2 class="text-2xl font-semibold mb-4 text-center uppercase">
        Mượn Sách
      </h2>
      <div class="bg-white p-4 shadow rounded">
        <form @submit.prevent="submitForm">
          <div>
            <div
              class="bg-white p-2 shadow-inner rounded border-2 border-indigo-600 flex justify-start"
            >
              <div>
                <h2 class="text-2xl font-semibold mb-4 text-center uppercase">
                  Thông tin sách
                </h2>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Tên Sách:</b>
                  <b class="inline-block w-32 text-blue-500 uppercase">{{
                    bookInfo.bookName
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Mã Sách:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.bookCode
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Tác giả:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.writer
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Nhà xuất bản:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.NXBCode
                  }}</b>
                </p>
                <!-- Thêm các trường dữ liệu mới từ mô hình sách -->
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Giá:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.price
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Số lượng:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.numberBook
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Năm xuất bản:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.yearPB
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Loại sách:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    bookInfo.type
                  }}</b>
                </p>
                <h2 class="text-2xl font-semibold mb-4 text-center uppercase">
                  Thông tin độc giả
                </h2>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Mã Độc Giả:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    borrower.readerCode
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Họ & Tên:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    borrower.fullName
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Giới Tính:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    borrower.gender
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">SĐT:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    borrower.phone
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Địa Chỉ:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    borrower.address
                  }}</b>
                </p>
                <p class="text-gray-600 mb-4">
                  <b class="inline-block w-32">Ngày Sinh:</b>
                  <b class="inline-block text-blue-500 uppercase">{{
                    borrower.birthday
                  }}</b>
                </p>
              </div>
              <div class="flex-1">
                <div class="container p-2">
                  <h2 class="text-2xl font-semibold mb-4 text-center uppercase">
                    Nhập Thông Tin Phiếu Mượn
                  </h2>
                  <div
                    class="bg-white p-4 shadow-2 border-2 border-indigo-600 rounded"
                  >
                    <form
                      @submit.prevent="saveBorrowInfo"
                      enctype="multipart/form-data"
                    >
                      <div class="mb-4">
                        <label
                          for="borrowCode"
                          class="block text-sm font-medium text-gray-700"
                          >Mã Phiếu Mượn</label
                        >
                        <input
                          v-model="borrow.borrowCode"
                          type="text"
                          id="borrowCode"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          for="bookCode"
                          class="block text-sm font-medium text-gray-700"
                          >Mã Sách</label
                        >
                        <input
                          v-model="bookInfo.bookCode"
                          disabled
                          type="text"
                          id="bookCode"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          for="readerCode"
                          class="block text-sm font-medium text-gray-700"
                          >Mã Độc Giả</label
                        >
                        <input
                          disabled
                          v-model="borrower.readerCode"
                          type="text"
                          id="readerCode"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          for="borrowDate"
                          class="block text-sm font-medium text-gray-700"
                          >Ngày Mượn
                        </label>
                        <input
                          v-model="borrow.borrowDate"
                          type="date"
                          id="borrowDate"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          for="deadlineDate"
                          class="block text-sm font-medium text-gray-700"
                          >Hạn Trả
                        </label>
                        <input
                          v-model="borrow.deadlineDate"
                          type="date"
                          id="deadlineDate"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="mb-4">
                        <label
                          for="returnDate"
                          class="block text-sm font-medium text-gray-700"
                          >Số lượng
                        </label>
                        <input
                          v-model="borrow.num"
                          type="number"
                          :max="bookInfo.numberBook"
                          min="1"
                          id="num"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          for="returnDate"
                          class="block text-sm font-medium text-gray-700"
                          >Tạm Tính
                        </label>
                        <input
                          v-model="borrow.totalPrice"
                          type="number"
                          id="totalPrice"
                          class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto block"
                      >
                        Lưu Phiếu Mượn
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2 mt-4">
              Thông tin người mượn
            </h3>
            <div class="flex flex-wrap mb-3">
              <div class="w-full md:w-1/2">
                <form @submit.prevent="searchReaders" class="flex">
                  <input
                    v-model="keyword"
                    class="form-input mr-2 border"
                    type="search"
                    placeholder="Tìm kiếm Độc Giả"
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
            </div>
            <table
              v-if="results.length > 0"
              class="min-w-full divide-y divide-black-700 border border-black table-auto"
            >
              <thead class="bg-green-500">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
                  >
                    Mã Độc Giả
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
                  >
                    Tên Độc Giả
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
                  >
                    Địa Chỉ
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border"
                  >
                    Chọn
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="row in results" :key="row.readerCode">
                  <td class="px-6 py-4 whitespace-nowrap border">
                    {{ row.readerCode }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border">
                    {{ row.fullName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border">
                    {{ row.address }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap border">
                    <button
                      @click="
                        fillForm(
                          row.readerCode,
                          row.fullName,
                          row.birthday,
                          row.gender,
                          row.address,
                          row.phone
                        )
                      "
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Chọn
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-else>No results found</div>
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
      keyword: "",
      results: [],
      readers: [],
      bookInfo: {
        bookCode: "",
        bookName: "",
        writer: "",
        NXBCode: "",
        price: "",
        numberBook: "",
        yearPB: "",
        type: "",
      },
      borrower: {
        readerCode: "",
        fullName: "",
        birthday: "",
        gender: "",
        address: "",
        phone: "",
      },
      borrow: {
        borrowCode: "",
        num: "1",
        borrowDate: "",
        deadlineDate: "",
        totalPrice: "",
      },
    };
  },
  computed: {
    totalPrice() {
      // Chuyển đổi bookInfo.price và borrow.num thành số để tính toán
      const price = parseFloat(this.bookInfo.price);
      const num = parseInt(this.borrow.num);

      // Kiểm tra nếu price hoặc num không hợp lệ thì trả về 0
      if (isNaN(price) || isNaN(num) || price <= 0 || num <= 0) {
        return 0;
      }

      // Tính toán tổng giá trị
      return price * num;
    },

    loginText() {
      return this.loggedIn ? "Log out" : "Đăng Nhập";
    },
    loginLink() {
      return this.loggedIn ? "Logout.php" : "login.php";
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  watch: {
    // Theo dõi sự thay đổi trong bookInfo.price và borrow.num
    "bookInfo.price": function (newValue, oldValue) {
      this.updateTotalPrice();
    },
    "borrow.num": function (newValue, oldValue) {
      this.updateTotalPrice();
    },
  },
  methods: {
    fillForm(readerCode, fullName, birthday, gender, address, phone) {
      this.borrower = {
        readerCode,
        fullName,
        birthday,
        gender,
        address,
        phone,
      };
    },
    updateTotalPrice() {
      this.borrow.totalPrice = this.totalPrice;
    },

    async getReaders() {
      try {
        const response = await axios.get(`${server}/reader/get-readers`);
        this.readers = response.data.readers;
      } catch (error) {
        console.error("Error fetching readers:", error);
      }
    },
    searchReaders() {
      try {
        if (!this.keyword.trim()) {
          this.getReaders();
          console.log(this.keyword);
        } else {
          // Nếu có keyword, lọc độc giả theo keyword
          console.log(this.readers);
          const filteredReaders = this.readers.filter((reader) =>
            reader.readerCode.toLowerCase().includes(this.keyword.toLowerCase())
          );
          this.results = filteredReaders;
          console.log(this.results);
        }
      } catch (error) {
        console.error("Error searching readers:", error);
      }
    },
    saveBorrowInfo() {
      axios
        .post(`${server}/borrow/create-borrow`, {
          borrowCode: this.borrow.borrowCode,
          readerCode: this.borrower.readerCode,
          bookCode: this.bookInfo.bookCode,
          borrowDate: this.borrow.borrowDate,
          deadlineDate: this.borrow.deadlineDate,
          returnDate: this.borrow.returnDate,
          totalPrice: this.borrow.totalPrice,
          num: this.borrow.num,
        })
        .then((response) => {
          this.$router.push("/history");
          this.resetForm();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    resetForm() {
      // Reset các trường dữ liệu trong form
      this.borrow.borrowCode = "";
      this.borrow.borrowDate = "";
      this.borrow.deadlineDate = "";
      this.borrow.returnDate = "";
      this.borrow.num = "1"; // Nếu muốn đặt lại số lượng mặc định
      this.borrow.totalPrice = ""; // Đặt lại tổng giá trị
    },
  },

  async created() {
    // Trích xuất mã sách từ query string trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookCode = urlParams.get("bookCode");

    // Nếu không có mã sách trong query string, không làm gì cả
    if (!bookCode) {
      alert("No book code provided in the URL");
      return;
    }

    try {
      const response = await axios.get(
        `${server}/book/get-book?bookCode=${bookCode}`
      );
      const bookData = response.data.book;

      // Gán thông tin của cuốn sách vào data để hiển thị trong form
      this.bookInfo = {
        bookCode: bookData.bookCode,
        bookName: bookData.bookName,
        price: bookData.price,
        numberBook: bookData.numberBook,
        yearPB: bookData.yearPB,
        NXBCode: bookData.NXBCode,
        writer: bookData.writer,
        type: bookData.type,
      };
    } catch (error) {
      console.error("Error loading book data:", error);
    }
  },
  mounted() {
    this.getReaders();
  },
};
</script>

<style scoped>
/* Đặt style CSS tại đây */
</style>
