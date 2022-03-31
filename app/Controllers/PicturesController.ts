import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GetPicture } from 'App/Services/PictureServices'
import * as path from 'path'
import Picture from 'App/Models/Picture'
import User from 'App/Models/User'
import * as fs from 'fs'

const UPLOADS_PATH = path.resolve(__dirname, '../../uploads')
const ALLOWED_TYPES = ['jpeg', 'png', 'gif']

export default class PicturesController {
  public async create({ auth, request, response, session }: HttpContextContract) {
    const user = auth.use('web').user as User
    const file = request.file('picture')

    // console.log(file)

    if (!file || !ALLOWED_TYPES.includes(file.subtype ?? '')) {
      return response.status(400).send('bad_request')
    }

    // Move file
    await file.move(UPLOADS_PATH)

    // Create record in db
    const picture = new Picture()
    picture.fill({
      filename: file.fileName,
      mimeType: `${file.type}/${file.subtype}`,
    })

    await picture.related('user').associate(user)

    session.flash('success', {
      title: 'Bravo',
      description: 'Image envoyée',
    })

    return response.redirect('/')
  }

  public async upload({ view }: HttpContextContract) {
    return view.render('upload')
  }

  public async display({ request, response }: HttpContextContract) {
    const pictureId = request.param('id')
    const picture = await GetPicture(pictureId)

    if (picture && fs.existsSync(picture.fullpath)) {
      response.header('Content-Type', picture.mimeType)
      response.download(picture.fullpath)
    } else {
      return response.status(404).send('not_found')
    }
  }
}
