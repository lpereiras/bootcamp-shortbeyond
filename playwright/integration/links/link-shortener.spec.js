import { authService } from '../../support/services/auth'
import { LinkMessage } from '../../support/models/apiMessages'
import { REGISTER_ROUTE } from '../../support/apiRoutes'
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
    expect(responseBody.data.original_url).toEqual(testLink.original_URL)
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

  test('SRB-003: CT-04', async ({ request }) => {
    await authService(request).login(testUser)
    const response = await request.post('/api/links', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFLNUY2RDNIN0NQTjJBUURLSlgwSjE3VjUiLCJleHAiOjE3NTgzMTI0MzQsImlhdCI6MTc1ODIyNjAzNH0.vsWnxM3gTL-XWfsQ6WwaIcOhC1iVmbS8cVYNgXWaRDs',
      },
      data: testLink,
    })
    const responseBody = await response.json()
    
    expect(response.status()).toBe(401)
    expect(responseBody).toHaveProperty(Type.MESSAGE, 'token has invalid claims: token is expired')
  })

  test('SRB-003: CT-05', async ({ request }) => {
    const validLogin = authService(request)
    const getToken = await validLogin.getToken(testUser)

    const response = await request.post('/api/links', {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      data: {
        title: testLink.title,
      } 
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, 'O campo \'OriginalURL\' é obrigatório')
  })

  test('SRB-003: CT-06', async ({ request }) => {
    const validLogin = authService(request)
    const getToken = await validLogin.getToken(testUser)

    const response = await request.post('/api/links', {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      data: {
        original_URL: testLink.original_URL,
      } 
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, 'O campo \'Title\' é obrigatório')
  })

  test('SRB-003: CT-07', async ({ request }) => {
    const validLogin = authService(request)
    const getToken = await validLogin.getToken(testUser)

    const response = await request.post('/api/links', {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
      data: {
        original_URL: 'invalid_url',
        title: testLink.title,
      } 
    })
    const responseBody = await response.json()

    expect(response.status()).toBe(400)
    expect(responseBody).toHaveProperty(Type.MESSAGE, 'O campo \'OriginalURL\' deve ser uma URL válida')
  })
})
