import { faker } from '@faker-js/faker'

// valid schema to create User test
export const testUser = {
  name: faker.person.fullName(),
  email: `test_email.${faker.string.uuid()}@email.com`,
  password: faker.internet.password({ length: 10 }),
}

export const testUser_1 = {
  name: faker.person.fullName(),
  email: `test_email.${faker.string.uuid()}@email.com`,
  password: faker.internet.password({ length: 10 }),
}
