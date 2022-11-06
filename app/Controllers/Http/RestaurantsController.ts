import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fetch from 'node-fetch'


export default class RestaurantsController {
    public async showRestaurants({ view }: HttpContextContract){
        return view.render('restaurants')

    }


    public async listRestaurants({ response, params }: HttpContextContract){
        
        const long = params.long
        const lat = params.lat
        const key = process.env.API_KEY_GEO     
        const req = await fetch(`https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.fast_food&filter=circle:${long},${lat},5000&bias=proximity:${long},${lat}&limit=100&apiKey=${key}`)
        const data = await req.json()
        return response.status(200).send(data)

    }
}
