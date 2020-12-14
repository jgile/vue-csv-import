import {createApp} from "vue";
import App from "./App.vue";
import "./index.css";
import {VueCsvImportPlugin} from "./index.js";

createApp(App)
    .use(VueCsvImportPlugin)
    .mount("#app");
