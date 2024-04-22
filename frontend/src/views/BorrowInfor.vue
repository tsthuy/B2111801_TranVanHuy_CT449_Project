<template>
  <div>
    <div class="container p-2">
      <h2 class="text-2xl font-semibold mb-4 text-center">
        Nhập Thông Tin Phiếu Mượn
      </h2>
      <div class="bg-white p-4 shadow-2 border-2 border-indigo-600 rounded">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="mb-4">
            <label
              for="maPhieuMuon"
              class="block text-sm font-medium text-gray-700"
              >Mã Phiếu Mượn</label
            >
            <input
              v-model="borrowInfo.maPhieuMuon"
              type="text"
              id="maPhieuMuon"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              readonly
            />
          </div>
          <div class="mb-4">
            <label for="maSach" class="block text-sm font-medium text-gray-700"
              >Mã Sách</label
            >
            <input
              v-model="borrowInfo.maSach"
              type="text"
              id="maSach"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="ngayMuon"
              class="block text-sm font-medium text-gray-700"
              >Ngày Mượn (YYYY-MM-DD)</label
            >
            <input
              v-model="borrowInfo.ngayMuon"
              type="text"
              id="ngayMuon"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="hanTra" class="block text-sm font-medium text-gray-700"
              >Hạn Trả (YYYY-MM-DD)</label
            >
            <input
              v-model="borrowInfo.hanTra"
              type="text"
              id="hanTra"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="maDocGia"
              class="block text-sm font-medium text-gray-700"
              >Mã Độc Giả</label
            >
            <input
              v-model="borrowInfo.maDocGia"
              type="text"
              id="maDocGia"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="maBanSao"
              class="block text-sm font-medium text-gray-700"
              >Mã Bản Sao</label
            >
            <input
              v-model="borrowInfo.maBanSao"
              type="text"
              id="maBanSao"
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
</template>

<script>
export default {
  data() {
    return {
      borrowInfo: {
        maPhieuMuon: "",
        maSach: "",
        ngayMuon: "",
        hanTra: "",
        maDocGia: "",
        maBanSao: "",
      },
    };
  },
  mounted() {
    // Gọi hàm generateMaPhieuMuon khi trang được tải
    this.generateMaPhieuMuon();
  },
  methods: {
    submitForm() {
      // Gửi yêu cầu tạo phiếu mượn
      // Đối với mục đích minh họa, chúng ta sẽ không gửi yêu cầu thực sự ở đây
      // Thay vào đó, chỉ hiển thị thông báo giả định
      alert("Tạo phiếu mượn thành công!");
    },
    generateMaPhieuMuon() {
      // Thực hiện các bước tạo mã phiếu mượn tại đây
      // Ví dụ: kết hợp ngày tháng và một số ngẫu nhiên
      this.borrowInfo.maPhieuMuon =
        "MPM" + this.getCurrentDate() + Math.floor(100 + Math.random() * 900);
    },
    getCurrentDate() {
      const date = new Date();
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      // Đảm bảo rằng tháng và ngày có độ dài là 2 ký tự
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      return year + "-" + month + "-" + day;
    },
  },
};
</script>

<style scoped>
/* Đặt style CSS tại đây */
</style>
