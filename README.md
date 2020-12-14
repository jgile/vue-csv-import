# Vue.js component to handle CSV uploads with field mapping.

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-csv-import.svg?style=flat-square)](https://npmjs.com/package/vue-csv-import)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![CircleCI](https://circleci.com/gh/jgile/vue-csv-import.svg?style=svg)](https://circleci.com/gh/jgile/vue-csv-import)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jgile/vue-csv-import/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/jgile/vue-csv-import/?branch=master)

This version is for Vue 3. [Click here for Vue 2](https://github.com/jgile/vue-csv-import/tree/vue2).

VueCsvImport is completely un-styled and customizable. All markup can be replaced and all text can be customized.

[Demo](https://jgile.github.io/vue-csv-import/)

---

## Installation

You can install the package via npm or yarn:

```bash
# npm
npm install vue-csv-import

# Yarn
yarn add vue-csv-import
```

You can import components individually.

```js
import {VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport} from 'vue-csv-import';
```

Or import all as a plugin.

```js
import {createApp} from "vue";
import App from "./App.vue";
import {VueCsvImportPlugin} from "vue-csv-import";

createApp(App)
    .use(VueCsvImportPlugin)
    .mount("#app");
```

A minimal working example with all components will look something like this:

```vue

<template>
    <vue-csv-import
        v-model="csv"
        :fields="{name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}"
    >
        <vue-csv-toggle-headers></vue-csv-toggle-headers>
        <vue-csv-errors></vue-csv-errors>
        <vue-csv-input></vue-csv-input>
        <vue-csv-map></vue-csv-map>
    </vue-csv-import>
</template>
```

---

## Components

- [VueCsvImport](#VueCsvImport) - The primary component wrapper. All other components should be used within this component.
- [VueCsvToggleHeaders](#VueCsvToggleHeaders) - Toggles whether CSV should be read as having headers or not.
- [VueCsvInput](#VueCsvInput) - The file input field to upload your CSV
- [VueCsvMap](#VueCsvMap) - Used to map CSV columns to your fields
- [VueCsvSubmit](#VueCsvSubmit) - Used to POST the mapped CSV.
- [VueCsvErrors](#VueCsvErrors) - Used to display errors.

### VueCsvImport

Primary wrapper component.

```vue

<template>
    <vue-csv-import
        v-model="csv"
        :fields="{
            name: {
                required: false,
                label: 'Name'
            },
            age: {
                required: true,
                label: 'Age'
            }
        }"
    >
        <!-- Other Components -->
    </vue-csv-import>
</template>

```

#### Props:

| Prop          | Default   | Description |
| ------        | -------   | ----------- |
| fields        | null      | (required) The field names used to map the CSV. |
| text          | see below | (optional) Override the default text used in the component. |
| modelValue    | N/A       | (optional) Binds to the mapped CSV object. |

#### Default text

```json
{
    errors: {
        fileRequired: 'A file is required',
        invalidMimeType: "Invalid file type"
    },
    toggleHeaders: 'File has headers',
    submitBtn: 'Submit',
    fieldColumn: 'Field',
    csvColumn: 'Column'
}
```

#### Slot Props:

| Prop          | Description |
| ------        | ----------- |
| file          | The selected file |
| errors        | Current errors |
| fields        | The fields object |

---

### VueCsvToggleHeaders

Allows user to toggle whether the CSV has headers or not.

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-toggle-headers></vue-csv-toggle-headers>
        ...
    </vue-csv-import>
</template>
```

Or with custom markup:

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-toggle-headers v-slot="{hasHeaders, toggle}">
            <button @click.prevent="toggle">Has Headers</button>
        </vue-csv-toggle-headers>
        ...
    </vue-csv-import>
</template>
```

#### Props:

| Prop                  | Default   | Description |
| ------                | -------   | ----------- |
| checkboxAttributes    | {}        | (optional) Attributes to bind to the checkbox. |
| labelAttributes       | {}        | (optional) Attributes to bind to the label. |

#### Slot Props:

| Prop          | Description |
| ------        | ----------- |
| hasHeaders    | Whether CSV is marked as having headers. |
| toggle        | Toggle the 'hasHeaders' value. |

---

### VueCsvInput

The file field for importing CSV.

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-input name="file"></vue-csv-input>
        ...
    </vue-csv-import>
</template>
```

Or with custom markup:

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-input v-slot="{file, change}">
            ...
        </vue-csv-input>
        ...
    </vue-csv-import>
</template>
```

#### Props:

| Prop          | Default   | Description |
| ------        | -------   | ----------- |
| name          | N/A       | (required) The field names used to map the CSV.
| headers       | true      | (optional) Override the default text used in the component. |
| parseConfig   | N/A       | (optional) Papaparse config object. |
| validation    | true      | (optional) Use validation or not |
| fileMimeTypes | ["text/csv", "text/x-csv", "application/vnd.ms-excel", "text/plain"]       | (optional) Accepted CSV file mime types. |

#### Slot Props:

| Prop          | Description |
| ------        | ----------- |
| file    | The current file object |
| change        | Change the file |

---

### VueCsvMap

Component to map the CSV to the specified fields.

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-map></vue-csv-map>
        ...
    </vue-csv-import>
</template>
```

Or use slot for custom markup:

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-map v-slot="{sample, map, fields}">
            ...
        </vue-csv-map>
        ...
    </vue-csv-import>
</template>
```

#### Props:

| Prop                | Default   | Description |
| ------              | -------   | ----------- |
| noThead             | false     | (optional) Attributes to bind to the checkbox. |
| selectAttributes    | {}        | (optional) Attributes to bind to the select fields. |
| autoMatch           | true      | (optional) Auto-match fields to columns when they share the same name |
| autoMatchIgnoreCase | true      | (optional) Ignore case when auto-matching |

#### Slot Props:

| Prop   | Description |
| ------ | ----------- |
| sample | The first row of the CSV. |
| map    | The currently mapped fields. |
| fields | The fields. |

---

### VueCsvSubmit

Displays a button to post the CSV to specified URL.

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-submit url="/post/here"></vue-csv-submit>
        ...
    </vue-csv-import>
</template>
```

Or use slot for custom markup:

```vue

<template>
    <vue-csv-import>
        <vue-csv-submit v-slot="{submit, mappedCsv}">
            <button @click.prevent="submit">Submit!!</button>
        </vue-csv-submit>
    </vue-csv-import>
</template>
```

#### Props:

| Prop   | Default   | Description |
| ------ | -------   | ----------- |
| url    | N/A       | (required) Where to post the CSV. |

#### Slot Props:

| Prop          | Description |
| ------        | ----------- |
| submit        | Submit the CSV (POST) |
| mappedCsv     | The mapped CSV object |

---

### VueCsvErrors

Displays any error messages.

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-errors></vue-csv-errors>
        ...
    </vue-csv-import>
</template>
```

Or use slot for custom markup:

```vue

<template>
    <vue-csv-import>
        ...
        <vue-csv-errors v-slot="{errors}">
            ...
        </vue-csv-errors>
        ...
    </vue-csv-import>
</template>
```

#### Slot Props:

| Prop          | Description |
| ------        | ----------- |
| errors        | Object containing errors |

---

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
