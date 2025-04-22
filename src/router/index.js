import AboutView from "@/views/AboutView.vue";
import HowToView from "@/views/HowToView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HowToView,
  },
  {
    path: "/how-to",
    redirect: "/",
  },
  {
    path: "/about-us",
    name: "about",
    component: AboutView,
  },
  // catch-all route
  {
    path: "/:notFound(.*)",
    component: NotFoundView,
    // redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
