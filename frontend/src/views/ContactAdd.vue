<!-- ContactAdd.vue -->

<template>
  <div class="page">
    <h4>Thêm Mới Liên hệ</h4>
    <!-- Add your form or content for creating a new contact -->
    <ContactForm @submit:contact="createContact" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactAddForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data);
        this.message = "Liên hệ mới được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
