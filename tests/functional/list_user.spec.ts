import  User  from 'App/Models/User';
import { test } from '@japa/runner'

test.group('List users', () => {
  test("Redirect to login if not authenticated ", async ({ client }) => {
    const response = await client.get('/users')
  
    response.assertRedirectsTo('/login')
    
  })

  test("Can view user if authenticated ", async ({ client }) => {
    const user = await User.find(1)
    const response = await client.get('/users').guard('web').loginAs(user)
  
    response.assertStatus(200)
    
  })
  
  
})
