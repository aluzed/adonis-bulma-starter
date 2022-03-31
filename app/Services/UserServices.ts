import User from 'App/Models/User'

export const CreateUser = async (data: Partial<User>): Promise<null | User> => {
  try {
    const user = new User()
    await user.fill(data).save()
    return user
  } catch (err) {
    console.log(err)
    return null
  }
}
