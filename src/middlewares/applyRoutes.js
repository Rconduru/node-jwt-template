const express = require('express')

module.exports = function(server){

    // const protectedApi = express.Router()
    // server.use('api/v1', protectedApi)
    // Criar serviço de autenticação apra validar próximas APIs
    // protectedApi.use()
    console.log("yeah");
    const openApi = express.Router()
    server.use('/api/v1', openApi)

    const AuthService = require('../api/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
}
