import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fetch from 'node-fetch'

export default class MealsController {
  public async index({ response }: HttpContextContract) {
    // Fetch to another API and mapping response to my server :smile:
    // The front need to make request to my server instead the link above
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data = await req.json()
    console.log(data)
    return response.status(200).send(data)
  }
}
