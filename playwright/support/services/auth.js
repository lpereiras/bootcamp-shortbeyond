import { LOGIN_ROUTE } from '../../support/apiRoutes'

export const authService = (request) => {
  const login = async (testUser) => {
    return await request.post(LOGIN_ROUTE, {
        data: {
          email: testUser.email,
          password: testUser.password,
      }
    })
  }

  const getToken = async (testUser) => {
    const responseToken = await login(testUser)
    const responseBody = await responseToken.json()

    return responseBody.data.token
  }

  return { login, getToken }
}