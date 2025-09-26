import { expect, test } from '@playwright/test'
import { testUser, testUser_1 } from '../../support/factories/testUser'
import { AuthMessage, Message } from '../../support/models/apiMessages'
import { Type } from '../../support/models/apiTypes'
import { REGISTER_ROUTE } from '../../support/apiRoutes'

test.describe('POST /auth/register', () => {
  test('SRB-001: CT-1', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: testUser_1,
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(201)
    expect(responseBody.user).toHaveProperty(Type.ID)
    expect(responseBody).toHaveProperty(Type.MESSAGE, AuthMessage.REGISTER_SUCCESS)
    expect(responseBody.user).not.toHaveProperty(Type.PASSWORD)
    expect(responseBody.user.name).toEqual(testUser_1.name)
    expect(responseBody.user.email).toEqual(testUser_1.email)
  })

  test('SRB-001: CT-2', async ({ request }) => {
    await request.post(REGISTER_ROUTE, {
      data: testUser,
    })

    const response = await request.post(REGISTER_ROUTE, {
      data: {
        name: 'Valid User Name',
        email: testUser.email,
        password: testUser.password,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.DUPLICATED_EMAIL)
  })

  test('SRB-001: CT-3', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    })
    const responseBody = await response.json()
    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_NAME)
  })

  test('SRB-001: CT-4', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: {
        name: testUser.name,
        password: testUser.password,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_EMAIL)
  })

  test('SRB-001: CT-5', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: {
        name: testUser.name,
        email: 'invalid-formatgmail.com',
        password: testUser.password,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.INVALID_EMAIL_FORMAT)
  })

  test('SRB-001: CT-6', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: {
        name: testUser.name,
        email: testUser.email,
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.REQUIRED_PASSWORD)
  })

  test('SRB-001: CT-7', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: 'invalid-json-format',
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.INVALID_DATA)
  })

  test('SRB-001: CT-8', async ({ request }) => {
    const response = await request.post(REGISTER_ROUTE, {
      data: {
        name: testUser.name,
        email: testUser.email,
        password: 'pwd',
      },
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, Message.SHORT_PASSWORD)
  })
})
