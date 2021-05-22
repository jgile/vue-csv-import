<template>
    <slot
        :errors="VueCsvImportData.errors"
        :fields="VueCsvImportData.fields"
        :file="VueCsvImportData.file"
    ></slot>
</template>

<script>
    import {computed, reactive, provide} from 'vue';
    import drop from 'lodash/drop';
    import every from 'lodash/every';
    import forEach from 'lodash/forEach';
    import get from 'lodash/get';
    import isArray from 'lodash/isArray';
    import map from 'lodash/map';
    import set from 'lodash/set';
    import merge from 'lodash/merge';

    const defaultLanguage = {
        errors: {
            fileRequired: 'A file is required',
            invalidMimeType: "Invalid file type"
        },
        toggleHeaders: 'File has headers',
        submitBtn: 'Submit',
        fieldColumn: 'Field',
        csvColumn: 'Column',
        requiredField: '*',
        excludeField: 'Exclude field'
    };

    const mapFields = function (fields) {
        if (isArray(fields)) {
            return map(fields, (item) => {
                return {
                    key: item,
                    label: item,
                    required: true
                };
            });
        }

        return map(fields, (val, key) => {
            return {
                key: key,
                label: get(val, 'label', val),
                required: get(val, 'required', true),
            };
        });
    }

    export default {
        props: {
            modelValue: Array,
            fields: {
                type: [Object, Array],
                required: true
            },
            text: {
                default() {
                    return {};
                }
            }
        },
        setup(props, {emit}) {
            let VueCsvImportData = reactive({
                errors: [],
                inputName: 'csv',
                file: null,
                map: {},
                value: {},
                fields: mapFields(props.fields),
                fileHasHeaders: null,
                csvSample: null,
                rawCsv: null,
                language: merge({}, defaultLanguage, props.text),
                firstSampleRow: computed(() => isArray(VueCsvImportData.csvSample) && isArray(VueCsvImportData.csvSample[0]) ? VueCsvImportData.csvSample[0] : null),
                allFieldsAreMapped: computed(() => every(VueCsvImportData.fields, function (field) {
                    return typeof VueCsvImportData.map[field.key] !== 'undefined' || !field.required;
                })),
            });

            const buildMappedCsv = function () {
                let newCsv = VueCsvImportData.fileHasHeaders ? VueCsvImportData.rawCsv : drop(VueCsvImportData.rawCsv);

                VueCsvImportData.value = map(newCsv, (row) => {
                    let newRow = {};
                    forEach(VueCsvImportData.map, (column, field) => {
                        set(newRow, field, get(row, column));
                    });

                    return newRow;
                });

                emit('update:modelValue', VueCsvImportData.value);
            };

            provide('VueCsvImportData', VueCsvImportData);
            provide('buildMappedCsv', buildMappedCsv);

            return {
                VueCsvImportData
            };
        }
    };
</script>
