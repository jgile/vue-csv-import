<template>
    <slot
        :sample="VueCsvImportData.firstSampleRow"
        :map="VueCsvImportData.map"
        :fields="VueCsvImportData.fields"
    >
        <template v-if="VueCsvImportData.firstSampleRow">
            <table v-bind="tableAttributes">
              <thead>
                <tr>
                  <td v-for="(field, key) in headers" :key="field">
                    {{ field }}
                    <select
                      v-model="csvMap[key]"
                      :name="`csv_uploader_map_${key}`"
                      required
                    >
                    <option value>{{ labels.excludeField }}</option>
                      <option
                          v-for="option in availableFields"
                          :value="option.label" :key="option.key"
                          :disabled="option.selected"
                      >
                            {{ option.label }}{{ option.required ? labels.requiredField : ''}}
                      </option>
                      <option
                          v-if="!VueCsvImportData.fields.map(f => f.label).includes(field)"
                          :value="field"
                          :key="field"
                      >
                            {{ field }}
                      </option>
                    </select>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in csvSample">
                  <td v-for="item in row">{{item}}</td>
                </tr>
              </tbody>
            </table>
        </template>
    </slot>
</template>

<script>
    import {computed, inject, watch, reactive} from 'vue';

    export default {
        name: "CsvTableMap",
        props: {
            tableAttributes: {
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
            const csvMap = reactive({})

            const availableFields = computed(() => {
                return VueCsvImportData.fields.map((f) => {
                    f.selected = Object.values(csvMap).includes(f.label)
                    return f
                })
            })

            watch(() => csvMap, function () {
                VueCsvImportData.map = {}
                for (const [key, value] of Object.entries(csvMap)) {
                    if (value === "") { continue; }
                    VueCsvImportData.map[value.toLowerCase()] = key;
                }

                if (VueCsvImportData.allFieldsAreMapped) {
                    buildMappedCsv();
                }
            }, {deep: true});

            const csvSample = computed(() => {
                return VueCsvImportData.fileHasHeaders ? VueCsvImportData.csvSample : VueCsvImportData.csvSample.slice(1)
            })

            const headers = computed(() => {
                if (VueCsvImportData.fileHasHeaders) {
                    return [...Array(VueCsvImportData.firstSampleRow.length).keys()].map(i => `${labels.csvColumn} ${i}`)
                } else {
                    return VueCsvImportData.firstSampleRow
                }
            })

            if (props.autoMatch) {
                watch(() => VueCsvImportData.csvSample, function (newVal) {
                    if (newVal) {
                        VueCsvImportData.fields.forEach(field => {
                            newVal[0].forEach((columnName, index) => {
                                let fieldName = props.autoMatchIgnoreCase ? field.label.toLowerCase().trim() : field.label.trim();
                                let colName = props.autoMatchIgnoreCase ? columnName.toLowerCase().trim() : columnName.trim();
                                if (fieldName === colName) {
                                    csvMap[index] = field.label;
                                }
                            });
                        });
                    }
                });
            }

            return {
                availableFields,
                csvMap,
                csvSample,
                headers,
                VueCsvImportData,
                labels
            }
        }
    };
</script>
