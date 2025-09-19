import {faker} from '@faker-js/faker'

//valid JSON schema for User tests
export const testUser = {
        name: faker.person.fullName(),
        email: `test_email.${faker.string.uuid()}@email.com`,
        password: faker.internet.password({ length: 10 }),
    }

//responses from POST/auth/register
class AuthMessages {
    static REGISTER_SUCCESS = 'Usuário cadastrado com sucesso!'
    static DUPLICATED_EMAIL = 'Este e-mail já está em uso. Por favor, tente outro.'
    static REQUIRED_NAME = "O campo 'Name' é obrigatório"
    static REQUIRED_EMAIL = "O campo 'Email' é obrigatório"
    static REQUIRED_PASSWORD = "O campo 'Password' é obrigatório"
    static MESSAGE = 'message'
}

export { AuthMessages }