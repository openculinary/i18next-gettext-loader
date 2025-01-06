import * as converter from 'i18next-conv';

export default function (source) {
  this.cacheable && this.cacheable()
  const callback = this.async()
  const options = this.getOptions() || {}

  const re = new RegExp('Language: (\\w+)')
  const match = source.match(re)
  const language = match ? match[1] : 'en'

  converter.gettextToI18next(language, source, options).then(data => callback(null, data))
}
