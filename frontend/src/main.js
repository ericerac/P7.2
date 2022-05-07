import { createApp } from "vue";

import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-regular-svg-icons";

//library.add(fas);
//Vue.component('font-awesome-icon', FontAwesomeIcon)
import App from "./App.vue";


createApp(App).use(router).use(store).component('fa', FontAwesomeIcon).mount("#app");
