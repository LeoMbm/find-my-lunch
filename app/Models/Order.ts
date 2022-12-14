import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public food: string

  @column()
  public drink: string

  @column()
  public price: number

  @column()
  public phone: string

  @column()
  public postal_code: string

  @column()
  public country: string

  @column()
  public card_number: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
