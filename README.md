# @openculinary/i18next-gettext-loader

Convert gettext PO files into i18next JSON format during webpack builds.

Forked from the no-longer-maintained [i18next-po-loader](https://github.com/queicherius/i18next-po-loader).

## Install

```bash
yarn add @openculinary/i18next-gettext-loader --dev
```

## Webpack config

```js
{
  test: /\.po$/, 
  use: [
    {'loader': '@openculinary/i18next-gettext-loader'}
  ]
}
```
