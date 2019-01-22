const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../schemas/user')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/

const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({email}, (erro, user) => {
        if(erro){
            return res.status(400).json({erro.errors})
        } else if (user && bcrypt.compareSync(password, user.password)){
            let signUser = {
                user_id: user.user_id,
                email: user.email
            }
            const token = jwt.sign(signUser, env.authSecret, {
                expiresIn: "1 day"
            })

            res.json(signUser)
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

module.exports = { login }
