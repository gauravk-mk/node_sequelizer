const express = require('express')
const { sequelize, User } = require('./models')
const homeRoute = require('./routes/home')
const auth = require('./routes/auth')
const sendEmails = require('./controllers/sendEmails')
var path = require('path');
let nunjucks = require('nunjucks');
const { request } = require('http');


const app= express()

app.use(express.json())

app.use(express.urlencoded())

app.set("view engine", "html")

nunjucks.configure(['datamodels/'], {   // setting a default views folder for templates 
    autoescape: false,
    express: app
})


app.use('/',homeRoute)
// app.use('/sendmail',sendEmails)
app.get('/register',auth)
app.post('/register',auth)



app.listen({port: 5000}, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log("Database synced!")
})