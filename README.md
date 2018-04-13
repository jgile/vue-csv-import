# Vue.js component to handle CSV uploads with field mapping.

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-csv-import.svg?style=flat-square)](https://npmjs.com/package/vue-csv-import)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![CircleCI](https://circleci.com/gh/jgile/vue-csv-import.svg?style=svg)](https://circleci.com/gh/jgile/vue-csv-import)



## Demo

[Demo](https://codepen.io/jgile/pen/RMmWOd)


Go to the "docs" folder for a working example.

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
import { VueCsvImport } from '../src';

new Vue({
    components: { VueCsvImport },

    el: '#app',
});

```

Include in template:
```html
<vue-csv-import url="/url/to/post" :map-fields="['array', 'of', 'field', 'names']"></vue-csv-import>

```

Options:

| Option | Default | Description |
| ------ | ------- | ----------- |
| url | null | If present, the component will post the mapped values to this url |
| mapFields | [] | required. These are the field names that the CSV will be mapped to. |
| callback  | null | The callback to be called on successful upload. (url required) |
| catch | null | The function to be called on an error in posting (url required) |
| finally | null | The function to be called no matter what on posting (url required) |
| tableClass | "table" | The class to be added to table element |
| checkboxClass | "form-check-input" | The class to be added to the checkbox |
| buttonClass | "btn btn-default" | The class to be added to buttons |
| inputClass | "form-control" | The class to be added to the file input |

### Testing

```bash
yarn test
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
