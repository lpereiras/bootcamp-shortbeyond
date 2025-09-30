import { faker } from '@faker-js/faker'

// valid schema to test Link creation
export const testLink = {
  original_url: `${faker.internet.url()}/test/api/integration`,
  title: faker.lorem.sentence(5),
}
