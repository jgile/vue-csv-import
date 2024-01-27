<template>
    <slot name="submit" :submit="submit" :mapped-csv="VueCsvImportData.value">
        <button type="submit" v-bind="$attrs" @click.prevent="submit">
            {{ labels.submitBtn }}
        </button>
    </slot>
</template>

<script>
import {inject} from 'vue';
import axios from 'axios';

export default {
    name: "VueCsvImportSubmit",
    props: {
        url: {
            type: String,
            required: true,
        },
        config: {
            type: Object,
            required: false,
            default: {}
        }
    },
    setup(props, context) {
        const VueCsvImportData = inject('VueCsvImportData');
        const buildMappedCsv = inject('buildMappedCsv');
        const labels = VueCsvImportData.language;

        const submit = function () {
            buildMappedCsv();

            axios.post(props.url, {[VueCsvImportData.inputName]: VueCsvImportData.value}, props.config).then(response => {
                context.emit('send-success', response);
            }).catch(response => {
                context.emit('send-error', response);
            }).finally(response => {
                context.emit('send-complete', response);
            });
        };

        return {
            submit,
            VueCsvImportData,
            labels
        }
    },
};
</script>
