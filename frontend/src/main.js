import { createApp } from "vue";
import Vue from 'vue'
import App from "./App.vue";
//import component from 'src/components/font-awesome-icon'
import router from "./router";
import store from "./store";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { fa } from "@fortawesome/free-regular-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(faUser);
//Vue.component('font-awesome-icon', FontAwesomeIcon)



createApp(App).use(router).use(store).component('fa', FontAwesomeIcon).mount("#app");
