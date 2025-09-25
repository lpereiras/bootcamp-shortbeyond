import { expect, test } from '@playwright/test'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'
import { testUser } from '../../support/factories/testUser'
import { AuthMessage, Message } from '../../support/models/message'
import { Type } from '../../support/models/type'

test.describe('POST /auth/login', () => {
  test.beforeAll(async ({ request }) => {
    // TODO: MOCK this request
    await request.post(REGISTER_ROUTE, {
      data: testUser,
    })
  })

  test('SRB-002: CT-1', async ({ request }) => {
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

  test('SRB-002: CT-2', async ({ request }) => {
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

  test('SRB-002: CT-3', async ({ request }) => {
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

  test('SRB-002: CT-4', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        password: testUser.password,
      },
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_EMAIL)
  })

  test('SRB-002: CT-5', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: 'invalid-formatgmail.com',
        password: testUser.password,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.INVALID_EMAIL_FORMAT)
  })

  test('SRB-002: CT-6', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: {
        email: testUser.email,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_PASSWORD)
  })

  test('SRB-002: CT-7', async ({ request }) => {
    const response = await request.post(LOGIN_ROUTE, {
      data: 'invalid-json-format',
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.INVALID_DATA)
  })
})
