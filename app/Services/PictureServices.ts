import Database from '@ioc:Adonis/Lucid/Database'
import Picture from 'App/Models/Picture'

export const CreatePicture = async (data: Partial<Picture>): Promise<null | Picture> => {
  try {
    const picture = new Picture()
    await picture.fill(picture).save()
    return picture
  } catch (err) {
    console.log(err)
    return null
  }
}

export const GetPicture = async (pictureId: number): Promise<null | Picture> => {
  try {
    const picture = await Picture.find(pictureId)
    return picture ?? null
  } catch (err) {
    console.log(err)
    return null
  }
}

export const LastPictures = async (): Promise<Picture[]> => {
  try {
    const pictures = await Database.from('pictures').orderBy('created_at', 'desc').limit(5)
    return pictures
  } catch (err) {
    console.log(err)
    return []
  }
}
