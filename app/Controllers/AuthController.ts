import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { CreateUser } from 'App/Services/UserServices'

export default class AuthController {
  public async login({ session, auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      // Attempt connection
      const remember = true
      await auth.use('web').attempt(email, password + process.env.SALT, remember)

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
  }

  public async register({ session, auth, request, response }: HttpContextContract) {
    const username = request.input('username')
    const email = request.input('email')
    const password = request.input('password')
    const passwordVerification = request.input('password_verification')

    if (password !== passwordVerification) {
      session.flash('errors', {
        title: 'Oops',
        description: 'Password mismatch',
      })

      return response.redirect('/register')
    }

    try {
      // Create user
      const user = await CreateUser({
        username,
        email,
        password,
      })

      // Log user
      if (user) {
        const remember = true
        await auth.use('web').login(user as User, remember)
      }

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
  }
}
