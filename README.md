# Vue.js component to handle CSV uploads with field mapping.

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-csv-import.svg?style=flat-square)](https://npmjs.com/package/vue-csv-import)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![CircleCI](https://circleci.com/gh/jgile/vue-csv-import.svg?style=svg)](https://circleci.com/gh/jgile/vue-csv-import)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jgile/vue-csv-import/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/jgile/vue-csv-import/?branch=master)


## Demo

[Demo](https://jgile.github.io/vue-csv-import/)


Go to the "demo" folder for a working example.

## Installation

You can install the package via yarn:

```bash
yarn add vue-csv-import
```

or npm:

```bash
npm install vue-csv-import --save
```

## Usage
Import component:

```js
import { VueCsvImport } from 'vue-csv-import';

new Vue({
    components: { VueCsvImport },
    el: '#app',
});

```

Include in template:
```html
<vue-csv-import url="/url/to/post" :map-fields="['array', 'of', 'field', 'names']"></vue-csv-import>

```
or with labels:
```html
<vue-csv-import url="/url/to/post" :map-fields="{field1: 'Label 1', field2: 'Label 2'}"></vue-csv-import>

```
or with v-model:
```html
<vue-csv-import v-model="parseCsv" :map-fields="{field1: 'Label 1', field2: 'Label 2'}"></vue-csv-import>

```
With all available slots:
```html
<vue-csv-import
    v-model="csv"
    url="/hello"
    :map-fields="['name', 'age']">

    <template slot="hasHeaders" slot-scope="{headers, toggle}">
        <label>
            <input type="checkbox" id="hasHeaders" :value="headers" @change="toggle">
            Headers?
        </label>
    </template>

    <template slot="error">
        File type is invalid
    </template>

    <template slot="thead">
        <tr>
            <th>My Fields</th>
            <th>Column</th>
        </tr>
    </template>

    <template slot="next" slot-scope="{load}">
        <button @click.prevent="load">load!</button>
    </template>

    <template slot="submit" slot-scope="{submit}">
        <button @click.prevent="submit">send!</button>
    </template>
</vue-csv-import>

```
Options:

| Option | Default | Description |
| ------ | ------- | ----------- |
| mapFields | N/A | (required) These are the field names that the CSV will be mapped to |
| url | null | If present, the component will post the mapped values to this url.  Otherwise, the component will only emit the value to be used as a normal input |
| callback  | null | The callback to be called on successful upload. (url required) |
| catch | null | The function to be called on an error in posting (url required) |
| finally | null | The function to be called no matter what on posting (url required) |
| tableClass | "table" | The class to be added to table element |
| checkboxClass | "form-check-input" | The class to be added to the checkbox |
| buttonClass | "btn btn-default" | The class to be added to buttons |
| inputClass | "form-control-file" | The class to be added to the file input |
| submitBtnText | "Submit" | The value of the final submit button |
| loadBtnText | "Submit" | The value of the initial load file button |
| headers | null | Define whether csv has headers by default.  Removes checkbox. |
| fileMimeTypes | ["text/csv"] | Array of valid mime types

Slots:

| Slot | Description |
| ------ | ----------- |
| thead | The content of "thead" in the field mapping table |
| next | The next button.  Use slot-scope "next" to load csv. |
| submit | The submit button. Use slot-scope "submit" to submit form. |
| hasHeaders | The "has headers" checkbox. Use slot-scope "toggle" and "headers". |

### Testing

```bash
npm run test
```

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

### Security

If you discover any security related issues, please contact John Gile.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Credits

- [John Gile](https://github.com/jgile)
- [All Contributors](../../contributors)
