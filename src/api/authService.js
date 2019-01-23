const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../schemas/user')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/

const login = (req, res, next) => {

    const username = req.body.username || ''
    const password = req.body.password || ''

    User.findOne({username}, (erro, user) => {
        if(erro){
            return res.status(400).json(erro.errors)
        } else if (username && bcrypt.compareSync(password, user.password)){
            let signUser = {
                username: user.username,
                email: user.email
            }
            const token = jwt.sign(signUser, env.authSecret, {
                expiresIn: "1 day"
            })

            res.json({
                access_token: token,
                tokne_type: 'bearer',
                refresh_token: token,
                expires_in: 43177,
                scope: 'password'
            })
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

const signup = (req, res, next) => {

    /*
        Este não é um serviço mocado para representar um serviço real
        Este serviço tem apenas o intuito de incluir um novo cliente no banco
    */
    const username = req.body.username || ''

    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)

    if(!bcrypt.compareSync(confirmPassword, passwordHash)){
        return res.status(400).send({ erros: ['Senhas não conferem'] })
    }

    User.findOne({email}, (erro, user) => {
        if(erro){
            return res.status(400).json(erro.errors)
        } else if (user) {
            return res.status(400).send( {errors: "E-mail já cadastrado"} )
        } else {
            const newUser = new User({ username, email, password: passwordHash })

            newUser.save( erro => {
                if(erro){
                    return res.status(400).json(erro.errors)
                } else {
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup }
