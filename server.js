const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const apiCall = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'sherlocked',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyparser.json())
app.use(cors())

app.post('/signin',(req,res) =>{signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleregister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageURL', (req,res)=>{image.handleApiCall(req,res)})

const PORT = process.env.PORT
app.listen(PORT)
