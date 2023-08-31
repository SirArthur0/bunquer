const bcrypt = require("bcrypt-nodejs")

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.js.validations


    const save = async(req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.param.id

        try {
            existsOrError(user.nome, "Nome não informado.")
            existsOrError(user.sobrenome, "Sobrenome não informado.")
            existsOrError(user.username, "Username não informado.")
            equalsOrError(user.username, "Username já está sendo utilizado.")
            existsOrError(user.password, "Senha não informada.")
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem.")

            const userFromDB = await app.db('user')
                .where({ username: user.username}).first()
            if(!user.id) {
                notExistsOrError(userFromDB, "Usuário já cadastrado.")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

}