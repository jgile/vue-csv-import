import Vue from 'vue';
import VueCsvImport from "./components/VueCsvImport";

function install(Vue, options = {}) {
    Vue.component(options.componentName || 'VueCsvImport', VueCsvImport);
}

if (typeof window !== undefined && window.Vue && window.Vue === Vue) {
    install(window.Vue);
}

export { VueCsvImport, install };

export default VueCsvImport;
