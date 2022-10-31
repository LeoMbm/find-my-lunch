import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantsController {
    public async showRestaurants({ view }: HttpContextContract){
        return view.render('restaurants')

    }
}
