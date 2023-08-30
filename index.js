const app = require('express')()
const consign = require('consign')
const db = require('./config/db')


app.db = db

app.listen(5000, () =>  {
    console.log("Executando...")
})