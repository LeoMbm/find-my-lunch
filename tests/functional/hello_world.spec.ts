import { test } from '@japa/runner'

test('Display Welcome Page', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  console.log(response.body())
})
