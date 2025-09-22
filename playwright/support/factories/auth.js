//responses from POST/auth/register
class AuthMessage {
    static REGISTER_SUCCESS = 'Usuário cadastrado com sucesso!'
    static LOGIN_SUCCESS = 'Login realizado com sucesso'
    static REQUIRED_NAME = "O campo 'Name' é obrigatório"
    static REQUIRED_EMAIL = "O campo 'Email' é obrigatório"
    static REQUIRED_PASSWORD = "O campo 'Password' é obrigatório"
    static SHORT_PASSWORD = "O campo 'Password' deve ter no mínimo 6 caracteres"
    static INVALID_DATA = 'Dados inválidos ou erro desconhecido.'
    static INVALID_CREDENTIALS = 'Credenciais inválidas'
    static INVALID_EMAIL_FORMAT = "O campo 'Email' deve ser um email válido"
    static DUPLICATED_EMAIL = 'Este e-mail já está em uso. Por favor, tente outro.'
}

//response property type used on tests
class Type {
    static ID = 'id'
    static TOKEN = 'token'
    static MESSAGE = 'message'
    static PASSWORD = 'password'
}
export { AuthMessage, Type }