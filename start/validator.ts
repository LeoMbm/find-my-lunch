/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { string } from '@ioc:Adonis/Core/Helpers'
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('camelCase', (value, [maxLength], options) => {
  if (typeof value !== 'string') {
    return
  }

  if (value !== string.camelCase(value)) {
    options.errorReporter.report(
      options.pointer,
      'camelCase',
      'camelCase validation failed',
      options.arrayExpressionPointer
    )
  }

  if (maxLength && value.length > maxLength) {
    options.errorReporter.report(
      options.pointer,
      'camelCase.maxLength', // 👈 Keep an eye on this
      'camelCase.maxLength validation failed',
      options.arrayExpressionPointer,
      { maxLength }
    )
  }
})
