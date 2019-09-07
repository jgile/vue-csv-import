import Vue from 'vue';
import VueCsvImport from "./components/VueCsvImport";

const VueCsvImportPlugin = {
    install(Vue, options = {}) {
        Vue.component(options.componentName || 'VueCsvImport', VueCsvImport);
    }
};

if (typeof window !== undefined && window.Vue && window.Vue === Vue) {
    VueCsvImportPlugin.install(window.Vue);
}

export { VueCsvImport, VueCsvImportPlugin };

export default VueCsvImport;
