const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.js.save)
    app.post('/signin', app.js.auth.signin)
    app.post('/validateToken', app.js.auth.validateToken)

    app.route('/user')
        //.all(app.config.passport.authenticate())
        .post(app.js.user.save)
        .get(app.js.user.getAll)
}