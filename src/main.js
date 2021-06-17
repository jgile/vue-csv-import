import {createApp} from "vue";
import App from "./App.vue";
import "./index.css";
import {VueCsvImportPlugin} from "../dist/vue-csv-import.umd.js";

createApp(App)
    .use(VueCsvImportPlugin)
    .mount("#app");
