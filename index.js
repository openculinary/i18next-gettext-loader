const converter = require('i18next-conv')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  this.cacheable && this.cacheable()
  const callback = this.async()
  const options = loaderUtils.getOptions(this) || {}

  const re = new RegExp('Language: (\\w+)')
  const match = source.match(re)
  const language = match ? match[1] : 'en'

  converter.gettextToI18next(language, source, options).then(data => callback(null, data))
}
