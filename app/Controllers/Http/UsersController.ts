import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User  from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {
    
    public async register({ request, response, session }: HttpContextContract){ 
        try {
            const payload = await request.validate(UserValidator)
            console.log(payload);
            await User.create(payload)
            session.flash('notification', 'User created successfully')        
            return response.redirect('/login')
            
        } catch (error) {
            console.log(error);
            session.flash('error', 'An user with this email already exists')        
            return response.redirect('back')
            
        }       
    }    
    public async login({ request, response, auth }: HttpContextContract){
        const {email, password} = request.only(['email', 'password'])

        console.log(request.all());
        await auth.attempt(email, password)
        return response.redirect('/users')
    }

    public async logout({ response, auth }: HttpContextContract){
    await auth.logout()
    response.redirect('/login')
    }

    public async getAllUsers({ view }: HttpContextContract){
    
      const users = await User.all()
      const html = await view.render('all_users', {users: users})
      return html

  
    }



}
