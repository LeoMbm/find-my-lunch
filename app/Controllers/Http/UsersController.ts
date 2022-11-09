
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
  // TODO: Put all this function in a auth controller - user controller is for edit account, get account information, delete account

  public async register({ request, response, session }: HttpContextContract) {
    try {
      const payload = await request.validate(UserValidator)
      console.log(payload)
      const user = await User.create(payload)
      session.flash('notification', 'User created successfully')
      return response.status(201).send({ message: 'User successfully created', user: user })
    } catch (error) {
      console.log(error)
      session.flash('error', 'An user with this email already exists')
      return response
        .status(400)
        .send({
          message: 'An user with this email already exists',
          status: response.getStatus(),
          error: error.messages,
        })
    }
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email)
        // I think is not very secure ...
        const token = await auth.use('api').login(user)
        return response.status(200).send({ message: 'Login successfully', user: user, token})
      }
    } catch (error) {
      console.log(error)
      return response
        .status(400)
        .send({
          message: 'Invalid credentials',
          status: response.getStatus(),
          error: error.responseText,
        })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke()
    // I think is not very secure ...
    // response.clearCookie('JWT-AUTH')
    // response.clearCookie('JWT-REFRESH')
    return response.status(200).send({
      message: 'Logout successfully',
      revoked: true,
    })
  }

  public async getUserInfo({ request, params, response, auth, session }: HttpContextContract) {
    // TODO: How can i have the user id like -- request.user.id -- how to use session in adonis and react
    try {
      const id = auth.user?.id
      const user = await User.find(id)
      return response.status(200).send({ message: user })
    } catch (error) {
      console.log(error)
      return response
        .status(401)
        .send({ message: 'Unauthorized', status: response.getStatus(), error: error.responseText })
    }
  }
}
