import User from 'App/Models/User'

export const CreateUser = async (data: any): Promise<boolean | User> => {
  try {
    const user = new User()
    await user.fill(data).save()
    return user
  } catch (err) {
    console.log(err)
    return false
  }
}
