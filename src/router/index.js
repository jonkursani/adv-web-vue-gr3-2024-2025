import AboutView from "@/views/AboutView.vue";
import HowToView from "@/views/HowToView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import UserView from "@/views/UserView.vue";
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
  {
    path: "/user/:id",
    name: "user",
    component: UserView,
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

// navigation guard
router.beforeEach((to, from, next) => {
  console.log(`Navigating to ${to.fullPath} from ${from.fullPath}`);

  // nese ki ndonje validim perpara se te kalosh te routa tjeter
  // next() vetem te ridirekton te routa tjeter
  next();
});

export default router;
