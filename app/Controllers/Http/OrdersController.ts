/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async create({ request, response, auth }: HttpContextContract) {
    // Refactor this code to use a validator and have a better error handling
    const { food, drink, price, phone, postal_code, country, card_number, user_id } = request.only([
      'phone',
      'food',
      'drink',
      'price',
      'user_id',
      'postal_code',
      'country',
      'card_number',
    ])
    const user = await auth.authenticate()

    if (!user) {
      return response.status(401).send({ message: 'You are not authenticated' })
    }
    const order = await user.related('orders').create({
      food,
      drink,
      price,
      phone,
      postal_code,
      country,
      card_number,
      user_id,
    })
    return response.status(201).send({ message: 'Order created successfully', order })
  }

  public async index({ response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user) {
      return response.status(401).send({ message: 'You are not authenticated' })
    }
    const orders = await user.related('orders').query()
    return response.status(200).send({ message: 'Orders fetched successfully', orders })
  }

  public async show({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user) {
      return response.status(401).send({ message: 'You are not authenticated' })
    }
    const order = await user.related('orders').query().where('id', params.id).first()
    return response.status(200).send({ message: 'Order fetched successfully', order })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user) {
      return response.status(401).send({ message: 'You are not authenticated' })
    }
    const order = await user.related('orders').query().where('id', params.id).first()
    if (!order) {
      return response.status(404).send({ message: 'Order not found' })
    }
    await order.delete()
    return response.status(200).send({ message: 'Order deleted successfully' })
  }

}
