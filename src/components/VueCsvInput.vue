<template>
    <slot :file="file" :change="change">
        <input ref="csvRef" type="file" @change="change" :name="name" v-bind="$attrs">
    </slot>
</template>

<script>
    import {inject, ref, watch} from 'vue';
    import get from 'lodash/get';
    import merge from 'lodash/merge';
    import Papa from "papaparse";
    import guessMimeType from "../util/mimeDictionary";

    export default {
        name: "CsvFile",
        props: {
            name: {
                type: String,
                default: 'csv'
            },
            headers: {
                type: [Boolean, null],
                default: true
            },
            parseConfig: {
                type: Object,
                default() {
                    return {};
                }
            },
            validation: {
                type: Boolean,
                default: true,
            },
            fileMimeTypes: {
                type: Array,
                default: () => {
                    return ["text/csv", "text/x-csv", "application/vnd.ms-excel", "text/plain"];
                }
            }
        },
        setup(props) {
            const csvRef = ref(null);
            const VueCsvImportData = inject('VueCsvImportData');
            const buildMappedCsv = inject('buildMappedCsv');
            const labels = VueCsvImportData.language;

            VueCsvImportData.inputName = name;
            VueCsvImportData.fileHasHeaders = props.headers !== null ? !!props.headers : null;

            const validate = function (file) {
                VueCsvImportData.errors = [];

                if (!file) {
                    VueCsvImportData.errors.push(labels.errors.fileRequired);
                }

                if (props.validation) {
                    const mimeType = file.type === "" ? guessMimeType(file.name) : file.type;

                    if (!props.fileMimeTypes.includes(mimeType)) {
                        VueCsvImportData.errors.push(labels.errors.invalidMimeType);
                    }

                    return VueCsvImportData.errors.length === 0;
                }

                return true;
            }

            const change = function () {
                let tmpFile = csvRef.value.files ? csvRef.value.files[0] : null;

                if (validate(tmpFile)) {
                    VueCsvImportData.file = tmpFile;
                }
            }

            watch(() => VueCsvImportData.file, newCurrentFile => {
                if (!newCurrentFile) {
                    VueCsvImportData.csvSample.value = null;
                    VueCsvImportData.rawCsv.value = null;
                }
                let reader = new FileReader();
                reader.readAsText(VueCsvImportData.file, "UTF-8");
                reader.onload = function (evt) {
                    VueCsvImportData.csvSample = get(Papa.parse(evt.target.result, merge({
                        preview: 2,
                        skipEmptyLines: true
                    }, props.parseConfig)), "data");
                    VueCsvImportData.rawCsv = get(Papa.parse(evt.target.result, merge({skipEmptyLines: true}, props.parseConfig)), "data");
                };
                reader.onerror = function (err) {
                    console.log(err);
                };
            }, {deep: true});

            watch(() => VueCsvImportData.fileHasHeaders, () => {
                if (VueCsvImportData.allFieldsAreMapped) {
                    buildMappedCsv();
                }
            });

            return {
                file: VueCsvImportData.file,
                change,
                csvRef
            }
        },
    };
</script>
