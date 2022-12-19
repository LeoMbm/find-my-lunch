import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const start = process.hrtime.bigint()
    console.log(
      `-> ${response.getStatus()} ${request.method()}: ${request.url()} ${
        Number(process.hrtime.bigint() - start) / 1e6
      }ms `
    )
    await next()
  }
}
