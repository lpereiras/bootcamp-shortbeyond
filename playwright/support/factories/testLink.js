import { faker } from '@faker-js/faker'

// valid schema to test Link creation
export const testLink = {
  original_URL: `${faker.internet.url()}/test/api/integration`,
  title: faker.lorem.sentence(5),
}
