import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.required(),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      rules.confirmed('passwordConfirmation'),
      rules.required(),
    ]),
    first_name: schema.string({}, [rules.required()]),
    last_name: schema.string({}, [rules.required()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'user.username.required': 'Missing value for username',
    'user.password.camelCase': 'Your password must contains 1 CamelCase minimum',

    'user.password.minLength': 'our password must contains {{ options.minLength }} characters',
  }
}
