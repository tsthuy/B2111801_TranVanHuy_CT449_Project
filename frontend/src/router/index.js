import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Borrow from "@/views/Borrow.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    props: true,
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/borrow",
    name: "borrow",
    component: () => import("@/views/Borrow.vue"),
  },
  {
    path: "/borrow_infor",
    name: "borrow_infor",
    component: () => import("@/views/BorrowInfor.vue"),
  },
  {
    path: "/reader",
    name: "reader",
    component: () => import("@/views/Reader.vue"),
  },
  {
    path: "/book",
    name: "book",
    component: () => import("@/views/Book.vue"),
  },
  {
    path: "/book_copy",
    name: "book_copy",
    component: () => import("@/views/BookCopy.vue"),
  },
  {
    path: "/return",
    name: "return",
    component: () => import("@/views/Return.vue"),
  },
  {
    path: "/history",
    name: "history",
    component: () => import("@/views/History.vue"),
  },
  {
    path: "/reader_card",
    name: "reader_card",
    component: () => import("@/views/ReaderCard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
