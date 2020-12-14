<template>
    <slot :errors="VueCsvImportData.errors.value">
        <span
            v-bind="$attrs"
            v-for="error in VueCsvImportData.errors"
        >
            {{ error }}
        </span>
    </slot>
</template>

<script>
    import {inject} from 'vue';

    export default {
        name: "VueCsvFiles",
        setup() {
            const VueCsvImportData = inject('VueCsvImportData');

            return {
                VueCsvImportData,
            }
        },
    };
</script>
