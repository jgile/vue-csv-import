import Vue from "vue";
import App from "./App.vue";
import { VueCsvImportPlugin } from "../src";

Vue.use(VueCsvImportPlugin);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
