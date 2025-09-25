import { LOGIN_ROUTE } from "../apiRoutes";
import { testUser } from '../../support/apiRoutes'

export const validLogin = async (request) => {
  return await request.post(LOGIN_ROUTE, {
    data: {
      email: testUser.email,
      password: testUser.password,
    }
  })
}