import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async create({ request, response, auth }: HttpContextContract) {
    // Refactor this code to use a validator and have a better error handling
    const { food, drink, price } = request.only(['food', 'drink', 'price'])
    const user = await auth.authenticate()

    if (!user) {
      return response.status(401).send({ message: 'You are not authenticated' })
    }
    const order = await user.related('orders').create({
      food,
      drink,
      price,
    })
    return response.status(201).send({ message: 'Order created successfully', order })
  }
}
