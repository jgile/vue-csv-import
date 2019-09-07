# Changelog

All notable changes to `vue-csv-import` will be documented in this file

## 1.0.0
- Initial release

## 1.5.0
- Added ability to use custom labels for fields.

## 1.5.1
- Change default file class.
- Add options for the button values

## 1.6
- Debug and added tests

## 2.1.0
- Remove csv-parse dependency and replace with papaparse - smaller and more dependable.
- Can now use with v-model.  will return a parsed csv.

## 2.3.0
- Added slots for file header checkbox and table thead.
- default button text changed to "next"
- added callback for usage without url.
- Added 'headers' prop.  Define whether csv has headers by default.  Removes checkbox.

## 2.3.4
- restructure app
- make axios and lodash external dependencies.
- papaparse is bundled in component.

## 2.3.5
- Mime type validation when selecting file

## 2.3.6
- added names to select fields
- added other mime types to default accepted types array
- added some more meaningful tests
