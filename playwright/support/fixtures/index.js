import { test as base } from '@playwright/test'
import { authService } from '../../support/services/auth'

const test = base.extend({
  auth: async ({ request }, use) => {
    const auth = authService(request)
    await use(auth)
  },
})

export { test }
