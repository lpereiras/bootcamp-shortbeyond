import { expect, test } from '@playwright/test'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'
import { testUser } from '../../support/factories/testUser'
import { AuthMessage, Type } from '../../support/factories/auth'

test.describe('POST /auth/login', () => {
  test.beforeAll(async ({ request }) => {
    // TODO: MOCK this request
    await request.post(REGISTER_ROUTE, {
      data: testUser,
    })
  })

  test('should get access token with valid credential', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(200)
    expect(responseBody).not.toHaveProperty(Type.PASSWORD)
    expect(responseBody.data).toHaveProperty(Type.TOKEN)
    expect(responseBody.data.user).toHaveProperty(Type.ID)
    expect(responseBody.data.user.name).toEqual(testUser.name)
    expect(responseBody.data.user.email).toEqual(testUser.email)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.LOGIN_SUCCESS)
  })

  test('should validate if email matches a valid credential', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: 'not-registered-user@email.com',
        password: testUser.password,
      },
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.INVALID_CREDENTIALS)
  })

  test('should validate if password matches a valid credential', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: testUser.email,
        password: 'invalid-password-credential',
      },
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.INVALID_CREDENTIALS)
  })

  test('should validate email as a required field', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        password: testUser.password,
      },
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REQUIRED_EMAIL)
  })

  test('should validate email format', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: 'invalid-formatgmail.com',
        password: testUser.password,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.INVALID_EMAIL_FORMAT)
  })

  test('should validate password as a required field', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: testUser.email,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REQUIRED_PASSWORD)
  })

  test('should validate JSON format', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: 'invalid-json-format',
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.INVALID_DATA)
  })
})
