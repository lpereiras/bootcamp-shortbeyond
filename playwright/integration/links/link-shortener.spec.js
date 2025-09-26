import { authService } from '../../support/services/auth'
import { REGISTER_ROUTE } from '../../support/apiRoutes'
import { test, expect } from '@playwright/test'
import { testUser } from '../../support/factories/testUser'
import { testLink } from '../../support/factories/testLink'

test.describe('POST /links', () => {
  test('SRB-003: CT-1', async ({ request }) => {
    await request.post(REGISTER_ROUTE, {
      data: testUser
    })

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
    expect(responseBody.data).toHaveProperty('id')
    expect(responseBody.data).toHaveProperty('original_url')
    expect(responseBody.data).toHaveProperty('short_code')
    expect(responseBody.data).toHaveProperty('title')
    expect(responseBody).toHaveProperty('message', 'Link criado com sucesso')
  })
  // TODO
  // needs authentication token
  // needs to be Bearer token
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
