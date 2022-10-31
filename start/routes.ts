
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import UserValidator from 'App/Validators/UserValidator';

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('register', async ({ view }) => {
  return view.render('register_form')
})

Route.post('register', 'UsersController.register')

Route.get('login', async ({ view }) => {
  return view.render('login_form')
})

Route.post('login', 'UsersController.login')

Route.get('logout', 'UsersController.logout')

Route.get('/about', async ({ view }) => {
  return view.render('about')
})
Route.get('/order-food', async ({ view }) => {
  return view.render('order_food')
})

Route.group(() => {
  Route.get('/', 'RestaurantsController.showRestaurants')
}).prefix('/restaurants')




Route.group(() => {
  Route.get('/', 'UsersController.getAllUsers')
}).prefix('/users').middleware('auth')


// Route.group(() => {
//   Route.get('/', 'PostsController.getAllPost')
//   Route.post('/', 'PostsController.sendPost')
// }).prefix('/post').middleware('auth')


