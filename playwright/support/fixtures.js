import {faker} from '@faker-js/faker'

//valid JSON schema for User tests
export const testUser = {
        name: faker.person.fullName(),
        email: `test_email.${faker.string.uuid()}@email.com`,
        password: faker.internet.password({ length: 10 }),
    }