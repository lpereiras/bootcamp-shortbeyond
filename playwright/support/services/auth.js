import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../support/apiRoutes'

export const authService = (request) => {
  const register = async (user) => {
    return await request.post(REGISTER_ROUTE, {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
  }

  const login = async (user) => {
    return await request.post(LOGIN_ROUTE, {
      data: {
        email: user.email,
        password: user.password,
      },
    })
  }

  const getToken = async (testUser) => {
    const responseToken = await login(testUser)
    const responseBody = await responseToken.json()

    return responseBody.data.token
  }

  return { login, register, getToken }
}
