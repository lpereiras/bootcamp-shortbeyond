import test from '@playwright/test'

test.describe('POST /links', () => {
  test.skip(' ', async ({ request }) => { })

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
