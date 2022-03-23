import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import * as path from 'path'

const UPLOADS_PATH = path.resolve(__dirname, '../../uploads')

export default class Picture extends BaseModel {
  public static table = 'pictures'

  @column({ isPrimary: true })
  public id: number

  @column()
  public filename: string

  @column()
  public mimeType: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get fullpath() {
    return `${UPLOADS_PATH}/${this.filename}`
  }
}
