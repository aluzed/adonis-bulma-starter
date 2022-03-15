import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Picture extends BaseModel {
  public static table = 'pictures'

  @column({ isPrimary: true })
  public id: number

  @column()
  public filename: string

  @column()
  public mime_type: string

  @hasOne(() => User, {
    foreignKey: 'owner_id',
  })
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
