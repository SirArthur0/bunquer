const app = require('express')()
const consign = require('consign')
const db = require('./config/db')


app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./js/validations.js')
    .then('./js')
    .then('./config/routes.js')
    .into(app)

app.listen(5000, () =>  {
    console.log("Executando...")
})