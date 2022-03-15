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
import { CreateUser, UserAuth } from '../app/Controllers/UserController'

Route.get('/', async ({ auth, view }) => {
  // await CreateUser({
  //   username: 'bob',
  //   email: 'jacques@yopmail.com',
  //   password: 'bobleponge',
  // })
  // const isAuth = await UserAuth('bob@yopmail.com', 'bobleponge')
  // console.log(isAuth)

  // Get user from session
  await auth.use('web').authenticate()
  console.log(auth.use('web').user!)

  return view.render('welcome')
})

Route.get('login', async ({ view }) => {
  return view.render('login')
})

Route.post('login', async ({ session, auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    // Attempt connection
    const remember = true
    const user = await auth.use('web').attempt(email, password + process.env.SALT, remember)

    session.flash('success', {
      title: 'Aie Caramba',
      description: 'Benvenito Senior',
    })

    return response.redirect('/')
  } catch (err) {
    console.log(err)

    session.flash('errors', {
      title: 'Entrée interdite !',
      description: 'SORTEZZZZZZ !',
    })

    return response.redirect('/')
  }
})
