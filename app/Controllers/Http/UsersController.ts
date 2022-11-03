import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User  from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator'


export default class UsersController {
    
    public async register({ request, response, session }: HttpContextContract){ 
        try {
            const payload = await request.validate(UserValidator)
            console.log(payload);
            const user = await User.create(payload)
            session.flash('notification', 'User created successfully')        
            return response.status(201).send({message: 'User successfully created',
        user: user})
            
        } catch (error) {
            console.log(error);
            session.flash('error', 'An user with this email already exists')        
            return response.status(400).send({message: 'An user with this email already exists', 
                                              status: response.getStatus(),
                                              error: error.messages
                                             })
            
        }       
    }    
    
    public async login({ request, response, auth }: HttpContextContract){
        const {email, password} = request.only(['email', 'password'])
        try {
            console.log(request.all());
            await auth.attempt(email, password)
            return response.status(201).send({message: 'Login successfully'})
            
        } catch (error) {
            console.log(error);
            return response.status(400).send(
                {message: 'Invalid credentials',
                status: response.getStatus(),
                error: error.responseText
                })
        }

    }

    public async logout({ response, auth }: HttpContextContract){
    await auth.logout()
    return response.status(200).send({message: 'Logout successfully'})
    }

    public async getAllUsers({ response }: HttpContextContract){
    
      const users = await User.all()
    
      return response.status(201).send({message: users})

  
    }



}
