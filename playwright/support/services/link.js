import { LINK_ROUTE } from '../../support/apiRoutes'

export const linkService = (request) => {
  const register = async(link) => {
    return await request.post(LINK_ROUTE, {
      headers: {
        Authorization: link.token,
      },
        data: {
          original_URL: link.original_URL,
          title: link.title
        },
      })
  }
  return { register }
}