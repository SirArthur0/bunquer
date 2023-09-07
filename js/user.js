const bcrypt = require("bcrypt-nodejs")

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.js.validations

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async(req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.param.id

        if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.nome, "Nome não informado.")
            existsOrError(user.sobrenome, "Sobrenome não informado.")
            existsOrError(user.username, "Username não informado.")
            existsOrError(user.password, "Senha não informada.")
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem.")

            const userFromDB = await app.db('users')
                .where({ username: user.username}).first()
            if(!user.id) {
                notExistsOrError(userFromDB, "Usuário já cadastrado.")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(!user.id) {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }


    const update = async (req, res) => {
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(user.id && user.nome && user.sobrenome) {
            app.db('users')
                .update(({ nome: user.name, sobrenome: user.sobrenome}))
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else if(user.id && user.nome){
            app.db('users')
                .update({ name: user.name })
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else if(user.id && user.sobrenome) {
            app.db('users')
                .update({ sobrenome: user.sobrenome})
                .where({ id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else if(user.id && user.admin) {
            app.db('users')
                .update({ admin: user.admin })
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        } 
        
        else {
            return res.status(400).send()
        }
    }  

    const getAll = (req, res) => {
        app.db('users')
            .select('username', 'nome', 'sobrenome')
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, update, getAll }

}