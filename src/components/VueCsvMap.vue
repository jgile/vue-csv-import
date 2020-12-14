<template>
    <slot
        :sample=" VueCsvImportData.firstSampleRow"
        :map="VueCsvImportData.map"
        :fields="VueCsvImportData.fields"
    >
        <template v-if="VueCsvImportData.firstSampleRow">
            <table v-bind="$attrs">
                <thead v-if="!noThead">
                    <tr>
                        <th>{{ labels.fieldColumn }}</th>
                        <th>{{ labels.csvColumn }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(field, key) in VueCsvImportData.fields" :key="key">
                        <td>{{ field.label }}</td>
                        <td>
                            <select
                                v-bind="selectAttributes"
                                :name="`csv_uploader_map_${key}`"
                                v-model="VueCsvImportData.map[field.key]"
                            >
                                <option v-if="!field.required" :value="null">&nbsp;</option>
                                <option
                                    v-for="(column, key) in VueCsvImportData.firstSampleRow"
                                    :key="key"
                                    :value="key"
                                >{{ column }}
                                </option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </slot>
</template>

<script>
    import {inject, watch} from 'vue';

    export default {
        name: "CsvMap",
        props: {
            noThead: {
                type: Boolean,
                default: false,
            },
            selectAttributes: {
                type: Object,
                default() {
                    return {};
                }
            },
            autoMatch: {
                type: Boolean,
                default: true
            },
            autoMatchIgnoreCase: {
                type: Boolean,
                default: true
            }
        },
        setup(props) {
            const VueCsvImportData = inject('VueCsvImportData');
            const buildMappedCsv = inject('buildMappedCsv');
            const labels = VueCsvImportData.language;

            watch(() => VueCsvImportData.map, function () {
                if (VueCsvImportData.allFieldsAreMapped) {
                    buildMappedCsv();
                }
            }, {deep: true});

            if (props.autoMatch) {
                watch(() => VueCsvImportData.csvSample, function (newVal) {
                    if (newVal) {
                        VueCsvImportData.fields.forEach(field => {
                            newVal[0].forEach((columnName, index) => {
                                let fieldName = props.autoMatchIgnoreCase ? field.label.toLowerCase().trim() : field.label.trim();
                                let colName = props.autoMatchIgnoreCase ? columnName.toLowerCase().trim() : columnName.trim();
                                if (fieldName === colName) {
                                    VueCsvImportData.map[field.key] = index;
                                }
                            });
                        });
                    }
                });
            }

            return {
                VueCsvImportData,
                labels
            }
        },
    };
</script>
