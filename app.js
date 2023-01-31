const express = require('express')
const { sequelize, User } = require('./models')
const homeRoute = require('./routes/home')
const sendEmails = require('./controllers/sendEmails')
var path = require('path');
let nunjucks = require('nunjucks')


const app= express()

app.use(express.json())

app.post('/users',async(req,res)=>{
    const { name, email, password}  = req.body

    try{
        const user = await User.create({ name, email, password})
        return res.json(user)

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users',async(req,res)=>{
    try{
        const users= await User.findAll()

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error:'Something went wrong'})
    }
})

app.set("view engine", "html")

nunjucks.configure(['datamodels/'], {   // setting a default views folder for templates 
    autoescape: false,
    express: app
})


app.use('/',homeRoute)
app.use('/sendmail',sendEmails)

app.listen({port: 5000}, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log("Database synced!")
})