import { authService } from '../../support/services/auth'
import { LinkMessage } from '../../support/models/apiMessages'
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'
import { test, expect } from '@playwright/test'
import { testUser } from '../../support/factories/testUser'
import { testLink } from '../../support/factories/testLink'
import { Type } from '../../support/models/apiTypes'

test.describe('POST /links', () => {
  test.beforeAll(async ({ request }) => {
    // TODO 
    // implement verification to check if user exist at database
    // if exist skip request to register endpoint
    await request.post(REGISTER_ROUTE, {
      data: testUser,
    })
  })

  test('SRB-003: CT-1', async ({ request }) => {
    const validLogin = authService(request)
    const getToken = await validLogin.getToken(testUser)
    const response = await request.post('/api/links', {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      data: testLink,
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(201)
    expect(responseBody.data).toHaveProperty(Type.ID)
    expect(responseBody.data.original_url).toEqual(testLink.original_url)
    expect(responseBody.data).toHaveProperty(Type.SHORT_CODE)
    expect(responseBody.data.title).toEqual(testLink.title)
    expect(responseBody).toHaveProperty(Type.MESSAGE, LinkMessage.CREATED)
  })

  test('SRB-003: CT-2', async ({ request }) => {
    await authService(request).login(testUser)

    const response = await request.post('/api/links', {
      headers: {
        Invalid: 'Bearer invalid',
      },
      data: testLink,
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, LinkMessage.REQUIRED_HEADER)
  })

  test('SRB-003: CT-3', async ({ request }) => {
    await authService(request).login(testUser)

    const response = await request.post('/api/links', {
      headers: {
        Authorization: 'Invalid',
      },
      data: testLink,
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, LinkMessage.INVALID_TOKEN_FORMAT)
  })
  // TODO
  // have to be a valid and non expired token
  // have to be a valid user
  // have to be a valid URL
  // original_url is required
  // title is required

// JSON RESPONSE EXAMPLE
// {
//   "data": {
//     "id": "01K60MS31W924FR5SABD32ZHBP",
//     "original_url": "https://www.youtube.com/watch?v=H8ayjx8lPNY&list=RDH8ayjx8lPNY&start_radio=1",
//     "short_code": "3ae3C",
//     "title": "SET FINAL DE ANO 3"
//   },
//   "message": "Link criado com sucesso"
// }
})
