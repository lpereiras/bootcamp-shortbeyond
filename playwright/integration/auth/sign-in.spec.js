import { expect, test } from '@playwright/test'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'
import { testUser } from '../../support/factories/testUser'
import { AuthMessage, Message } from '../../support/models/apiMessages'
import { Type } from '../../support/models/apiTypes'
import { authService } from '../../support/services/auth'

test.describe('POST /auth/login', () => {
  let response
  let responseBody

  test.beforeAll(async ({ request }) => {
    // TODO
    // implement verification to check if user exist at database
    // if exist skip request to register endpoint
    await authService(request).register(
      testUser,
    )
  })

  test('SRB-002: CT-1', async ({ request }) => {
    response = await authService(request).login({
      email: testUser.email,
      password: testUser.password,
    })
    responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody).not.toHaveProperty(Type.PASSWORD)
    expect(responseBody.data).toHaveProperty(Type.TOKEN)
    expect(responseBody.data.user).toHaveProperty(Type.ID)
    expect(responseBody.data.user.name).toEqual(testUser.name)
    expect(responseBody.data.user.email).toEqual(testUser.email)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.LOGIN_SUCCESS)
  })

  test('SRB-002: CT-2', async ({ request }) => {
    response = await authService(request).login({
      email: 'not-registered-user@email.com',
      password: testUser.password,
    })
    responseBody = await response.json()

    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.INVALID_CREDENTIALS)
  })

  test('SRB-002: CT-3', async ({ request }) => {
    response = await authService(request).login({
      email: testUser.email,
      password: 'invalid-password-credential',

    })
    responseBody = await response.json()

    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.INVALID_CREDENTIALS)
  })

  test('SRB-002: CT-4', async ({ request }) => {
    response = await authService(request).login({
      email: '',
      password: testUser.password,
    })
    responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_EMAIL)
  })

  test('SRB-002: CT-5', async ({ request }) => {
    response = await authService(request).login({
      email: 'invalid-formatgmail.com',
      password: testUser.password,
    })
    responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.INVALID_EMAIL_FORMAT)
  })

  test('SRB-002: CT-6', async ({ request }) => {
    response = await authService(request).login({
      email: testUser.email,
      password: '',
    })
    responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_PASSWORD)
  })

  test('SRB-002: CT-7', async ({ request }) => {
    response = await request.post(LOGIN_ROUTE, {
      data: 'invalid-json-format',
    })
    responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.INVALID_DATA)
  })
})
