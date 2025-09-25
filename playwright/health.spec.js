import { expect, test } from '@playwright/test'

test('GET /health', async ({ request }) => {
  const response = await request.get('/health')
  const responseBody = await response.json()

  expect(response.status()).toBe(200)
  expect(responseBody.service).toEqual('shortbeyond-api')
  expect(responseBody.status).toEqual('healthy')
})
