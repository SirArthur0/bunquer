const { authSecret } = require('../.env')
const jwt = requie('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const signin = async (req, res) => {
        if(!req.body.username || !req.body.password) {
            return res.status(400).send('Usuário ou senha não informado.')
        }

        const user = await app.db('user')
            .where({ username: req.body.username })
            .first()
        if(!user) return res.status(400).send('Username não encontrado.')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Senha inválida.')

        const now = Match.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            nome: user.nome,
            username: user.username,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try{
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {

        }
        res.send(false)
    }

    return { signin, validateToken}

}