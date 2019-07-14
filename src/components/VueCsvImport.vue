<template>
    <div class="vue-csv-uploader">
        <div class="form">
            <div class="vue-csv-uploader-part-one">
                <div class="form-check form-group csv-import-checkbox" v-if="headers === null">
                    <slot name="hasHeaders" :headers="hasHeaders" :toggle="toggleHasHeaders">
                        <input :class="checkboxClass" type="checkbox" id="hasHeaders" :value="hasHeaders" @change="toggleHasHeaders">
                        <label class="form-check-label" for="hasHeaders">
                            File Has Headers
                        </label>
                    </slot>

                </div>
                <div class="form-group csv-import-file">
                    <input ref="csv" type="file" :class="inputClass" name="csv">
                </div>
                <div class="form-group">
                    <slot name="next" :load="load">
                        <input type="submit" :class="buttonClass" @click.prevent="load" :value="loadBtnText">
                    </slot>
                </div>
            </div>
            <div class="vue-csv-uploader-part-two">
                <div class="vue-csv-mapping" v-if="sample">
                    <table :class="tableClass">
                        <slot name="thead">
                            <thead>
                            <tr>
                                <th>Field</th>
                                <th>CSV Column</th>
                            </tr>
                            </thead>
                        </slot>
                        <tbody>
                        <tr v-for="(field, key) in fieldsToMap" :key="key">
                            <td>{{ field.label }}</td>
                            <td>
                                <select class="form-control" v-model="map[field.key]">
                                    <option v-for="(column, key) in firstRow" :key="key" :value="key">{{ column }}</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="form-group" v-if="url">
                        <slot name="submit" :submit="submit">
                            <input type="submit" :class="buttonClass" @click.prevent="submit" :value="submitBtnText">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import axios from 'axios';
    import Papa from 'papaparse';

    export default {
        props: {
            value: Array,
            url: {
                type: String
            },
            mapFields: {
                required: true
            },
            callback: {
                type: Function,
                default: () => {
                }
            },
            catch: {
                type: Function,
                default: () => {
                }
            },
            finally: {
                type: Function,
                default: () => {
                }
            },
            parseConfig: {
                type: Object,
                default() {
                    return {};
                }
            },
            headers: {
                default: null
            },
            loadBtnText: {
                type: String,
                default: "Next"
            },
            submitBtnText: {
                type: String,
                default: "Submit"
            },
            tableClass: {
                type: String,
                default: "table"
            },
            checkboxClass: {
                type: String,
                default: "form-check-input"
            },
            buttonClass: {
                type: String,
                default: "btn btn-primary"
            },
            inputClass: {
                type: String,
                default: "form-control-file"
            }
        },

        data: () => ({
            form: {
                csv: null,
            },
            fieldsToMap: [],
            map: {},
            hasHeaders: true,
            csv: null,
            sample: null,
        }),

        created() {
            this.hasHeaders = this.headers;

            if (_.isArray(this.mapFields)) {
                this.fieldsToMap = _.map(this.mapFields, (item) => {
                    return {
                        key: item,
                        label: item
                    };
                });
            } else {
                this.fieldsToMap = _.map(this.mapFields, (label, key) => {
                    return {
                        key: key,
                        label: label
                    };
                });
            }
        },

        methods: {
            submit() {
                const _this = this;
                this.form.csv = this.buildMappedCsv();
                this.$emit('input', this.form.csv);

                if (this.url) {
                    axios.post(this.url, this.form).then(response => {
                        _this.callback(response);
                    }).catch(response => {
                        _this.catch(response);
                    }).finally(response => {
                        _this.finally(response);
                    });
                } else {
                    _this.callback(this.form.csv);
                }
            },
            buildMappedCsv() {
                const _this = this;

                let csv = this.hasHeaders ? _.drop(this.csv) : this.csv;

                return _.map(csv, (row) => {
                    let newRow = {};

                    _.forEach(_this.map, (column, field) => {
                        _.set(newRow, field, _.get(row, column));
                    });

                    return newRow;
                });
            },
            load() {
                const _this = this;

                this.readFile((output) => {
                    _this.sample = _.get(Papa.parse(output, { preview: 2, skipEmptyLines: true }), "data");
                    _this.csv = _.get(Papa.parse(output, { skipEmptyLines: true }), "data");
                });
            },
            readFile(callback) {
                let file = this.$refs.csv.files[0];

                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        callback(evt.target.result);
                    };
                    reader.onerror = function () {
                    };
                }
            },
            toggleHasHeaders() {
                this.hasHeaders = !this.hasHeaders;
            }
        },
        watch: {
            map: {
                handler: function (newVal) {
                    if (!this.url) {
                        var hasAllKeys = this.mapFields.every(function (item) {
                            return newVal.hasOwnProperty(item);
                        });

                        if (hasAllKeys) {
                            this.submit();
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            firstRow() {
                return _.get(this, "sample.0");
            }
        },
    };
</script>
