import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export const CreateUser = async (data: any): Promise<boolean> => {
  try {
    const user = new User()
    await user.fill(data).save()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const UserAuth = async (email: string, password: string): Promise<boolean> => {
  try {
    const user = await User.query().where('email', email).where('status', 'ENABLED').firstOrFail()

    if (user && (await Hash.verify(user.password, password + process.env.SALT))) {
      return true
    }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}
