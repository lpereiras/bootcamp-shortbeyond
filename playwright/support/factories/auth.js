//responses from POST/auth/register
class AuthMessage {
    static REGISTER_SUCCESS = 'Usuário cadastrado com sucesso!'
    static DUPLICATED_EMAIL = 'Este e-mail já está em uso. Por favor, tente outro.'
    static REQUIRED_NAME = "O campo 'Name' é obrigatório"
    static REQUIRED_EMAIL = "O campo 'Email' é obrigatório"
    static REQUIRED_PASSWORD = "O campo 'Password' é obrigatório"
    static LOGIN_SUCCESS = 'Login realizado com sucesso'
}

//response property type used on tests
class Type {
    static PASSWORD = 'password'
    static MESSAGE = 'message'
    static ID = 'id'
    static TOKEN = 'token'
}
export { AuthMessage, Type }