import { test } from '@japa/runner'

test.group('Auth', () => {
  test('Cannot register if user already exist', async ({ client }) => {})

  test('Cannot register if password is length than 8 characters', async ({ client }) => {})
})
