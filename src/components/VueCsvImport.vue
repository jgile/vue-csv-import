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
            invalidFieldType: 'Invalid data type in row ${row} column ${col}. ',
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
                type: get(val, 'type', String),
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

                VueCsvImportData.errors = [];

                VueCsvImportData.value = map(newCsv, (row, index) => {
                    let newRow = {};
                    forEach(VueCsvImportData.map, (column, field) => {
                        set(newRow, field, typeCast(row, column, field, index));
                    });

                    return newRow;
                });

                emit('update:modelValue', VueCsvImportData.value);
            };

            const typeMap = VueCsvImportData.fields.reduce((a, f) => set(a, f.key, f.type ?? String), {});

            const typeCast = function(row, column, field, index) {
                let fieldVal = get(row, column);
                let castVal = typeMap[field](fieldVal);

                // Handle Booleans
                if (typeMap[field] === Boolean) {
                    switch (fieldVal.toLowerCase().trim()) {
                        case 'false': case 'no': case '0': case 'null': case '': return false;
                        case 'true': case 'yes': case '1': return true;
                        default: return fieldVal; // Return uncast value
                    }
                }

                // Catch non-numeric Numbers
                if (Object.is(NaN, castVal)) {
                    VueCsvImportData.errors.push(
                        defaultLanguage.errors.invalidFieldType
                            .replace(/\${row}/g, index + (VueCsvImportData.fileHasHeaders ? 1 : 2))
                            .replace(/\${col}/g, column + 1)
                    );
                    return fieldVal; // Return uncast value
                }

                return castVal;
            };

            provide('VueCsvImportData', VueCsvImportData);
            provide('buildMappedCsv', buildMappedCsv);

            return {
                VueCsvImportData
            };
        }
    };
</script>
