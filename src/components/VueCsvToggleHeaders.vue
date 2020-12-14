<template>
    <slot :hasHeaders="VueCsvImportData.fileHasHeaders" :toggle="toggleHasHeaders">
        <label v-bind="labelAttributes">
            <input
                type="checkbox"
                v-bind="checkboxAttributes"
                :value="VueCsvImportData.fileHasHeaders"
                @change="toggleHasHeaders"
            >
            {{ labels.toggleHeaders }}
        </label>
    </slot>
</template>

<script>
    import {inject} from 'vue';

    export default {
        name: "ToggleHasHeaders",
        props: {
            labelAttributes: {},
            checkboxAttributes: {},
        },
        setup() {
            const VueCsvImportData = inject('VueCsvImportData');
            const labels = VueCsvImportData.language;

            const toggleHasHeaders = function () {
                VueCsvImportData.fileHasHeaders = !VueCsvImportData.fileHasHeaders;
            }

            return {
                VueCsvImportData,
                toggleHasHeaders,
                labels
            }
        },
    };
</script>
