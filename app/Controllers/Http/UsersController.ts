import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User  from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
    
    public async register({ request, response }: HttpContextContract){
        const payload = await request.validate(UserValidator)
        
        console.log(payload);
        
        await User.create(payload)
        response.redirect('/login')
        console.log('payload')
    }    
    public async login({ request, response, auth }: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        await auth.attempt(email, password)
        response.redirect().back()
    }

    public async logout({ response, auth }: HttpContextContract){
    await auth.logout()
    response.redirect('/login')
    }

    public async getAllUsers({ view }: HttpContextContract){
    try {
      const users = await User.all()
      const html = await view.render('all_users', {users: users})
      return html

    } catch (e) {
        console.log(e)
        const html = await view.render('all_users', {users: 'Please login'})
        return html
    }
    }



}
