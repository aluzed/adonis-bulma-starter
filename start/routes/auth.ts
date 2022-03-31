import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.group(() => {
  Route.get('/', async ({ session, auth, view, response }) => {
    await auth.use('web').check()

    if (auth.use('web').isLoggedIn) {
      session.flash('errors', {
        title: 'Oops',
        description: "You're already connected",
      })
      return response.redirect('/')
    }

    return view.render('login')
  })

  Route.post('/', 'AuthController.login').as('login.post')
}).prefix('/login')

Route.group(() => {
  Route.get('/', async ({ session, auth, view, response }) => {
    await auth.use('web').check()

    if (auth.use('web').isLoggedIn) {
      session.flash('errors', {
        title: 'Oops',
        description: "You're already connected",
      })
      return response.redirect('/')
    }

    return view.render('register')
  })

  Route.post('/', 'AuthController.register').as('register.post')
}).prefix('/register')

Route.get('logout', async ({ session, auth, response }) => {
  try {
    await auth.use('web').check()

    if (!auth.use('web').isLoggedIn) {
      session.flash('errors', {
        title: 'Oops',
        description: "You're not connected",
      })
    } else {
      await auth.use('web').logout(true)
    }
    return response.redirect('/login')
  } catch (err) {
    console.log(err)
    return response.redirect('/login')
  }
})
