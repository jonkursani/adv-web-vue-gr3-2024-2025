import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import ChildComp from "@/components/ChildComp.vue";

createApp(App)
  // importi global i komponentit ChildComp
  // emri ne html eshte parametri i pare, parametri i dyte eshte komponenti
  // .component("ChildComp", ChildComp)
  .mount("#app");
