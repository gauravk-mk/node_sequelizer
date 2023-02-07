const express = require('express')
const { sequelize, User } = require('./models')
const homeRoute = require('./routes/home')
const auth = require('./routes/auth')
const formRoute = require('./routes/form')
const emailRoute = require('./routes/emails')
const cookieParser = require("cookie-parser");
var path = require('path');
let nunjucks = require('nunjucks');
const { request } = require('http');


const app= express()

app.use(cookieParser());

app.use(express.json())

app.use(express.urlencoded())

app.set("view engine", "html") //for rendering html files

nunjucks.configure(['datamodels/'], {   // setting a default views folder for templates 
    autoescape: false,
    express: app
})

//Routes

app.use('/',homeRoute)
app.get('/register',auth)
app.post('/register',auth)
app.get('/login',auth)
app.post('/login',auth)
app.get('/verify/:token',auth)
app.get('/logout',auth)
app.get('/postform',formRoute)
app.post('/postform',formRoute)
app.get('/getemail/:id',emailRoute)

app.listen({port: 5000}, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log("Database synced!")
})