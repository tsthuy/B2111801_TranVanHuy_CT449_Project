import { createWebHistory, createRouter } from "vue-router";
import contactBook from "@/views/ContactBook.vue";

const routes = [
  {
    path: "/",
    name: "contactBook",
    component: contactBook,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
