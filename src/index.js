import merge from 'lodash/merge';
import VueCsvImport from "./components/VueCsvImport.vue";
import VueCsvErrors from "./components/VueCsvErrors.vue";
import VueCsvInput from "./components/VueCsvInput.vue";
import VueCsvMap from "./components/VueCsvMap.vue";
import VueCsvSubmit from "./components/VueCsvSubmit.vue";
import VueCsvToggleHeaders from "./components/VueCsvToggleHeaders.vue";

const VueCsvImportPlugin = {
    install(app, options) {
        options = merge({
            components: {
                'vue-csv-import': 'vue-csv-import',
                'vue-csv-errors': 'vue-csv-errors',
                'vue-csv-input': 'vue-csv-input',
                'vue-csv-map': 'vue-csv-map',
                'vue-csv-submit': 'vue-csv-submit',
                'vue-csv-toggle-headers': 'vue-csv-toggle-headers',
            }
        }, options);

        app.component(options.components['vue-csv-import'], VueCsvImport)
        app.component(options.components['vue-csv-errors'], VueCsvErrors)
        app.component(options.components['vue-csv-input'], VueCsvInput)
        app.component(options.components['vue-csv-map'], VueCsvMap)
        app.component(options.components['vue-csv-submit'], VueCsvSubmit)
        app.component(options.components['vue-csv-toggle-headers'], VueCsvToggleHeaders)
    }
}

export {VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport, VueCsvImportPlugin};
